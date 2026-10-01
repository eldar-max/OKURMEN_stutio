# 🔧 OKURMEN - Техническая документация

## 📋 Содержание

1. [Архитектура](#архитектура)
2. [API Endpoints](#api-endpoints)
3. [База данных](#база-данных)
4. [Аутентификация](#аутентификация)
5. [Переменные окружения](#переменные-окружения)
6. [Развертывание](#развертывание)
7. [Troubleshooting](#troubleshooting)

---

## 🏗️ Архитектура

### Общая структура

```
┌─────────────────┐
│   Пользователь  │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│    Frontend (React)     │
│   Vite + Tailwind CSS   │
│   http://localhost:5173 │
└────────┬────────────────┘
         │ HTTP/HTTPS
         ▼
┌─────────────────────────┐
│   Backend (Express)     │
│   Node.js + Prisma      │
│   http://localhost:3001 │
└────────┬────────────────┘
         │ SQL
         ▼
┌─────────────────────────┐
│   PostgreSQL Database   │
│   Neon/Render Hosting   │
└─────────────────────────┘

┌──────────────────────────┐
│  External Services       │
├──────────────────────────┤
│  • Firebase (Auth)       │
│  • Telegram Bot API      │
│  • Nodemailer (Email)    │
│  • Vercel (Hosting)      │
└──────────────────────────┘
```

### Поток данных

1. **Пользователь** открывает сайт → **Vite Dev Server** / **Vercel**
2. **React App** делает API запросы → **Express Backend**
3. **Backend** обрабатывает запросы → **PostgreSQL** через **Prisma ORM**
4. **Backend** возвращает JSON → **Frontend** отображает данные
5. **Firebase** обрабатывает Google OAuth
6. **Telegram Bot** отправляет уведомления администраторам

---

## 🔌 API Endpoints

### Base URL
- **Локально**: `http://localhost:3001/api`
- **Продакшн**: `https://okurmen-swart.vercel.app/api`

### Аутентификация

#### POST `/api/auth/register`
Регистрация нового пользователя

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "fullName": "string",
  "role": "student" | "teacher" | "admin"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "username": "string",
    "email": "string",
    "role": "string"
  },
  "token": "jwt_token"
}
```

#### POST `/api/auth/login`
Вход в систему

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token",
  "user": {
    "id": "uuid",
    "username": "string",
    "role": "string"
  }
}
```

#### POST `/api/auth/google`
Google OAuth вход

**Request Body:**
```json
{
  "idToken": "google_id_token"
}
```

### Курсы

#### GET `/api/courses`
Получить все курсы

**Query Parameters:**
- `category` (optional): "it" | "languages" | "skills"
- `limit` (optional): number
- `offset` (optional): number

**Response:**
```json
{
  "success": true,
  "courses": [
    {
      "id": "uuid",
      "title": "Frontend Development",
      "description": "HTML, CSS, JavaScript, React",
      "category": "it",
      "duration": 6,
      "price": 15000,
      "image": "url",
      "createdAt": "timestamp"
    }
  ],
  "total": 10
}
```

#### GET `/api/courses/:id`
Получить курс по ID

**Response:**
```json
{
  "success": true,
  "course": {
    "id": "uuid",
    "title": "string",
    "description": "string",
    "category": "string",
    "duration": number,
    "price": number,
    "syllabus": [],
    "teacher": {
      "id": "uuid",
      "name": "string"
    }
  }
}
```

#### POST `/api/courses` (Admin only)
Создать новый курс

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "category": "it" | "languages" | "skills",
  "duration": number,
  "price": number,
  "teacherId": "uuid"
}
```

### Бронирование

#### POST `/api/bookings`
Забронировать урок

**Request Body:**
```json
{
  "studentId": "uuid",
  "courseId": "uuid",
  "date": "ISO 8601 date",
  "time": "HH:MM",
  "name": "string",
  "email": "string",
  "phone": "string"
}
```

**Response:**
```json
{
  "success": true,
  "booking": {
    "id": "uuid",
    "studentId": "uuid",
    "courseId": "uuid",
    "date": "timestamp",
    "status": "pending"
  }
}
```

#### GET `/api/bookings/:userId`
Получить бронирования пользователя

**Response:**
```json
{
  "success": true,
  "bookings": [
    {
      "id": "uuid",
      "course": {
        "title": "string"
      },
      "date": "timestamp",
      "status": "pending" | "confirmed" | "cancelled"
    }
  ]
}
```

### Студенты

#### GET `/api/students`
Получить всех студентов (Teacher/Admin only)

**Response:**
```json
{
  "success": true,
  "students": [
    {
      "id": "uuid",
      "fullName": "string",
      "email": "string",
      "enrolledCourses": 3,
      "progress": 65
    }
  ]
}
```

### Администратор

#### POST `/api/admin/verify`
Верификация админ кода

**Request Body:**
```json
{
  "email": "string",
  "code": "string"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token"
}
```

#### GET `/api/admin/stats`
Статистика платформы

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalStudents": number,
    "totalCourses": number,
    "totalRevenue": number,
    "activeEnrollments": number
  }
}
```

---

## 🗄️ База данных

### Prisma Schema

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Пользователи
model User {
  id            String      @id @default(uuid())
  email         String      @unique
  username      String      @unique
  fullName      String
  password      String?     // Null для Google OAuth
  role          Role        @default(STUDENT)
  photoURL      String?
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
  
  // Связи
  enrollments   Enrollment[]
  bookings      Booking[]
  teacherCourses Course[]   @relation("TeacherCourses")
}

// Роли
enum Role {
  STUDENT
  TEACHER
  ADMIN
}

// Курсы
model Course {
  id          String       @id @default(uuid())
  title       String
  description String
  category    CourseCategory
  duration    Int          // в месяцах
  price       Int          // в сомах
  image       String?
  syllabus    Json?        // JSON массив тем
  teacherId   String
  teacher     User         @relation("TeacherCourses", fields: [teacherId], references: [id])
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  
  // Связи
  enrollments Enrollment[]
  bookings    Booking[]
}

enum CourseCategory {
  IT
  LANGUAGES
  SKILLS
}

// Записи на курсы
model Enrollment {
  id          String        @id @default(uuid())
  studentId   String
  student     User          @relation(fields: [studentId], references: [id])
  courseId    String
  course      Course        @relation(fields: [courseId], references: [id])
  progress    Int           @default(0) // Процент прогресса
  status      EnrollmentStatus @default(ACTIVE)
  enrolledAt  DateTime      @default(now())
  completedAt DateTime?
  
  @@unique([studentId, courseId])
}

enum EnrollmentStatus {
  ACTIVE
  COMPLETED
  CANCELLED
}

// Бронирования уроков
model Booking {
  id        String        @id @default(uuid())
  studentId String
  student   User          @relation(fields: [studentId], references: [id])
  courseId  String
  course    Course        @relation(fields: [courseId], references: [id])
  date      DateTime
  time      String
  name      String
  email     String
  phone     String
  status    BookingStatus @default(PENDING)
  createdAt DateTime      @default(now())
  updatedAt DateTime      @updatedAt
}

enum BookingStatus {
  PENDING
  CONFIRMED
  CANCELLED
  COMPLETED
}

// Админ коды
model AdminCode {
  id        String   @id @default(uuid())
  email     String
  code      String
  expiresAt DateTime
  used      Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

### Миграции

```bash
# Создать миграцию
npx prisma migrate dev --name init

# Применить миграции
npx prisma migrate deploy

# Сгенерировать Prisma Client
npx prisma generate

# Открыть Prisma Studio (GUI для БД)
npx prisma studio
```

---

## 🔐 Аутентификация

### Firebase Google OAuth

#### Настройка

1. **Firebase Console** → Authentication → Sign-in method
2. Включить **Google** провайдера
3. Получить **Web Client ID** и **API Key**
4. Добавить домены в **Authorized domains**

#### Код интеграции

```javascript
// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // ...
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Отправить в backend для создания/обновления пользователя
    const response = await axios.post('/api/auth/google', {
      idToken: await user.getIdToken(),
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};
```

### JWT Tokens

```javascript
// backend/middleware/auth.js
import jwt from 'jsonwebtoken';

export const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

### Telegram 2FA для Админов

```javascript
// src/services/adminCode.js
export const generateAndSendAdminCode = async (email, name) => {
  // Генерируем 6-значный код
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Отправляем в Telegram
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
  
  const message = `
🔐 Админ вход
👤 ${name}
📧 ${email}
🔑 Код: ${code}
⏰ Истекает через 5 минут
  `;
  
  await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    chat_id: chatId,
    text: message
  });
  
  // Сохраняем код в БД
  await axios.post('/api/admin/save-code', {
    email,
    code,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 минут
  });
};
```

---

## ⚙️ Переменные окружения

### Frontend (.env)

```env
# API
VITE_API_URL=http://localhost:3001

# Firebase
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=okurmen.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=okurmen
VITE_FIREBASE_STORAGE_BUCKET=okurmen.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef

# Google OAuth
VITE_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
VITE_GOOGLE_CLIENT_SECRET=GOCSPX-XXXXXXXXXXXXXXXX

# Telegram
VITE_TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
VITE_TELEGRAM_CHAT_ID=123456789
```

### Backend (backend/.env)

```env
# Server
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@host:5432/okurmen?sslmode=require

# JWT
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Google OAuth
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-XXXXXXXXXXXXXXXX

# Telegram
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=OKURMEN <noreply@okurmen.kg>
```

---

## 🚀 Развертывание

### Vercel Deployment

#### 1. Установка Vercel CLI

```bash
npm i -g vercel
vercel login
```

#### 2. Конфигурация (vercel.json)

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    },
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

#### 3. Деплой

```bash
# Первый деплой
vercel

# Продакшн деплой
vercel --prod

# Или через Git (автоматически)
git push origin master
```

#### 4. Добавление переменных окружения

```bash
# Через CLI
vercel env add VITE_API_URL
vercel env add DATABASE_URL

# Или через Dashboard
# https://vercel.com/dashboard → Project → Settings → Environment Variables
```

### PostgreSQL на Neon

1. Создать аккаунт на [neon.tech](https://neon.tech)
2. Создать новый проект
3. Скопировать `DATABASE_URL`
4. Добавить в Vercel Environment Variables

### Автоматический деплой

```bash
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [master]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 🐛 Troubleshooting

### Проблема: Backend не запускается

**Ошибка:**
```
Error: listen EADDRINUSE: address already in use :::3001
```

**Решение:**
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3001 | xargs kill
```

### Проблема: База данных не подключается

**Ошибка:**
```
PrismaClientInitializationError: Can't reach database server
```

**Решение:**
1. Проверить `DATABASE_URL` в `.env`
2. Проверить SSL режим:
```env
DATABASE_URL=postgresql://...?sslmode=require
```
3. Запустить миграции:
```bash
npx prisma migrate deploy
```

### Проблема: CORS ошибки

**Ошибка:**
```
Access to fetch at 'http://localhost:3001/api/...' from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Решение:**
```javascript
// backend/server.js
import cors from 'cors';

app.use(cors({
  origin: ['http://localhost:5173', 'https://okurmen-swart.vercel.app'],
  credentials: true
}));
```

### Проблема: Firebase аутентификация не работает

**Решение:**
1. Проверить Firebase Console → Authentication → Settings
2. Добавить домены в Authorized domains
3. Проверить API ключи в `.env`
4. Проверить Google OAuth credentials

### Проблема: Vite не находит .env переменные

**Решение:**
Все переменные должны начинаться с `VITE_`:
```env
# ✅ Правильно
VITE_API_URL=http://localhost:3001

# ❌ Неправильно
API_URL=http://localhost:3001
```

---

## 📊 Мониторинг и логирование

### Backend логи

```javascript
// backend/middleware/logger.js
export const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
};

app.use(logger);
```

### Error tracking

```javascript
// backend/middleware/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  res.status(err.status || 500).json({
    success: false,
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

app.use(errorHandler);
```

---

## 🧪 Тестирование

### Unit tests (будущее)

```bash
npm install --save-dev vitest @testing-library/react
```

```javascript
// src/components/__tests__/Hero.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

describe('Hero Component', () => {
  it('renders hero title', () => {
    render(<Hero />);
    expect(screen.getByText(/OKURMEN/i)).toBeInTheDocument();
  });
});
```

---

**Документация обновлена: Декабрь 2024**
