# 🚀 OKURMEN Backend API

Backend API для образовательной платформы OKURMEN с использованием Node.js, Express и Firebase.

## 📋 Оглавление

- [Технологии](#технологии)
- [Установка](#установка)
- [API Endpoints](#api-endpoints)
- [Аутентификация](#аутентификация)
- [Запуск](#запуск)

---

## 🛠 Технологии

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Firebase Admin SDK** - Database & Authentication
- **Firestore** - NoSQL Database
- **Firebase Auth** - User authentication

---

## 📦 Установка

### 1. Установить зависимости

```bash
cd backend
npm install
```

### 2. Настроить Firebase

1. Скачать `serviceAccountKey.json` из Firebase Console
2. Поместить в `backend/lib/serviceAccountKey.json`

### 3. Создать .env файл

```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
```

---

## 🔌 API Endpoints

### **Health Check**

```http
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "message": "OKURMEN Backend API is running with Firebase",
  "timestamp": "2024-01-20T10:30:00.000Z",
  "version": "1.0.0"
}
```

---

### **Users (Колдонуучулар)**

#### Get all users (Admin only)
```http
GET /api/users
Authorization: Bearer <token>
```

#### Get user by ID
```http
GET /api/users/:id
```

#### Create user (Admin only)
```http
POST /api/users
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "student@example.com",
  "displayName": "Айбек Мамедов",
  "phone": "+996 555 123 456",
  "role": "student",
  "dateOfBirth": "2000-01-15",
  "address": "Бишкек"
}
```

#### Update user (Admin only)
```http
PUT /api/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "displayName": "Айбек Мамедов Updated",
  "phone": "+996 555 999 888"
}
```

#### Delete user (Admin only)
```http
DELETE /api/users/:id
Authorization: Bearer <token>
```

#### Get users by role (Admin only)
```http
GET /api/users/role/:role
Authorization: Bearer <token>
```

Roles: `student`, `teacher`, `admin`

#### Update user status (Admin only)
```http
PATCH /api/users/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "active"
}
```

Status: `active`, `inactive`, `blocked`

---

### **Courses (Курстар)**

#### Get all courses
```http
GET /api/courses
```

#### Get course by ID
```http
GET /api/courses/:id
```

#### Get courses by category
```http
GET /api/courses/category/:category
```

Categories: `IT`, `Языки`, `Навыки`

#### Get courses by teacher
```http
GET /api/courses/teacher/:teacherId
```

#### Create course (Admin only)
```http
POST /api/courses
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Frontend Development",
  "nameKg": "Frontend иштеп чыгуу",
  "nameRu": "Frontend разработка",
  "nameEn": "Frontend Development",
  "description": "Изучение React, JavaScript, HTML/CSS",
  "descriptionKg": "React, JavaScript, HTML/CSS үйрөнүү",
  "descriptionRu": "Изучение React, JavaScript, HTML/CSS",
  "descriptionEn": "Learn React, JavaScript, HTML/CSS",
  "duration": "6 месяцев",
  "price": 5000,
  "teacherId": "teacher123",
  "teacherName": "Нурбек К.",
  "category": "IT",
  "level": "Начальный",
  "maxStudents": 30,
  "startDate": "2024-02-01",
  "schedule": {
    "days": ["Пн", "Ср", "Пт"],
    "time": "18:00-20:00"
  }
}
```

#### Update course (Admin only)
```http
PUT /api/courses/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "price": 6000,
  "maxStudents": 35
}
```

#### Delete course (Admin only)
```http
DELETE /api/courses/:id
Authorization: Bearer <token>
```

#### Enroll student (Authenticated users)
```http
POST /api/courses/:id/enroll
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "student123"
}
```

---

### **Payments (Төлөмдөр)**

#### Get all payments (Admin only)
```http
GET /api/payments
Authorization: Bearer <token>
```

#### Get payment by ID
```http
GET /api/payments/:id
Authorization: Bearer <token>
```

#### Create payment
```http
POST /api/payments
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "student123",
  "studentName": "Айбек Мамедов",
  "courseId": "course123",
  "courseName": "Frontend Development",
  "amount": 5000,
  "method": "Банк",
  "receipt": "https://example.com/receipt.jpg",
  "notes": ""
}
```

Methods: `Банк`, `Наличные`, `Карта`, `MBank`, `O!Деньги`

#### Confirm payment (Admin only)
```http
POST /api/payments/:id/confirm
Authorization: Bearer <token>
Content-Type: application/json

{
  "adminId": "admin123"
}
```

#### Reject payment (Admin only)
```http
POST /api/payments/:id/reject
Authorization: Bearer <token>
Content-Type: application/json

{
  "adminId": "admin123",
  "reason": "Неверная квитанция"
}
```

#### Get payments by user
```http
GET /api/payments/user/:userId
Authorization: Bearer <token>
```

#### Get payments by status (Admin only)
```http
GET /api/payments/status/:status
Authorization: Bearer <token>
```

Status: `pending`, `completed`, `rejected`

#### Get payment statistics (Admin only)
```http
GET /api/payments/stats
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalRevenue": 150000,
    "totalPayments": 45,
    "pending": 5,
    "completed": 38,
    "rejected": 2
  }
}
```

---

## 🔐 Аутентификация

Все защищенные endpoints требуют Firebase JWT token в заголовке:

```http
Authorization: Bearer <firebase-id-token>
```

### Получение токена (Frontend):

```javascript
import { getAuth } from 'firebase/auth';

const auth = getAuth();
const user = auth.currentUser;

if (user) {
  const token = await user.getIdToken();
  // Используйте token в headers
}
```

### Роли пользователей:

- **student** - Окуучу (может записываться на курсы, делать платежи)
- **teacher** - Мугалим (может управлять своими курсами, видеть студентов)
- **admin** - Администратор (полный доступ ко всем функциям)

---

## 🚀 Запуск

### Development mode:

```bash
npm run dev
```

Server запустится на `http://localhost:3001`

### Production mode:

```bash
npm start
```

---

## 📁 Структура проекта

```
backend/
├── controllers/
│   ├── userController.js      # Логика для users
│   ├── courseController.js    # Логика для courses
│   └── paymentController.js   # Логика для payments
├── middleware/
│   └── authMiddleware.js      # JWT verification & role checks
├── routes/
│   ├── userRoutes.js          # User endpoints
│   ├── courseRoutes.js        # Course endpoints
│   └── paymentRoutes.js       # Payment endpoints
├── lib/
│   └── serviceAccountKey.json # Firebase credentials (не в git!)
├── server-firebase.js         # Main server file
├── package.json
└── .env
```

---

## 🐛 Отладка

### Проверить подключение:

```bash
curl http://localhost:3001/api/health
```

### Логи:

Все запросы логируются в console:
```
2024-01-20T10:30:00.000Z - GET /api/courses
2024-01-20T10:30:05.000Z - POST /api/payments
```

---

## 📝 Примеры использования

### JavaScript (Fetch):

```javascript
// Get all courses
const response = await fetch('http://localhost:3001/api/courses');
const data = await response.json();

// Create payment with auth
const token = await user.getIdToken();
const response = await fetch('http://localhost:3001/api/payments', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    userId: 'student123',
    courseId: 'course123',
    amount: 5000,
    method: 'Банк'
  })
});
```

### Axios:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

// Add token to all requests
api.interceptors.request.use(async (config) => {
  const token = await user.getIdToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Get users
const users = await api.get('/users');

// Create course
const newCourse = await api.post('/courses', courseData);
```

---

## 🔒 Безопасность

1. **JWT Tokens** - Все защищенные endpoints проверяют Firebase token
2. **Role-based Access** - Разные роли имеют разные права доступа
3. **Input Validation** - Все входные данные валидируются
4. **CORS** - Настроен только для разрешенных доменов
5. **Environment Variables** - Секретные данные в `.env`

---

## 📊 Мониторинг

### Health Check:
```bash
curl http://localhost:3001/api/health
```

### Stats:
```bash
curl -H "Authorization: Bearer <token>" http://localhost:3001/api/payments/stats
```

---

## 🆘 Troubleshooting

### Ошибка: "Token verification failed"
- Проверить правильность Firebase credentials
- Убедиться что токен не истек
- Обновить токен: `await user.getIdToken(true)`

### Ошибка: "Permission denied"
- Проверить роль пользователя в Firestore
- Убедиться что у пользователя есть нужные права

### Ошибка подключения к Firestore
- Проверить `serviceAccountKey.json`
- Проверить `FIREBASE_DATABASE_URL` в `.env`

---

## 📮 Контакты

- **Email**: info@okurmen.kg
- **Website**: https://okurmen.kg
- **GitHub**: https://github.com/eldar-max/OKURMEN_stutio

---

**Version**: 1.0.0  
**Last Updated**: 2024-01-20
