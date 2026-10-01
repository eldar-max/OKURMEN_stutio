# 📚 OKURMEN - Образовательная платформа

## 🎯 Описание проекта

**OKURMEN** — это современная образовательная платформа для изучения IT технологий, языков и профессиональных навыков. Платформа предоставляет интерактивные курсы с практическими заданиями, поддержкой менторов и помощью в трудоустройстве.

### 🌐 Ссылки
- **Производственный сайт**: https://okurmen-swart.vercel.app
- **GitHub репозиторий**: https://github.com/eldar-max/OKURMEN_stutio.git
- **Локальный Frontend**: http://localhost:5173
- **Локальный Backend**: http://localhost:3001

---

## 🏗️ Архитектура проекта

### Технологический стек

#### Frontend
- **React 18.3.1** - библиотека для создания пользовательского интерфейса
- **Vite 5.4.0** - быстрый сборщик и dev-сервер
- **React Router DOM 6.26.0** - маршрутизация между страницами
- **Tailwind CSS 3.4.10** - utility-first CSS фреймворк
- **Framer Motion 11.3.0** - библиотека анимаций
- **GSAP 3.15.0** - продвинутые анимации
- **React Icons 5.3.0** - набор иконок
- **Axios 1.7.0** - HTTP клиент для API запросов
- **Firebase 12.19.0** - аутентификация через Google

#### Backend
- **Node.js** - серверная платформа
- **Express 4.18.2** - веб-фреймворк
- **PostgreSQL** - реляционная база данных
- **Prisma 5.22.0** - ORM для работы с БД
- **Nodemailer 6.9.7** - отправка email уведомлений
- **CORS 2.8.5** - обработка cross-origin запросов
- **dotenv 16.3.1** - управление переменными окружения

#### Деплой и хостинг
- **Vercel** - хостинг для frontend и backend
- **Neon/Render** - хостинг PostgreSQL базы данных
- **Firebase** - Google OAuth аутентификация
- **Telegram Bot API** - уведомления для администраторов

---

## 📁 Структура проекта

```
OKURMEN/
├── 📂 src/                          # Исходный код frontend
│   ├── 📂 components/               # React компоненты
│   │   ├── Hero.jsx                 # Главный баннер
│   │   ├── Navbar.jsx               # Навигационная панель
│   │   ├── Courses.jsx              # Каталог курсов
│   │   ├── WhyUs.jsx                # Преимущества платформы
│   │   ├── AboutUs.jsx              # О компании
│   │   ├── Team.jsx                 # Команда преподавателей
│   │   ├── Founders.jsx             # Основатели
│   │   ├── Graduates.jsx            # Выпускники
│   │   ├── Students.jsx             # Студенты
│   │   ├── Testimonials.jsx         # Отзывы
│   │   ├── OurClassrooms.jsx        # Наши аудитории
│   │   ├── Footer.jsx               # Подвал сайта
│   │   ├── LanguageSwitcher.jsx     # Переключатель языков
│   │   ├── BookingModal.jsx         # Модальное окно бронирования
│   │   ├── PaymentModal.jsx         # Модальное окно оплаты
│   │   ├── AIChat.jsx               # AI чат-бот
│   │   ├── Loader.jsx               # Загрузчик
│   │   └── ...                      # Другие компоненты
│   │
│   ├── 📂 pages/                    # Страницы приложения
│   │   ├── LandingPage.jsx          # Главная страница
│   │   ├── Login.jsx                # Страница входа
│   │   ├── Registration.jsx         # Страница регистрации
│   │   ├── StudentDashboard.jsx     # Личный кабинет студента
│   │   ├── TeacherDashboard.jsx     # Личный кабинет преподавателя
│   │   ├── AdminDashboard.jsx       # Панель администратора
│   │   ├── AdminVerification.jsx    # Верификация админа
│   │   └── NotFound.jsx             # Страница 404
│   │
│   ├── 📂 context/                  # React Context API
│   │   └── LanguageContext.jsx      # Контекст для переводов (RU/EN/KG)
│   │
│   ├── 📂 services/                 # Сервисы
│   │   ├── firebase.js              # Firebase конфигурация
│   │   └── adminCode.js             # Генерация админ кодов
│   │
│   ├── 📂 assets/                   # Статические ресурсы
│   │   └── ...                      # Изображения, шрифты
│   │
│   ├── App.jsx                      # Главный компонент приложения
│   ├── main.jsx                     # Точка входа React
│   └── index.css                    # Глобальные стили
│
├── 📂 backend/                      # Backend сервер
│   ├── 📂 prisma/                   # Prisma ORM
│   │   ├── schema.prisma            # Схема базы данных
│   │   └── migrations/              # Миграции БД
│   │
│   ├── 📂 routes/                   # API маршруты
│   │   ├── bookings.js              # Бронирование уроков
│   │   ├── courses.js               # Курсы
│   │   ├── students.js              # Студенты
│   │   └── ...                      # Другие маршруты
│   │
│   ├── server.js                    # Главный файл сервера
│   ├── initDatabase.js              # Инициализация БД
│   ├── package.json                 # Зависимости backend
│   ├── .env                         # Переменные окружения
│   └── vercel.json                  # Конфигурация Vercel
│
├── 📂 docs/                         # Документация
│
├── package.json                     # Зависимости frontend
├── vite.config.js                   # Конфигурация Vite
├── tailwind.config.js               # Конфигурация Tailwind
├── vercel.json                      # Конфигурация Vercel
├── .env                             # Переменные окружения frontend
├── .gitignore                       # Игнорируемые файлы Git
└── README.md                        # Основная документация
```

