# 🔥 Настройка Firebase для ОКУРМЭН

## Шаг 1: Создание проекта Firebase

1. Перейдите на [Firebase Console](https://console.firebase.google.com/)
2. Нажмите **"Добавить проект"** (Add project)
3. Введите название проекта: **OKURMEN**
4. Отключите Google Analytics (можно включить позже)
5. Нажмите **"Создать проект"**

## Шаг 2: Регистрация веб-приложения

1. В консоли Firebase выберите ваш проект
2. Нажмите на иконку **</> (Web)** чтобы добавить веб-приложение
3. Введите название приложения: **OKURMEN Web**
4. **НЕ** ставьте галочку "Firebase Hosting"
5. Нажмите **"Зарегистрировать приложение"**
6. Скопируйте конфигурацию `firebaseConfig`

## Шаг 3: Добавление конфигурации в проект

1. Откройте файл `src/services/firebase.js`
2. Замените конфигурацию на вашу:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "okurmen-xxxxx.firebaseapp.com",
  projectId: "okurmen-xxxxx",
  storageBucket: "okurmen-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxx"
};
```

## Шаг 4: Настройка Authentication

1. В меню слева выберите **"Authentication"**
2. Нажмите **"Начать"** (Get Started)
3. На вкладке **"Sign-in method"** включите:
   - ✅ **Google** - нажмите на него и включите
   - ✅ **Email/Password** (опционально)
4. Нажмите **"Сохранить"**

### Настройка Google Sign-In

1. Включите провайдер Google
2. Выберите **Project support email**
3. Нажмите **"Сохранить"**

## Шаг 5: Настройка Firestore Database

1. В меню слева выберите **"Firestore Database"**
2. Нажмите **"Создать базу данных"**
3. Выберите **"Начать в тестовом режиме"** (Start in test mode)
4. Выберите регион: **europe-west1** (Бельгия) или ближайший к Кыргызстану
5. Нажмите **"Включить"**

### Настройка правил безопасности

1. Перейдите на вкладку **"Правила"** (Rules)
2. Замените правила на следующие:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Пользователи могут читать и изменять только свои данные
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Курсы могут читать все авторизованные пользователи
    match /courses/{courseId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'teacher';
    }
    
    // Записи студентов
    match /enrollments/{enrollmentId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
                             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['teacher', 'admin'];
    }
  }
}
```

3. Нажмите **"Опубликовать"**

## Шаг 6: Создание коллекций

Firebase создаст коллекции автоматически при первой записи, но можно создать структуру заранее:

### Коллекция `users`
```
users/{uid}
  - uid: string
  - email: string
  - displayName: string
  - photoURL: string
  - role: string (student/teacher/admin)
  - phone: string (опционально)
  - createdAt: timestamp
  - updatedAt: timestamp
```

### Коллекция `courses`
```
courses/{courseId}
  - name: string
  - description: string
  - teacherId: string
  - duration: string
  - price: number
  - category: string
  - createdAt: timestamp
```

### Коллекция `enrollments`
```
enrollments/{enrollmentId}
  - studentId: string
  - courseId: string
  - progress: number (0-100)
  - status: string (active/completed/cancelled)
  - enrolledAt: timestamp
```

## Шаг 7: Настройка доменов для OAuth

1. В **Authentication** → **Settings**
2. Добавьте авторизованные домены:
   - `localhost` (уже добавлен)
   - Ваш production домен (когда будете деплоить)

## Шаг 8: Тестирование

1. Запустите проект: `npm run dev`
2. Перейдите на страницу входа
3. Нажмите "Войти через Google"
4. Выберите Google аккаунт
5. Проверьте что пользователь создался в Firestore

## 🔒 Безопасность

### Важно для production:

1. **Измените правила Firestore** с тестового режима на production
2. **Добавьте `.env` файл** для хранения конфигурации:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

3. **Обновите firebase.js** для использования переменных окружения:

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

4. Добавьте `.env` в `.gitignore`

## 📚 Полезные ссылки

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Authentication](https://firebase.google.com/docs/auth)

## ✅ Готово!

После настройки Firebase ваше приложение будет использовать:
- ✅ Google Authentication
- ✅ Firestore для хранения данных пользователей
- ✅ Безопасные правила доступа
