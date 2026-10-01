const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// Public routes
router.get('/:id', userController.getUserById);

// Protected routes (require authentication)
router.use(verifyToken);

// Admin only routes
router.get('/', isAdmin, userController.getAllUsers);
router.post('/', isAdmin, userController.createUser);
router.put('/:id', isAdmin, userController.updateUser);
router.delete('/:id', isAdmin, userController.deleteUser);
router.get('/role/:role', isAdmin, userController.getUsersByRole);
router.patch('/:id/status', isAdmin, userController.updateUserStatus);

module.exports = router;