---

## 🌟 Основные возможности

### 1. 🎓 Каталог курсов
- **IT курсы**: Frontend, Backend, UX/UI Design, Python, Java
- **Языки**: Английский, Немецкий, Французский
- **Навыки**: Soft skills, Project Management, Data Science
- Фильтрация по категориям
- Информация о длительности и стоимости
- Онлайн бронирование уроков

### 2. 👤 Система аутентификации
- Регистрация через форму
- Вход через Google OAuth (Firebase)
- Три типа пользователей:
  - **Студент** - доступ к курсам и материалам
  - **Преподаватель** - управление уроками
  - **Администратор** - полный доступ с двухфакторной аутентификацией (Telegram)

### 3. 📊 Личные кабинеты

#### Студент
- Просмотр записанных курсов
- Прогресс обучения
- Расписание занятий
- Домашние задания
- Сертификаты

#### Преподаватель
- Управление курсами
- Список студентов
- Расписание уроков
- Оценивание работ
- Аналитика успеваемости

#### Администратор
- Управление пользователями
- Статистика платформы
- Управление курсами
- Финансовые отчеты
- Верификация через Telegram бот

### 4. 🌐 Мультиязычность
- **Русский (RU)** 🇷🇺
- **Английский (EN)** 🇬🇧
- **Кыргызский (KG)** 🇰🇬
- Переключатель языков в навигации
- Все тексты переведены через Context API
- По умолчанию установлен кыргызский язык

### 5. 💳 Система бронирования и оплаты
- Модальное окно бронирования урока
- Выбор курса и преподавателя
- Выбор даты и времени
- Форма оплаты (в разработке)
- Email уведомления

### 6. 🎨 Современный UI/UX
- Адаптивный дизайн для всех устройств
- Плавные анимации (Framer Motion, GSAP)
- Интерактивные элементы
- Темная/светлая тема (частично)
- Загрузчики и скелетоны

### 7. 📱 Мобильная адаптация
- Полностью адаптивная верстка
- Оптимизированное меню для мобильных
- Touch-friendly элементы
- Быстрая загрузка на мобильных устройствах

### 8. 🤖 Дополнительные функции
- AI чат-бот для помощи студентам
- Интеграция с Telegram для админов
- Email рассылки (Nodemailer)
- Система отзывов
- Галерея выпускников

---

## 🗄️ База данных

### PostgreSQL схема (Prisma)

```prisma
// Пользователи
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  username  String   @unique
  fullName  String
  role      Role     @default(STUDENT)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// Роли
enum Role {
  STUDENT
  TEACHER
  ADMIN
}

// Курсы
model Course {
  id          String   @id @default(uuid())
  title       String
  description String
  category    String
  duration    Int      // в месяцах
  price       Int      // в сомах
  createdAt   DateTime @default(now())
}

// Бронирования
model Booking {
  id        String   @id @default(uuid())
  studentId String
  courseId  String
  date      DateTime
  status    BookingStatus @default(PENDING)
  createdAt DateTime @default(now())
}

// И другие таблицы...
```

---

## 🔐 Безопасность

### Аутентификация
- JWT токены для сессий
- Google OAuth через Firebase
- Хеширование паролей
- CORS защита
- Rate limiting

