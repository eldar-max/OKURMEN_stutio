# Prisma Setup для OKURMEN Backend

## 📦 Установка

Prisma и @prisma/client уже добавлены в package.json. Установите зависимости:

```bash
cd backend
npm install
```

## 🗄️ Схема базы данных

Схема находится в `prisma/schema.prisma` и включает:

### Модели:
- **User** - пользователи (студенты, учителя, админы)
- **Course** - курсы
- **Booking** - бронирования/заявки на курсы
- **Enrollment** - записи студентов на курсы
- **Payment** - платежи
- **Notification** - уведомления

### Enum:
- **Role** - роли (STUDENT, TEACHER, ADMIN)

## 🚀 Команды Prisma

### 1. Генерация Prisma Client
Создает типизированный клиент для работы с БД:
```bash
npm run prisma:generate
```

### 2. Создание миграции (dev)
Создает новую миграцию и применяет её:
```bash
npm run prisma:migrate
```

### 3. Push схемы в БД (быстрый способ)
Применяет изменения без создания миграции:
```bash
npm run prisma:push
```

### 4. Prisma Studio (GUI)
Открывает графический интерфейс для работы с БД:
```bash
npm run prisma:studio
```

## 📝 Быстрый старт

### Шаг 1: Примените схему к базе данных
```bash
npm run prisma:push
```

### Шаг 2: Сгенерируйте Prisma Client
```bash
npm run prisma:generate
```

### Шаг 3: Запустите сервер
```bash
npm run dev
```

## 💡 Использование в коде

```javascript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Создание пользователя
const user = await prisma.user.create({
  data: {
    email: 'student@okurmen.kg',
    name: 'Айбек Осмонов',
    role: 'STUDENT'
  }
});

// Получение всех курсов
const courses = await prisma.course.findMany({
  where: { status: 'active' }
});

// Создание бронирования
const booking = await prisma.booking.create({
  data: {
    name: 'Айбек',
    email: 'test@mail.com',
    phone: '+996555123456',
    course: 'Frontend Development',
    startDate: new Date(),
    format: 'hybrid'
  }
});
```

## 🔄 Обновление схемы

1. Измените `schema.prisma`
2. Примените изменения:
   ```bash
   npm run prisma:push
   ```
3. Перегенерируйте клиент:
   ```bash
   npm run prisma:generate
   ```

## 📊 Prisma Studio

Для визуальной работы с данными:
```bash
npm run prisma:studio
```

Откроется браузер на http://localhost:5555

## 🔗 Полезные ссылки

- [Prisma Docs](https://www.prisma.io/docs)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)

## ⚠️ Важно

- `.env` файл содержит DATABASE_URL - не коммитьте его в Git!
- После изменения схемы всегда запускайте `prisma:generate`
- Для продакшена используйте миграции (`prisma:migrate`)
