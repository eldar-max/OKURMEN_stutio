# ОКУРМЭН - Database Schema Documentation

## Overview

Полная схема базы данных для платформы ОКУРМЭН с описанием всех таблиц, полей и связей.

---

## Tables

### 1. **users** (Пользователи системы - администраторы)

Таблица для хранения учетных записей администраторов и сотрудников.

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  role VARCHAR(20) NOT NULL DEFAULT 'admin', -- admin, manager, mentor
  status VARCHAR(20) DEFAULT 'active', -- active, inactive
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
```

---

### 2. **courses** (Курсы)

Таблица для хранения информации о доступных курсах.

```sql
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  duration VARCHAR(50), -- "6 месяцев", "4 месяца"
  price DECIMAL(10, 2) DEFAULT 0, -- цена в сомах
  format VARCHAR(20) DEFAULT 'hybrid', -- hybrid, offline, online
  status VARCHAR(20) DEFAULT 'active', -- active, inactive, archived
  student_count INTEGER DEFAULT 0,
  category VARCHAR(50), -- it, language, skills
  features JSONB, -- ["React & Redux", "API Integration"]
  icon VARCHAR(50), -- название иконки
  color VARCHAR(50), -- градиент цвета
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_courses_status ON courses(status);
CREATE INDEX idx_courses_category ON courses(category);
```

**Пример данных:**
```json
{
  "name": "Frontend Development",
  "price": 5000,
  "features": ["React & Redux", "Responsive Design", "API Integration"]
}
```

---

### 3. **students** (Студенты)

Таблица для хранения информации о студентах.

```sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  date_of_birth DATE,
  address TEXT,
  status VARCHAR(20) DEFAULT 'active', -- active, inactive, graduated
  enrollment_date DATE DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_students_email ON students(email);
CREATE INDEX idx_students_phone ON students(phone);
CREATE INDEX idx_students_status ON students(status);
```

---

### 4. **enrollments** (Записи на курсы)

Связь между студентами и курсами.

```sql
CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  start_date DATE,
  end_date DATE,
  format VARCHAR(20) DEFAULT 'hybrid', -- hybrid, offline
  status VARCHAR(20) DEFAULT 'active', -- active, completed, dropped
  progress INTEGER DEFAULT 0, -- процент прохождения 0-100
  grade VARCHAR(10), -- A, B, C, D, F
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(student_id, course_id)
);

CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);
CREATE INDEX idx_enrollments_status ON enrollments(status);
```

---

### 5. **bookings** (Заявки на запись)

Таблица для хранения заявок от потенциальных студентов.

```sql
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  course_id INTEGER REFERENCES courses(id) ON DELETE SET NULL,
  start_date DATE,
  format VARCHAR(20) DEFAULT 'hybrid',
  message TEXT,
  status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, cancelled, converted
  student_id INTEGER REFERENCES students(id) ON DELETE SET NULL, -- если заявка конвертирована
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_course ON bookings(course_id);
CREATE INDEX idx_bookings_created ON bookings(created_at DESC);
```

---

### 6. **payments** (Платежи)

Таблица для хранения информации о платежах.

```sql
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  course_id INTEGER REFERENCES courses(id) ON DELETE SET NULL,
  enrollment_id INTEGER REFERENCES enrollments(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'KGS',
  method VARCHAR(50) NOT NULL, -- card, mbank, cash, bank_transfer
  status VARCHAR(20) DEFAULT 'pending', -- pending, completed, failed, refunded
  transaction_id VARCHAR(100), -- ID от платежной системы
  payment_date DATE DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_payments_student ON payments(student_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_date ON payments(payment_date DESC);
```

---

### 7. **staff** (Сотрудники - тренеры, менторы)

Таблица для хранения информации о тренерах и менторах.

```sql
CREATE TABLE staff (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  role VARCHAR(50) NOT NULL, -- trainer, mentor, manager, sales
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20),
  specialization VARCHAR(100), -- Frontend, Backend, Design
  bio TEXT,
  experience_years INTEGER,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_staff_role ON staff(role);
CREATE INDEX idx_staff_status ON staff(status);
```

---

### 8. **testimonials** (Отзывы)

Таблица для хранения отзывов студентов и родителей.

```sql
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  type VARCHAR(20) NOT NULL, -- student, parent
  author_name VARCHAR(100) NOT NULL,
  author_role VARCHAR(100), -- для студентов: Frontend Developer
  company VARCHAR(100), -- для студентов: IT Company
  course_id INTEGER REFERENCES courses(id) ON DELETE SET NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_testimonials_type ON testimonials(type);
CREATE INDEX idx_testimonials_status ON testimonials(status);
CREATE INDEX idx_testimonials_featured ON testimonials(is_featured);
```

---

### 9. **notifications** (Уведомления)

Таблица для логирования отправленных уведомлений в Telegram.

```sql
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL, -- booking, payment, enrollment
  recipient VARCHAR(100), -- telegram chat id или email
  message TEXT NOT NULL,
  data JSONB, -- полные данные уведомления
  status VARCHAR(20) DEFAULT 'pending', -- pending, sent, failed
  sent_at TIMESTAMP,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_status ON notifications(status);
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);
```

---

### 10. **settings** (Настройки системы)

Таблица для хранения настроек системы.

```sql
CREATE TABLE settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  description TEXT,
  type VARCHAR(20) DEFAULT 'string', -- string, number, boolean, json
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_settings_key ON settings(key);
```

**Примеры настроек:**
```sql
INSERT INTO settings (key, value, description) VALUES
  ('telegram_bot_token', 'your_bot_token', 'Telegram Bot API Token'),
  ('telegram_chat_id', 'your_chat_id', 'Telegram Chat ID для уведомлений'),
  ('site_name', 'ОКУРМЭН', 'Название сайта'),
  ('contact_phone', '+996 XXX XXX XXX', 'Контактный телефон'),
  ('contact_email', 'info@okurmen.kg', 'Контактный email');
```

---

## Relationships (Связи)

```
users 1:N staff (один пользователь может быть связан с одним сотрудником)
courses 1:N enrollments (один курс - много записей)
students 1:N enrollments (один студент - много записей)
students 1:N payments (один студент - много платежей)
courses 1:N payments (один курс - много платежей)
courses 1:N bookings (один курс - много заявок)
students 1:N bookings (один студент - много заявок после конвертации)
courses 1:N testimonials (один курс - много отзывов)
```

---

## Важные запросы

### Статистика для дашборда
```sql
-- Всего студентов
SELECT COUNT(*) FROM students WHERE status = 'active';

-- Активные курсы
SELECT COUNT(*) FROM courses WHERE status = 'active';

-- Доход за месяц
SELECT SUM(amount) FROM payments 
WHERE status = 'completed' 
  AND payment_date >= DATE_TRUNC('month', CURRENT_DATE);

-- Новые заявки
SELECT COUNT(*) FROM bookings WHERE status = 'pending';
```

### Последние записи
```sql
SELECT 
  b.id,
  b.first_name || ' ' || b.last_name as student_name,
  c.name as course_name,
  b.created_at,
  b.status
FROM bookings b
LEFT JOIN courses c ON b.course_id = c.id
ORDER BY b.created_at DESC
LIMIT 5;
```

---

## Миграции

Рекомендуется использовать инструменты миграций (например, Prisma, TypeORM, или Knex.js) для управления схемой базы данных.

---

## Индексы для оптимизации

Основные индексы уже включены в схему выше. Дополнительно можно добавить:

```sql
-- Составные индексы для частых запросов
CREATE INDEX idx_enrollments_student_status ON enrollments(student_id, status);
CREATE INDEX idx_payments_student_status ON payments(student_id, status);
CREATE INDEX idx_bookings_created_status ON bookings(created_at DESC, status);
```

---

## Backup и безопасность

1. **Регулярные бэкапы**: настроить автоматическое резервное копирование БД
2. **Хеширование паролей**: использовать bcrypt для хеширования паролей
3. **Валидация данных**: проверка на уровне приложения и БД
4. **Логирование**: записывать важные операции в отдельную таблицу audit_log

---

## Примечания для backend разработчика

1. Все таймстампы используют UTC
2. Суммы денег хранятся как DECIMAL(10, 2)
3. JSONB используется для гибких данных (features, settings)
4. Статусы используют строки для читаемости (можно заменить на ENUM)
5. ON DELETE CASCADE для зависимых данных, SET NULL для ссылок