### Администраторский доступ
1. Вход через Google с email: `isabekoveldat@gmail.com`
2. Генерация 6-значного кода
3. Отправка кода в Telegram бот
4. Верификация кода на странице AdminVerification
5. Доступ к админ панели

### Переменные окружения
```env
# Frontend (.env)
VITE_API_URL=http://localhost:3001
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx
VITE_FIREBASE_PROJECT_ID=xxx
VITE_FIREBASE_STORAGE_BUCKET=xxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=xxx

# Backend (backend/.env)
DATABASE_URL=postgresql://...
PORT=3001
TELEGRAM_BOT_TOKEN=xxx
TELEGRAM_CHAT_ID=xxx
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
```

---

## 🚀 Установка и запуск

### Предварительные требования
- Node.js >= 18.x
- PostgreSQL >= 14.x
- npm или yarn
- Git

### Установка

```bash
# 1. Клонировать репозиторий
git clone https://github.com/eldar-max/OKURMEN_stutio.git
cd OKURMEN

# 2. Установить зависимости frontend
npm install

# 3. Установить зависимости backend
cd backend
npm install

# 4. Настроить переменные окружения
cp .env.example .env
# Отредактировать .env файлы

# 5. Инициализировать базу данных
npx prisma generate
npx prisma db push

# 6. Запустить backend (из папки backend)
npm run dev

# 7. Запустить frontend (из корневой папки)
npm run dev
```

### Локальный запуск

```bash
# Terminal 1 - Backend
cd backend
npm run dev
# Сервер запустится на http://localhost:3001

# Terminal 2 - Frontend
npm run dev
# Сайт откроется на http://localhost:5173
```

---

## 📦 Деплой на Vercel

### Автоматический деплой
```bash
# Установить Vercel CLI
npm i -g vercel

# Войти в аккаунт
vercel login

# Деплой
vercel --prod

# Или через Git
git add .
git commit -m "Your changes"
git push
# Vercel автоматически задеплоит
```

### Переменные окружения в Vercel
Все переменные из `.env` нужно добавить в настройки проекта Vercel:
- Project Settings → Environment Variables
- Или через CLI: `vercel env add <NAME>`

---

## 📈 Статистика проекта

### Компоненты
- **25+ React компонентов**
- **8 страниц**
- **3 типа пользователей**
- **3 языка интерфейса**

### Функционал
- ✅ Регистрация и вход
- ✅ Каталог курсов
- ✅ Бронирование уроков
- ✅ Личные кабинеты
- ✅ Мультиязычность
- ✅ Адаптивный дизайн
- ✅ Анимации
- ✅ Google OAuth
- ✅ Telegram интеграция
- ✅ Email рассылки

### База данных
- **5+ таблиц**
- **PostgreSQL**
- **Prisma ORM**

---

## 👥 Команда

### Основатели
- **Eldar Isabekov** - Co-Founder & CEO
- **[Имя второго основателя]** - Co-Founder & CTO

### Преподаватели
- 15+ практикующих специалистов
- Опыт в крупных IT компаниях
- Средний опыт работы: 5+ лет

---

## 📞 Контакты

- **Сайт**: https://okurmen-swart.vercel.app
- **Email**: info@okurmen.kg
- **Телефон**: +996 XXX XXX XXX
- **Адрес**: Бишкек, Примерная ул., 123, БЦ "IT-Park", 3 этаж

---

## 📝 Лицензия

MIT License - своц

---

## 🔄 Версия

**v1.0.0** - Декабрь 2024

---

## 📚 Дополнительная документация

- `QUICK_START.md` - Быстрый старт
- `COMPLETE_FEATURES.md` - Полный список функций
- `FIREBASE_SETUP.md` - Настройка Firebase
- `TELEGRAM_BOT_SETUP.md` - Настройка Telegram бота
- `ADMIN_ACCESS.md` - Доступ администратора
- `TROUBLESHOOTING.md` - Решение проблем
- `MOBILE_OPTIMIZATION.md` - Мобильная оптимизация

---

## 🎯 Будущие планы

- [ ] Видео уроки
- [ ] Онлайн тестирование
- [ ] Сертификаты
- [ ] Мобильное приложение
- [ ] Интеграция с платежными системами
- [ ] Расширенная аналитика
- [ ] Геймификация обучения
- [ ] Форум для студентов

---

**Сделано с ❤️ командой OKURMEN**
