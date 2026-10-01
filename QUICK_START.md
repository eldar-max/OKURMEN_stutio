# ⚡ Быстрый старт - ОКУРМЭН

## 1️⃣ Установка

```bash
npm install
```

## 2️⃣ Настройка Firebase (5 минут)

### Шаг 1: Включить Google Authentication
1. Откройте https://console.firebase.google.com/project/okurmen-3f257/authentication
2. Нажмите "Get Started"
3. Включите **Google** провайдер
4. Сохраните

### Шаг 2: Создать Firestore Database
1. Откройте https://console.firebase.google.com/project/okurmen-3f257/firestore
2. Нажмите "Create database"
3. Выберите **"Test mode"**
4. Регион: **europe-west1**
5. Нажмите "Enable"

### Шаг 3: Настроить правила Firestore
1. Перейдите на вкладку **"Rules"**
2. Скопируйте правила из [FIREBASE_CONSOLE_STEPS.md](./FIREBASE_CONSOLE_STEPS.md)
3. Нажмите "Publish"

## 3️⃣ Запуск проекта

```bash
npm run dev
```

Откройте http://localhost:5173

## 4️⃣ Тестирование

1. Перейдите на http://localhost:5173/login
2. Нажмите **"Войти через Google"**
3. Выберите Google аккаунт
4. Готово! Вы в личном кабинете студента

## 📁 Структура проекта

```
OKURMEN/
├── src/
│   ├── components/        # Компоненты (Navbar, Footer, Hero, и т.д.)
│   ├── pages/            # Страницы (Landing, Login, Student, Teacher)
│   ├── services/         # Firebase и API
│   └── assets/           # Логотип, изображения
├── .env                  # Firebase конфигурация (не коммитить!)
└── FIREBASE_CONSOLE_STEPS.md  # Подробная инструкция
```

## 🔑 Роли пользователей

- **student** - личный кабинет студента (по умолчанию)
- **teacher** - кабинет преподавателя
- **admin** - админка (делает ваш напарник)

### Как изменить роль:
1. Откройте Firebase Console → Firestore
2. Найдите коллекцию `users`
3. Откройте документ с вашим uid
4. Измените поле `role` на `teacher` или `student`

## 🎨 Что уже работает

✅ Главная страница с анимациями
✅ Google вход через Firebase
✅ Регистрация с выбором роли
✅ Личный кабинет студента
✅ Кабинет преподавателя
✅ Responsive дизайн
✅ Красивые анимации
✅ Профиль в Navbar

## 📝 Что дальше

- [ ] Ваш напарник создаст админку
- [ ] Добавить реальные курсы в Firestore
- [ ] Система платежей
- [ ] Telegram уведомления
- [ ] Личные сообщения

## 🆘 Проблемы?

### Ошибка "Firebase: Error (auth/configuration-not-found)"
- Включите Google Authentication в Firebase Console

### Ошибка "Missing or insufficient permissions"
- Создайте Firestore Database
- Настройте правила безопасности

### Не работает Google вход
- Проверьте что домен авторизован в Firebase Console
- Очистите кэш браузера

## 🔗 Документация

- [Firebase Setup](./FIREBASE_CONSOLE_STEPS.md) - Подробная настройка
- [Firebase Documentation](https://firebase.google.com/docs)
- [React + Vite](https://vitejs.dev/guide/)
