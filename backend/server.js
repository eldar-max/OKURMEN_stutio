import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// For Vercel deployment
export default app;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection error:', err);
  } else {
    console.log('✅ Database connected successfully!', res.rows[0]);
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'OKURMEN Backend API is running',
    timestamp: new Date().toISOString()
  });
});

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
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
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
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

// Create new user
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, phone, role, status } = req.body;
    
    const result = await pool.query(
      'INSERT INTO users (name, email, phone, role, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, phone, role || 'student', status || 'active']
    );
    
    res.status(201).json({
      success: true,
      data: result.rows[0],
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

// Update user
app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, role, status } = req.body;
    
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2, phone = $3, role = $4, status = $5, updated_at = NOW() WHERE id = $6 RETURNING *',
      [name, email, phone, role, status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0],
      message: 'User updated successfully'
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update user',
      message: error.message 
    });
  }
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete user',
      message: error.message 
    });
  }
});

// Get all courses
app.get('/api/courses', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM courses ORDER BY created_at DESC');
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
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
    const { name, description, duration, price, teacher, category, status } = req.body;
    
    const result = await pool.query(
      'INSERT INTO courses (name, description, duration, price, teacher, category, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, description, duration, price, teacher, category, status || 'active']
    );
    
    res.status(201).json({
      success: true,
      data: result.rows[0],
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

// Get all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT b.*, u.name as user_name, c.name as course_name 
      FROM bookings b
      LEFT JOIN users u ON b.user_id = u.id
      LEFT JOIN courses c ON b.course_id = c.id
      ORDER BY b.created_at DESC
    `);
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
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
    const { name, email, phone, course } = req.body;
    
    const result = await pool.query(
      'INSERT INTO bookings (name, email, phone, course, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, phone, course, 'pending']
    );
    
    res.status(201).json({
      success: true,
      data: result.rows[0],
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

// Statistics endpoint
app.get('/api/stats', async (req, res) => {
  try {
    const usersCount = await pool.query('SELECT COUNT(*) FROM users');
    const coursesCount = await pool.query('SELECT COUNT(*) FROM courses');
    const bookingsCount = await pool.query('SELECT COUNT(*) FROM bookings');
    const studentsCount = await pool.query("SELECT COUNT(*) FROM users WHERE role = 'student'");
    
    res.json({
      success: true,
      data: {
        totalUsers: parseInt(usersCount.rows[0].count),
        totalCourses: parseInt(coursesCount.rows[0].count),
        totalBookings: parseInt(bookingsCount.rows[0].count),
        totalStudents: parseInt(studentsCount.rows[0].count)
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

// Start server (only in development)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📊 API endpoint: http://localhost:${PORT}/api`);
  });
}
