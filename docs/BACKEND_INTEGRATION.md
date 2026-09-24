# Backend Integration Guide

## Overview

Полное руководство по интеграции frontend с backend для платформы ОКУРМЭН.

---

## API Endpoints

### Base URL
```
http://localhost:3000/api  (development)
https://api.okurmen.kg/api  (production)
```

---

## Authentication

### POST `/auth/login`
Авторизация администратора.

**Request:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@okurmen.kg",
    "role": "admin",
    "full_name": "Администратор"
  }
}
```

**Response (401):**
```json
{
  "success": false,
  "message": "Неверное имя пользователя или пароль"
}
```

### POST `/auth/logout`
Выход из системы.

**Headers:** `Authorization: Bearer {token}`

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### GET `/auth/verify`
Проверка токена.

**Headers:** `Authorization: Bearer {token}`

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "admin",
    "role": "admin"
  }
}
```

---

## Courses

### GET `/courses`
Получить все курсы.

**Query Parameters:**
- `status` - filter by status (active, inactive, archived)
- `category` - filter by category (it, language, skills)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Frontend Development",
      "slug": "frontend-development",
      "description": "Изучите React, JavaScript, HTML/CSS",
      "duration": "6 месяцев",
      "price": 5000,
      "format": "hybrid",
      "status": "active",
      "student_count": 120,
      "category": "it",
      "features": ["React & Redux", "Responsive Design"],
      "created_at": "2024-01-15T10:00:00Z"
    }
  ],
  "total": 12
}
```

### GET `/courses/:id`
Получить курс по ID.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Frontend Development",
    // ... остальные поля
  }
}
```

### POST `/courses`
Создать новый курс.

**Headers:** `Authorization: Bearer {token}`

**Request:**
```json
{
  "name": "New Course",
  "slug": "new-course",
  "description": "Course description",
  "duration": "3 месяца",
  "price": 3000,
  "format": "hybrid",
  "category": "it",
  "features": ["Feature 1", "Feature 2"]
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 13,
    "name": "New Course",
    // ... остальные поля
  },
  "message": "Course created successfully"
}
```

### PUT `/courses/:id`
Обновить курс.

**Headers:** `Authorization: Bearer {token}`

**Request:** (те же поля что и при создании)

**Response (200):**
```json
{
  "success": true,
  "data": { /* updated course */ },
  "message": "Course updated successfully"
}
```

### DELETE `/courses/:id`
Удалить курс.

**Headers:** `Authorization: Bearer {token}`

**Response (200):**
```json
{
  "success": true,
  "message": "Course deleted successfully"
}
```

---

## Students

### GET `/students`
Получить всех студентов.

**Query Parameters:**
- `status` - active, inactive, graduated
- `page` - номер страницы (default: 1)
- `limit` - количество на странице (default: 20)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "first_name": "Айбек",
      "last_name": "Осмонов",
      "email": "aibek@example.com",
      "phone": "+996 555 123 456",
      "status": "active",
      "enrollment_date": "2024-01-15",
      "created_at": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 3245,
    "page": 1,
    "limit": 20,
    "pages": 163
  }
}
```

### GET `/students/:id`
Получить студента по ID.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "first_name": "Айбек",
    "last_name": "Осмонов",
    // ... остальные поля
    "enrollments": [
      {
        "id": 1,
        "course": {
          "id": 1,
          "name": "Frontend Development"
        },
        "start_date": "2024-01-15",
        "status": "active",
        "progress": 45
      }
    ],
    "payments": [
      {
        "id": 1,
        "amount": 5000,
        "status": "completed",
        "payment_date": "2024-01-15"
      }
    ]
  }
}
```

### POST `/students`
Создать нового студента.

**Headers:** `Authorization: Bearer {token}`

**Request:**
```json
{
  "first_name": "Айбек",
  "last_name": "Осмонов",
  "email": "aibek@example.com",
  "phone": "+996 555 123 456",
  "date_of_birth": "2000-05-15",
  "address": "г. Бишкек"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": { /* created student */ },
  "message": "Student created successfully"
}
```

### PUT `/students/:id`
Обновить студента.

### DELETE `/students/:id`
Удалить студента.

### POST `/students/:id/enroll`
Записать студента на курс.

**Request:**
```json
{
  "course_id": 1,
  "start_date": "2024-10-01",
  "format": "hybrid"
}
```

---

## Bookings

### GET `/bookings`
Получить все заявки.

