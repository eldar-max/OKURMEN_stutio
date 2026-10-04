import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut, sendPasswordResetEmail, fetchSignInMethodsForEmail, linkWithCredential, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration - использует переменные окружения из .env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAfz3G_uBQkDePEYWaQgfuLZtSAgaCJOag",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "okurmen-3f257.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "okurmen-3f257",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "okurmen-3f257.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "83969201678",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:83969201678:web:afc26bc49766e957138e5f",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-MTW4H1734Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
// Запрашиваем дополнительные данные профиля из GitHub
githubProvider.addScope('read:user');

// Включаем оффлайн персистентность (опционально)
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
  } else if (err.code === 'unimplemented') {
    console.warn('The current browser does not support persistence.');
  }
});

// Google Sign In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return await processOAuthUser(result.user);
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

// GitHub Sign In with automatic account linking
export const signInWithGithub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    
    // Получаем GitHub username и avatar
    const credential = GithubAuthProvider.credentialFromResult(result);
    const githubToken = credential?.accessToken;
    
    // Если есть токен, получаем дополнительные данные профиля
    if (githubToken && !result.user.photoURL) {
      try {
        const response = await fetch('https://api.github.com/user', {
          headers: {
            'Authorization': `token ${githubToken}`
          }
        });
        const githubData = await response.json();
        
        // Добавляем avatar_url к объекту пользователя
        if (githubData.avatar_url) {
          result.user.photoURL = githubData.avatar_url;
        }
      } catch (apiError) {
        console.warn('Could not fetch GitHub avatar:', apiError);
      }
    }
    
    return await processOAuthUser(result.user);
  } catch (error) {
    // Если email уже используется другим провайдером - автоматически связываем
    if (error.code === 'auth/account-exists-with-different-credential') {
      const email = error.customData?.email;
      const pendingCredential = GithubAuthProvider.credentialFromError(error);
      
      if (!email || !pendingCredential) {
        throw error;
      }
      
      // Получаем методы входа для этого email
      const methods = await fetchSignInMethodsForEmail(auth, email);
      
      // Если есть Google провайдер, входим через Google и связываем
      if (methods.includes('google.com')) {
        try {
          // Входим через Google
          const googleResult = await signInWithPopup(auth, googleProvider);
          
          // Связываем GitHub credential с текущим аккаунтом
          await linkWithCredential(googleResult.user, pendingCredential);
          
          // Возвращаем пользователя
          return await processOAuthUser(googleResult.user);
        } catch (linkError) {
          console.error('Error linking accounts:', linkError);
          throw new Error(
            'КГ: Аккаунттарды байланыштыруу мүмкүн болбоду. Google менен кириңиз.\n' +
            'RU: Не удалось связать аккаунты. Войдите через Google.\n' +
            'EN: Failed to link accounts. Please sign in with Google.'
          );
        }
      }
      
      throw error;
    }
    
    console.error('Error signing in with GitHub:', error);
    throw error;
  }
};

// Process OAuth User (Google or GitHub)
const processOAuthUser = async (user) => {
  try {
    // Проверяем, существует ли пользователь в Firestore
    const userRef = doc(db, 'users', user.uid);
    
    let userData = null;
    try {
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        // Создаем нового пользователя в Firestore
        const newUserData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL || `https://github.com/${user.reloadUserInfo?.screenName}.png` || '',
          role: 'student', // По умолчанию студент
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        await setDoc(userRef, newUserData);
        userData = newUserData;
      } else {
        userData = userSnap.data();
        // Обновляем photoURL если его не было
        if (!userData.photoURL && user.photoURL) {
          await setDoc(userRef, { photoURL: user.photoURL }, { merge: true });
          userData.photoURL = user.photoURL;
        }
      }
    } catch (firestoreError) {
      console.warn('Firestore offline or not configured, using default role:', firestoreError);
      // Если Firestore недоступен, используем роль по умолчанию
      userData = { role: 'student' };
    }
    
    return { user, userData };
  } catch (error) {
    console.error('Error processing OAuth user:', error);
    throw error;
  }
};

// Sign Out
export const signOutUser = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('userFullName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPhoto');
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Get User Data from Firestore
export const getUserData = async (uid) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data();
    }
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
};

// Update User Data in Firestore
export const updateUserData = async (uid, data) => {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      ...data,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

// Reset Password - Send email
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: 'Письмо для сброса пароля отправлено на вашу почту' };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    
    let errorMessage = 'Ошибка при отправке письма';
    
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'Пользователь с таким email не найден';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Неверный формат email';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Слишком много попыток. Попробуйте позже';
    }
    
    throw new Error(errorMessage);
  }
};

// Sign In with Email and Password
export const signInWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return await processOAuthUser(result.user);
  } catch (error) {
    console.error('Error signing in with email:', error);
    
    let errorMessage = 'Ошибка входа';
    
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
      errorMessage = 'Неверный email или пароль';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Неверный формат email';
    } else if (error.code === 'auth/user-disabled') {
      errorMessage = 'Аккаунт заблокирован';
    }
    
    throw new Error(errorMessage);
  }
};

// Register with Email and Password
export const registerWithEmail = async (email, password, displayName) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Создаем профиль пользователя
    const userData = {
      uid: result.user.uid,
      email: result.user.email,
      displayName: displayName,
      photoURL: '',
      role: 'student',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const userRef = doc(db, 'users', result.user.uid);
    await setDoc(userRef, userData);
    
    return { user: result.user, userData };
  } catch (error) {
    console.error('Error registering with email:', error);
    
    let errorMessage = 'Ошибка регистрации';
    
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'Email уже зарегистрирован';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Неверный формат email';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Слишком простой пароль';
    }
    
    throw new Error(errorMessage);
  }
};

export default app;
