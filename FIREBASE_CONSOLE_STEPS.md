# 🔥 Настройка Firebase Console - Быстрая инструкция

## ✅ Ваш проект уже создан!
- **Project ID**: `okurmen-3f257`
- **Конфигурация**: уже добавлена в проект

## 📋 Что нужно сделать в Firebase Console:

### 1. Включить Google Authentication

1. Откройте [Firebase Console](https://console.firebase.google.com/project/okurmen-3f257)
2. В меню слева выберите **"Authentication"** (Аутентификация)
3. Нажмите **"Get Started"** (Начать)
4. На вкладке **"Sign-in method"** (Способ входа):
   - Найдите **"Google"**
   - Нажмите на него
   - Включите переключатель
   - Выберите **Project support email** (ваш email)
   - Нажмите **"Save"** (Сохранить)

### 2. Создать Firestore Database

1. В меню слева выберите **"Firestore Database"**
2. Нажмите **"Create database"** (Создать базу данных)
3. Выберите **"Start in test mode"** (Начать в тестовом режиме)
4. Выберите регион: **"europe-west1"** (Бельгия - ближайший к Кыргызстану)
5. Нажмите **"Enable"** (Включить)

### 3. Настроить правила безопасности Firestore

1. После создания базы перейдите на вкладку **"Rules"** (Правила)
2. Замените правила на следующие:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Пользователи могут читать и изменять только свои данные
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Курсы могут читать все авторизованные пользователи
    match /courses/{courseId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'teacher';
    }
    
    // Записи на курсы
    match /enrollments/{enrollmentId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
                             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['teacher'];
    }
  }
}
```

3. Нажмите **"Publish"** (Опубликовать)

### 4. Добавить авторизованные домены (если нужно)

1. В **Authentication** → **Settings** (Настройки)
2. Прокрутите до **"Authorized domains"** (Авторизованные домены)
3. `localhost` уже добавлен автоматически
4. Когда будете деплоить, добавьте ваш production домен

## 🧪 Тестирование

1. Убедитесь что сервер запущен: `npm run dev`
2. Откройте http://localhost:5173/login
3. Нажмите **"Войти через Google"**
4. Выберите Google аккаунт
5. Проверьте что:
   - Вы вошли в систему
   - В Firebase Console → Authentication появился новый пользователь
   - В Firestore → users появилась запись с вашим uid

## 🎯 Структура данных в Firestore

После первого входа автоматически создастся коллекция:

### Collection: `users`
```
users/{uid}
├── uid: string
├── email: string
├── displayName: string
├── photoURL: string
├── role: string ("student" | "teacher")
├── createdAt: string (ISO timestamp)
└── updatedAt: string (ISO timestamp)
```

### Будущие коллекции (создадутся автоматически):

**courses** - курсы преподавателей
**enrollments** - записи студентов на курсы
**payments** - история платежей
**lessons** - уроки курсов

## ⚠️ Важно для Production

Когда будете запускать в production:

1. **Измените правила Firestore** на более строгие:
   - Добавьте валидацию данных
   - Ограничьте операции записи

2. **Настройте квоты**:
   - Firebase → Project Settings → Usage and billing
   - Установите лимиты на количество запросов

3. **Включите мониторинг**:
   - Analytics уже подключен
   - Настройте уведомления об ошибках

## 🔗 Полезные ссылки

- [Ваш проект в Firebase Console](https://console.firebase.google.com/project/okurmen-3f257)
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

## ✅ Готово!

После выполнения этих шагов:
- ✅ Google вход будет работать
- ✅ Данные пользователей будут сохраняться в Firestore
- ✅ Безопасные правила доступа настроены
