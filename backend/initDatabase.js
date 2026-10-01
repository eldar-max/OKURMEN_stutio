import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function initDatabase() {
  try {
    console.log('🔄 Initializing database...');

    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50),
        role VARCHAR(50) DEFAULT 'student',
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table created');

    // Create courses table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        duration VARCHAR(100),
        price VARCHAR(100),
        teacher VARCHAR(255),
        category VARCHAR(100),
        status VARCHAR(50) DEFAULT 'active',
        students_count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Courses table created');

    // Create bookings table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        course VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Bookings table created');

    // Create payments table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        student_name VARCHAR(255) NOT NULL,
        course_name VARCHAR(255) NOT NULL,
        amount VARCHAR(100) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        method VARCHAR(100),
        transaction_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Payments table created');

    // Insert sample data
    await pool.query(`
      INSERT INTO users (name, email, phone, role, status)
      VALUES 
        ('Айбек Мамедов', 'aibek@mail.ru', '+996 555 123 456', 'student', 'active'),
        ('Асель Бекова', 'asel@mail.ru', '+996 555 234 567', 'student', 'active'),
        ('Нурбек Кадыров', 'nurbek@mail.ru', '+996 555 345 678', 'teacher', 'active')
      ON CONFLICT (email) DO NOTHING
    `);
    console.log('✅ Sample users inserted');

    await pool.query(`
      INSERT INTO courses (name, description, duration, price, teacher, category, status, students_count)
      VALUES 
        ('Frontend Development', 'Изучение React, JavaScript, HTML/CSS', '6 месяцев', '5000 сом', 'Нурбек К.', 'IT', 'active', 45),
        ('Backend Development', 'Node.js, Python, Databases', '6 месяцев', '5000 сом', 'Тилек А.', 'IT', 'active', 38),
        ('Англис тили', 'От начального до продвинутого уровня', '8 месяцев', '3000 сом', 'Айжан М.', 'Языки', 'active', 52)
      ON CONFLICT DO NOTHING
    `);
    console.log('✅ Sample courses inserted');

    console.log('✨ Database initialized successfully!');
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
  } finally {
    await pool.end();
  }
}

initDatabase();