**Query Parameters:**
- `status` - pending, confirmed, cancelled, converted
- `date_from` - фильтр по дате начала
- `date_to` - фильтр по дате окончания

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "first_name": "Айбек",
      "last_name": "Осмонов",
      "email": "aibek@example.com",
      "phone": "+996 555 123 456",
      "course": {
        "id": 1,
        "name": "Frontend Development",
        "price": 5000
      },
      "start_date": "2024-10-01",
      "format": "hybrid",
      "message": "Хочу изучить React",
      "status": "pending",
      "created_at": "2024-09-24T15:30:00Z"
    }
  ],
  "total": 45
}
```

### POST `/bookings`
Создать новую заявку (используется на лендинге).

**Request:**
```json
{
  "first_name": "Айбек",
  "last_name": "Осмонов",
  "email": "aibek@example.com",
  "phone": "+996 555 123 456",
  "course": "frontend",
  "start_date": "2024-10-01",
  "format": "hybrid",
  "message": "Хочу изучить React"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 46,
    // ... booking data
  },
  "message": "Заявка успешно создана. Мы свяжемся с вами в ближайшее время."
}
```

### PATCH `/bookings/:id/status`
Обновить статус заявки.

**Headers:** `Authorization: Bearer {token}`

**Request:**
```json
{
  "status": "confirmed"
}
```

---

## Payments

### GET `/payments`
Получить все платежи.

**Query Parameters:**
- `status` - pending, completed, failed, refunded
- `student_id` - фильтр по студенту
- `date_from`, `date_to` - фильтр по дате

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "student": {
        "id": 1,
        "first_name": "Айбек",
        "last_name": "Осмонов"
      },
      "course": {
        "id": 1,
        "name": "Frontend Development"
      },
      "amount": 5000,
      "currency": "KGS",
      "method": "card",
      "status": "completed",
      "payment_date": "2024-09-24",
      "created_at": "2024-09-24T15:45:00Z"
    }
  ],
  "total": 1250
}
```

### POST `/payments`
Создать платеж.

**Request:**
```json
{
  "student_id": 1,
  "course_id": 1,
  "amount": 5000,
  "method": "card",
  "transaction_id": "txn_123456789"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": { /* payment data */ },
  "message": "Payment created successfully"
}
```

### GET `/payments/stats`
Получить статистику платежей.

**Query Parameters:**
- `period` - today, week, month, year

**Response (200):**
```json
{
  "success": true,
  "data": {
    "total_revenue": 2500000,
    "completed_payments": 1250,
    "pending_payments": 45,
    "failed_payments": 10,
    "revenue_by_month": [
      { "month": "2024-01", "revenue": 250000 },
      { "month": "2024-02", "revenue": 300000 }
    ]
  }
}
```

---

## Telegram Integration

### POST `/telegram/notify`
Отправить уведомление в Telegram.

**Request:**
```json
{
  "type": "booking",
  "message": "🎓 *Новая заявка на курс*\n\n👤 Студент: Айбек Осмонов...",
  "data": {
    "firstName": "Айбек",
    "lastName": "Осмонов",
    // ... остальные данные
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Notification sent successfully",
  "telegram_message_id": 12345
}
```

---

## Dashboard

### GET `/dashboard/stats`
Получить статистику для дашборда.

**Headers:** `Authorization: Bearer {token}`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "total_students": 3245,
    "active_courses": 12,
    "monthly_revenue": 2500000,
    "pending_bookings": 45,
    "students_change": "+12%",
    "revenue_change": "+18%"
  }
}
```

### GET `/dashboard/enrollments/recent`
Последние записи на курсы.

**Query Parameters:**
- `limit` - количество записей (default: 5)

---

## Error Responses

Все ошибки возвращаются в следующем формате:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Authentication Flow

1. **Login:** POST `/auth/login` → получить token
2. **Store token:** сохранить в localStorage
3. **Add to requests:** добавлять header `Authorization: Bearer {token}`
4. **Handle 401:** при получении 401 → redirect на `/login`
5. **Refresh:** опционально POST `/auth/refresh` для обновления токена

---

## Telegram Bot Setup

### 1. Создать бота
```bash
# Найти @BotFather в Telegram
# Отправить /newbot
# Получить токен
```

### 2. Получить Chat ID
```bash
# Найти @userinfobot в Telegram
# Отправить /start
# Скопировать ваш ID
```

### 3. Добавить в .env
```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

### 4. Отправка уведомлений
```javascript
const axios = require('axios');

async function sendTelegramNotification(message) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  
  await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
    chat_id: chatId,
    text: message,
    parse_mode: 'Markdown'
  });
}
```

---

## CORS Configuration

Backend должен разрешить запросы с frontend:

```javascript
// Express.js example
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:5173', 'https://okurmen.kg'],
  credentials: true
}));
```

---

## Environment Variables

Frontend `.env`:
```env
VITE_API_URL=http://localhost:3000/api
VITE_TELEGRAM_BOT_TOKEN=your_bot_token
VITE_ENV=development
```

Backend `.env`:
```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/okurmen
JWT_SECRET=your_jwt_secret_key
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
CORS_ORIGIN=http://localhost:5173
```

---

## Testing the Integration

### 1. Start Backend
```bash
npm run dev
```

### 2. Start Frontend
```bash
npm run dev
```

### 3. Test endpoints with curl:
```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Get courses
curl http://localhost:3000/api/courses

# Create booking
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@test.com",...}'
```

---

## Next Steps

1. Implement all API endpoints on backend
2. Setup PostgreSQL database
3. Configure Telegram bot
4. Test all integrations
5. Deploy to production

---

## Support

Если есть вопросы по интеграции, свяжитесь с frontend разработчиком.
