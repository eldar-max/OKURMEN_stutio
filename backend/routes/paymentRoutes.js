const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(verifyToken);

// Student routes
router.post('/', paymentController.createPayment);
router.get('/user/:userId', paymentController.getPaymentsByUser);

// Admin only routes
router.get('/', isAdmin, paymentController.getAllPayments);
router.get('/stats', isAdmin, paymentController.getPaymentStats);
router.get('/status/:status', isAdmin, paymentController.getPaymentsByStatus);
router.get('/:id', paymentController.getPaymentById);
router.post('/:id/confirm', isAdmin, paymentController.confirmPayment);
router.post('/:id/reject', isAdmin, paymentController.rejectPayment);

module.exports = router;
