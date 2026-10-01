const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { verifyToken, isAdmin, isTeacher } = require('../middleware/authMiddleware');

// Public routes
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.get('/category/:category', courseController.getCoursesByCategory);
router.get('/teacher/:teacherId', courseController.getCoursesByTeacher);

// Protected routes (require authentication)
router.use(verifyToken);

// Student can enroll
router.post('/:id/enroll', courseController.enrollStudent);

// Admin and Teacher only routes
router.post('/', isAdmin, courseController.createCourse);
router.put('/:id', isAdmin, courseController.updateCourse);
router.delete('/:id', isAdmin, courseController.deleteCourse);

module.exports = router;
