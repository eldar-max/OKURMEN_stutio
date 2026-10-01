const admin = require('firebase-admin');

// Verify Firebase token
exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Токен жок. Кирүү керек.'
      });
    }
    
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    
    // Get user data from Firestore
    const userDoc = await admin.firestore()
      .collection('users')
      .doc(decodedToken.uid)
      .get();
    
    if (userDoc.exists) {
      req.userData = userDoc.data();
    }
    
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({
      success: false,
      message: 'Токен туура эмес же мөөнөтү өткөн'
    });
  }
};

// Check if user is admin
exports.isAdmin = (req, res, next) => {
  if (req.userData && req.userData.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Жеткиликтүү эмес. Admin укугу керек.'
    });
  }
};

// Check if user is teacher
exports.isTeacher = (req, res, next) => {
  if (req.userData && (req.userData.role === 'teacher' || req.userData.role === 'admin')) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Жеткиликтүү эмес. Мугалим укугу керек.'
    });
  }
};

// Check if user is student
exports.isStudent = (req, res, next) => {
  if (req.userData && req.userData.role === 'student') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Жеткиликтүү эмес. Окуучу укугу керек.'
    });
  }
};
