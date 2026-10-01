import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './lib/prisma.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'OKURMEN Backend API with Prisma is running',
    timestamp: new Date().toISOString()
  });
});

// ============ USERS API ============

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch users',
      message: error.message 
    });
  }
});

// Get user by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        enrollments: {
          include: { course: true }
        },
        payments: true
      }
    });
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch user',
      message: error.message 
    });
  }
});

// Create user
app.post('/api/users', async (req, res) => {
  try {
    const { email, name, phone, role } = req.body;
    
    const user = await prisma.user.create({
      data: {
        email,
        name,
        phone,
        role: role || 'STUDENT'
      }
    });
    
    res.status(201).json({
      success: true,
      data: user,
      message: 'User created successfully'
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create user',
      message: error.message 
    });
  }
});

// ============ COURSES API ============

// Get all courses
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      where: { status: 'active' },
      orderBy: { createdAt: 'desc' }
    });
    res.json({
      success: true,
      data: courses,
      count: courses.length
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch courses',
      message: error.message 
    });
  }
});

// Create course
app.post('/api/courses', async (req, res) => {
  try {
    const { name, description, category, duration, price, teacher } = req.body;
    
    const course = await prisma.course.create({
      data: {
        name,
        description,
        category,
        duration,
        price,
        teacher,
        status: 'active'
      }
    });
    
    res.status(201).json({
      success: true,
      data: course,
      message: 'Course created successfully'
    });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create course',
      message: error.message 
    });
  }
});

// ============ BOOKINGS API ============

// Get all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json({
      success: true,
      data: bookings,
      count: bookings.length
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch bookings',
      message: error.message 
    });
  }
});

// Create booking
app.post('/api/bookings', async (req, res) => {
  try {
    const { name, email, phone, course, startDate, format, comment } = req.body;
    
    const booking = await prisma.booking.create({
      data: {
        name,
        email,
        phone,
        course,
        startDate: startDate ? new Date(startDate) : null,
        format: format || 'hybrid',
        comment,
        status: 'pending'
      }
    });
    
    res.status(201).json({
      success: true,
      data: booking,
      message: 'Booking created successfully'
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create booking',
      message: error.message 
    });
  }
});

// ============ STATISTICS API ============

app.get('/api/stats', async (req, res) => {
  try {
    const [usersCount, coursesCount, bookingsCount, studentsCount] = await Promise.all([
      prisma.user.count(),
      prisma.course.count({ where: { status: 'active' } }),
      prisma.booking.count(),
      prisma.user.count({ where: { role: 'STUDENT' } })
    ]);
    
    res.json({
      success: true,
      data: {
        totalUsers: usersCount,
        totalCourses: coursesCount,
        totalBookings: bookingsCount,
        totalStudents: studentsCount
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch statistics',
      message: error.message 
    });
  }
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await prisma.$disconnect();
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 API endpoint: http://localhost:${PORT}/api`);
  console.log(`🗄️  Database: Prisma + PostgreSQL (Neon)`);
});

export default app;
