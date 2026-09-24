# ОКУРМЭН - Образовательная платформа

![ОКУРМЭН Logo](https://via.placeholder.com/150x150?text=OKURMEN)

Современная образовательная платформа с лендингом, админ-панелью, системой бронирования и интеграцией с Telegram.

**Билимден мүмкүнчүлүккө карай** 🎓

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/react-18.3-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/vite-5.4-purple)](https://vitejs.dev/)

---

## 🚀 Технологии

### Frontend
- **React 18.3** - UI библиотека
- **Vite 5.4** - Быстрая сборка и dev server
- **Tailwind CSS 3.4** - Утилитарные стили
- **Framer Motion 11** - Плавные анимации
- **React Router 6** - Навигация
- **React Icons 5** - Профессиональные иконки
- **Axios** - HTTP клиент

### Backend Requirements
- **Node.js 18+**
- **PostgreSQL 14+**
- **Express.js** (рекомендуется)

---

## 📦 Установка

### Клонировать репозиторий
```bash
git clone https://github.com/yourusername/okurmen-platform.git
cd okurmen-platform
```

### Установить зависимости
```bash
npm install
```

### Настроить переменные окружения
```bash
cp .env.example .env
```

Отредактировать `.env`:
```env
VITE_API_URL=http://localhost:3000/api
VITE_TELEGRAM_BOT_TOKEN=your_bot_token_here
VITE_ENV=development
```

### Запустить dev сервер
```bash
npm run dev
```

Откройте http://localhost:5173

---

## 🎨 Особенности

### ✨ Лендинг страница
- ✅ Современный дизайн с градиентами и анимациями
- ✅ Hero секция с анимированным фоном
- ✅ Секция "О нас" с ключевыми преимуществами
- ✅ Каталог курсов с фильтрацией
- ✅ Команда с табами (Основатели/Тренеры/Менторы/Персонал)
- ✅ Статистика студентов и выпускников
- ✅ Отзывы студентов и родителей
- ✅ Контактная информация и соц. сети
- ✅ Полностью адаптивный дизайн (mobile-first)
- ✅ Плавная прокрутка и scroll-анимации

### 🔐 Админ панель
- ✅ Защищенный вход (JWT authentication)
- ✅ Dashboard с статистикой в реальном времени
- ✅ CRUD управление курсами
- ✅ CRUD управление студентами
- ✅ Управление платежами с фильтрацией
- ✅ Responsive sidebar с коллапсом
- ✅ Роли пользователей

### 📝 Система бронирования
- ✅ 3-шаговая форма записи
  - Шаг 1: Личная информация
  - Шаг 2: Выбор курса и формата
  - Шаг 3: Подтверждение
- ✅ Валидация форм
- ✅ Выбор формата обучения (Гибрид/Офлайн)
- ✅ Интеграция с API

### 💳 Система оплаты
- ✅ Множественные способы оплаты:
  - Банковская карта (Visa/Mastercard)
  - Mbank
  - Наличные
- ✅ Безопасная обработка данных
- ✅ Подтверждение успешной оплаты
- ✅ Интеграция с Telegram для уведомлений

### 🤖 Telegram интеграция
- ✅ Автоматические уведомления о новых заявках
- ✅ Уведомления о платежах
- ✅ Форматированные сообщения с эмодзи

---

## 📁 Структура проекта

```
okurmen-platform/
├── docs/                          # Документация
│   ├── DATABASE_SCHEMA.md         # Схема базы данных
│   ├── BACKEND_INTEGRATION.md     # API эндпоинты
│   └── DEPLOYMENT.md              # Инструкции по деплою
├── public/                        # Статические файлы
├── src/
│   ├── components/                # React компоненты
│   │   ├── Navbar.jsx            # Навигация
│   │   ├── Hero.jsx              # Главная секция
│   │   ├── AboutUs.jsx           # О нас
│   │   ├── Courses.jsx           # Курсы
│   │   ├── Team.jsx              # Команда
│   │   ├── Students.jsx          # Студенты
│   │   ├── Graduates.jsx         # Выпускники
│   │   ├── Testimonials.jsx      # Отзывы
│   │   ├── Footer.jsx            # Подвал
│   │   ├── BookingModal.jsx      # Форма записи
│   │   └── PaymentModal.jsx      # Форма оплаты
│   ├── pages/                     # Страницы
│   │   ├── LandingPage.jsx       # Главная страница
│   │   ├── AdminPanel.jsx        # Админ панель
│   │   └── Login.jsx             # Страница входа
│   ├── services/                  # API сервисы
│   │   └── api.js                # Axios конфигурация
│   ├── App.jsx                    # Главный компонент
│   ├── main.jsx                   # Точка входа
│   └── index.css                  # Глобальные стили
├── .env.example                   # Пример переменных окружения
├── package.json                   # Зависимости
├── tailwind.config.js             # Конфиг Tailwind
├── vite.config.js                 # Конфиг Vite
└── README.md                      # Этот файл
```

---

## 🔧 Доступные команды

```bash
# Development
npm run dev          # Запустить dev сервер (localhost:5173)

# Production
npm run build        # Собрать для продакшена
npm run preview      # Предпросмотр продакшен сборки

# Linting (если настроено)
npm run lint         # Проверить код
```

---

## 🔐 Демо доступ

### Админ панель
- **URL:** http://localhost:5173/login
- **Username:** `admin`
- **Password:** `admin123`

⚠️ **Важно:** Измените демо credentials перед деплоем!

---

## 🔌 Backend интеграция

### Требуемые API endpoints:

Полная документация в [`docs/BACKEND_INTEGRATION.md`](docs/BACKEND_INTEGRATION.md)

**Основные эндпоинты:**
- `POST /api/auth/login` - Авторизация
- `GET /api/courses` - Получить курсы
- `POST /api/bookings` - Создать заявку
- `POST /api/payments` - Создать платеж
- `POST /api/telegram/notify` - Отправить в Telegram

### Database Schema

Полная схема в [`docs/DATABASE_SCHEMA.md`](docs/DATABASE_SCHEMA.md)

**Основные таблицы:**
- `users` - Администраторы
- `courses` - Курсы
- `students` - Студенты
- `bookings` - Заявки
- `payments` - Платежи
- `enrollments` - Записи на курсы

---

## 📱 Telegram Bot Setup

### 1. Создать бота
```
1. Найти @BotFather в Telegram
2. Отправить /newbot
3. Следовать инструкциям
4. Получить токен
```

### 2. Получить Chat ID
```
1. Найти @userinfobot
2. Отправить /start
3. Скопировать ID
```

### 3. Добавить в .env
```env
VITE_TELEGRAM_BOT_TOKEN=your_bot_token
```

---

## 🚀 Deployment

Полная инструкция по деплою в [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)

### Quick Deploy (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add VITE_API_URL
vercel env add VITE_TELEGRAM_BOT_TOKEN

# Deploy to production
vercel --prod
```

---

## 🎓 Основатели

- **Санжарбек Мадумар** - Со-основатель
- **Улукбек Бакыбек уулу** - Со-основатель

Основано в **мае 2022 года**

---

## 📞 Контакты

- **Website:** https://okurmen.kg
- **Email:** info@okurmen.kg
- **Phone:** +996 XXX XXX XXX
- **Address:** г. Бишкек, Кыргызстан

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- React Team за отличный фреймворк
- Tailwind CSS за утилитарные стили
- Framer Motion за плавные анимации
- Vercel за отличный хостинг

---

## 📊 Project Status

- ✅ Frontend - Завершен
- 🔄 Backend - В разработке (партнёр)
- 🔄 Deployment - Планируется

---

## 📈 Future Improvements

- [ ] Личный кабинет студента
- [ ] Онлайн видео-уроки
- [ ] Система тестирования
- [ ] Сертификаты после окончания
- [ ] Мобильное приложение
- [ ] Интеграция с платежными системами
- [ ] Email уведомления
- [ ] Чат поддержки

---

**© 2024 ОКУРМЭН. Все права защищены.**
