const admin = require('firebase-admin');
const db = admin.firestore();

// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const usersSnapshot = await db.collection('users').get();
    const users = [];
    
    usersSnapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() });
    });
    
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({
      success: false,
      message: 'Колдонуучуларды алууда ката',
      error: error.message
    });
  }
};

// Get single user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userDoc = await db.collection('users').doc(id).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Колдонуучу табылган жок'
      });
    }
    
    res.json({
      success: true,
      data: { id: userDoc.id, ...userDoc.data() }
    });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({
      success: false,
      message: 'Колдонуучуну алууда ката',
      error: error.message
    });
  }
};

// Create new user
exports.createUser = async (req, res) => {
  try {
    const { email, displayName, phone, role, dateOfBirth, address } = req.body;
    
    // Validation
    if (!email || !displayName) {
      return res.status(400).json({
        success: false,
        message: 'Email жана аты-жөнү милдеттүү'
      });
    }
    
    // Check if user exists
    const existingUser = await db.collection('users').where('email', '==', email).get();
    if (!existingUser.empty) {
      return res.status(400).json({
        success: false,
        message: 'Бул email менен колдонуучу мурунтан катталган'
      });
    }
    
    const userData = {
      email,
      displayName,
      phone: phone || '',
      role: role || 'student',
      dateOfBirth: dateOfBirth || '',
      address: address || '',
      status: 'active',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      lastActive: admin.firestore.FieldValue.serverTimestamp(),
      courses: [],
      payments: []
    };
    
    const userRef = await db.collection('users').add(userData);
    
    res.status(201).json({
      success: true,
      message: 'Колдонуучу ийгиликтүү түзүлдү',
      data: { id: userRef.id, ...userData }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      message: 'Колдонуучуну түзүүдө ката',
      error: error.message
    });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Remove fields that shouldn't be updated
    delete updates.id;
    delete updates.createdAt;
    delete updates.email; // Email shouldn't be changed
    
    updates.updatedAt = admin.firestore.FieldValue.serverTimestamp();
    
    await db.collection('users').doc(id).update(updates);
    
    const updatedUser = await db.collection('users').doc(id).get();
    
    res.json({
      success: true,
      message: 'Колдонуучу ийгиликтүү жаңыланды',
      data: { id: updatedUser.id, ...updatedUser.data() }
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      message: 'Колдонуучуну жаңылоодо ката',
      error: error.message
    });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.collection('users').doc(id).delete();
    
    res.json({
      success: true,
      message: 'Колдонуучу ийгиликтүү өчүрүлдү'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Колдонуучуну өчүрүүдө ката',
      error: error.message
    });
  }
};

// Get users by role
exports.getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;
    
    const usersSnapshot = await db.collection('users')
      .where('role', '==', role)
      .get();
    
    const users = [];
    usersSnapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() });
    });
    
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Error getting users by role:', error);
    res.status(500).json({
      success: false,
      message: 'Колдонуучуларды алууда ката',
      error: error.message
    });
  }
};

// Update user status
exports.updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['active', 'inactive', 'blocked'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Туура эмес статус'
      });
    }
    
    await db.collection('users').doc(id).update({
      status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    res.json({
      success: true,
      message: 'Статус ийгиликтүү жаңыланды'
    });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({
      success: false,
      message: 'Статусту жаңылоодо ката',
      error: error.message
    });
  }
};
