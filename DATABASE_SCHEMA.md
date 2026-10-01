# 🗄️ База данных - Схема

## Архитектура
- **База**: Firebase Firestore (NoSQL)
- **Аутентификация**: Firebase Auth
- **Хранилище файлов**: Firebase Storage

---

## 📊 Коллекции Firestore

### 1. **users** (Пользователи)
```javascript
users/{userId}
├── uid: string              // Firebase Auth UID
├── email: string            // Email адрес
├── displayName: string      // Аты-жөнү
├── photoURL: string         // Сүрөт URL
├── role: string             // 'student' | 'teacher' | 'admin'
├── phone: string            // Телефон номери
├── dateOfBirth: string      // Туулган күнү
├── address: string          // Дареги
├── createdAt: timestamp     // Катталган датасы
├── lastActive: timestamp    // Акыркы активдүүлүк
├── status: string           // 'active' | 'inactive' | 'blocked'
├── courses: array           // Жазылган курстар [courseId]
└── payments: array          // Төлөмдөр [paymentId]
```

### 2. **courses** (Курстар)
```javascript
courses/{courseId}
├── id: string               // Курстун ID
├── name: string             // Курстун аталышы
├── nameKg: string           // Аталыш (Кырг)
├── nameRu: string           // Аталыш (Рус)
├── nameEn: string           // Аталыш (Англис)
├── description: string      // Сүрөттөмө
├── descriptionKg: string    // Сүрөттөмө (Кырг)
├── descriptionRu: string    // Сүрөттөмө (Рус)
├── descriptionEn: string    // Сүрөттөмө (Англис)
├── duration: string         // Узактыгы (мис: "6 месяцев")
├── price: number            // Баасы (сом)
├── teacherId: string        // Мугалимдин ID
├── teacherName: string      // Мугалимдин аты
├── category: string         // Категория ('IT', 'Языки')
├── level: string            // Деңгээл ('Начальный', 'Средний', 'Продвинутый')
├── students: array          // Окуучулар [userId]
├── maxStudents: number      // Макс окуучулар саны
├── startDate: string        // Башталуу датасы
├── endDate: string          // Аяктоо датасы
├── schedule: object         // Расписание
│   ├── days: array          // Күндөр ['Пн', 'Ср', 'Пт']
│   └── time: string         // Убакыт ('18:00-20:00')
├── image: string            // Сүрөт URL
├── status: string           // 'active' | 'completed' | 'upcoming'
├── createdAt: timestamp     // Түзүлгөн датасы
└── updatedAt: timestamp     // Жаңыланган датасы
```

### 3. **payments** (Төлөмдөр)
```javascript
payments/{paymentId}
├── id: string               // Төлөмдүн ID
├── userId: string           // Окуучунун ID
├── studentName: string      // Окуучунун аты
├── courseId: string         // Курстун ID
├── courseName: string       // Курстун аталышы
├── amount: number           // Сумма (сом)
├── method: string           // Төлөө ыкмасы ('Банк', 'Наличные', 'Карта', 'MBank', 'O!Деньги')
├── status: string           // Статус ('pending', 'completed', 'rejected')
├── transactionId: string    // Транзакция ID
├── date: timestamp          // Төлөө датасы
├── confirmedBy: string      // Ким тастыктады (adminId)
├── confirmedAt: timestamp   // Тастыкталган датасы
├── receipt: string          // Квитанция сүрөтү URL
└── notes: string            // Кошумча маалымат
```

### 4. **bookings** (Брондоолор)
```javascript
bookings/{bookingId}
├── id: string               // Брондоонун ID
├── userId: string           // Колдонуучунун ID
├── name: string             // Аты-жөнү
├── phone: string            // Телефон
├── courseId: string         // Курстун ID
├── courseName: string       // Курстун аталышы
├── coursePrice: number      // Курстун баасы
├── paymentMethod: string    // Төлөө ыкмасы
├── status: string           // 'pending' | 'confirmed' | 'cancelled'
├── createdAt: timestamp     // Түзүлгөн датасы
└── processedBy: string      // Ким иштеди (adminId)
```

### 5. **team** (Команда)
```javascript
team/{memberId}
├── id: string               // Мүчөнүн ID
├── name: string             // Аты-жөнү
├── nameKg: string           // Аты-жөнү (Кырг)
├── nameRu: string           // Аты-жөнү (Рус)
├── nameEn: string           // Аты-жөнү (Англис)
├── role: string             // Ролу
├── roleKg: string           // Ролу (Кырг)
├── roleRu: string           // Ролу (Рус)
├── roleEn: string           // Ролу (Англис)
├── category: string         // 'founder' | 'management' | 'sales' | 'mentor' | 'trainer' | 'curator'
├── specialty: string        // Адистиги ('Frontend', 'Backend', 'English')
├── photo: string            // Сүрөт URL
├── bio: string              // Биография
├── email: string            // Email
├── phone: string            // Телефон
└── social: object           // Соцтармактар
    ├── telegram: string
    ├── instagram: string
    └── linkedin: string
```

### 6. **graduates** (Бүтүрүүчүлөр)
```javascript
graduates/{graduateId}
├── id: string               // Бүтүрүүчүнүн ID
├── name: string             // Аты-жөнү
├── course: string           // Бүткөн курсу
├── year: number             // Бүткөн жылы
├── photo: string            // Сүрөт URL
├── currentJob: string       // Азыркы жумушу
├── company: string          // Компания
├── testimonial: string      // Пикири
└── achievements: array      // Жетишкендиктери
```

### 7. **testimonials** (Пикирлер)
```javascript
testimonials/{testimonialId}
├── id: string               // Пикирдин ID
├── userId: string           // Колдонуучунун ID
├── userName: string         // Аты-жөнү
├── userPhoto: string        // Сүрөт URL
├── courseId: string         // Курстун ID
├── courseName: string       // Курстун аталышы
├── rating: number           // Рейтинг (1-5)
├── text: string             // Пикир тексти
├── textKg: string           // Пикир (Кырг)
├── textRu: string           // Пикир (Рус)
├── textEn: string           // Пикир (Англис)
├── status: string           // 'pending' | 'approved' | 'rejected'
├── createdAt: timestamp     // Түзүлгөн датасы
└── approvedBy: string       // Ким тастыктады (adminId)
```

---

## 🔐 Firebase Auth

### Провайдерлер:
- Email/Password
- Google OAuth

### Роллер:
```javascript
roles: {
  student: {
    permissions: ['viewCourses', 'enrollCourse', 'makePayment', 'viewProfile']
  },
  teacher: {
    permissions: ['viewCourses', 'manageCourses', 'viewStudents', 'viewProfile']
  },
  admin: {
    permissions: ['*'] // Бардык уруксаттар
  }
}
```

---

## 📁 Firebase Storage

### Структура:
```
/users/{userId}/
  ├── profile.jpg           // Профиль сүрөтү
  └── documents/            // Документтер

/courses/{courseId}/
  ├── cover.jpg             // Курстун сүрөтү
  └── materials/            // Окуу материалдары

/payments/{paymentId}/
  └── receipt.jpg           // Төлөм квитанциясы

/team/{memberId}/
  └── photo.jpg             // Команда мүчөсүнүн сүрөтү

/graduates/{graduateId}/
  └── photo.jpg             // Бүтүрүүчүнүн сүрөтү
```

---

## 🔄 API Endpoints (Backend)

### Auth
- `POST /api/auth/register` - Каттоо
- `POST /api/auth/login` - Кирүү
- `POST /api/auth/logout` - Чыгуу
- `POST /api/auth/google` - Google аркылуу кирүү

### Users
- `GET /api/users` - Бардык колдонуучулар (admin)
- `GET /api/users/:id` - Колдонуучу маалыматы
- `PUT /api/users/:id` - Маалыматты жаңылоо
- `DELETE /api/users/:id` - Колдонуучуну өчүрүү (admin)

### Courses
- `GET /api/courses` - Бардык курстар
- `GET /api/courses/:id` - Курс маалыматы
- `POST /api/courses` - Курс кошуу (admin)
- `PUT /api/courses/:id` - Курсту жаңылоо (admin)
- `DELETE /api/courses/:id` - Курсту өчүрүү (admin)
- `POST /api/courses/:id/enroll` - Курска жазылуу

### Payments
- `GET /api/payments` - Бардык төлөмдөр (admin)
- `GET /api/payments/:id` - Төлөм маалыматы
- `POST /api/payments` - Төлөм кошуу
- `PUT /api/payments/:id/confirm` - Төлөмдү тастыктоо (admin)
- `PUT /api/payments/:id/reject` - Төлөмдү четке кагуу (admin)

### Bookings
- `GET /api/bookings` - Бардык брондоолор (admin)
- `POST /api/bookings` - Брондоо кошуу
- `PUT /api/bookings/:id` - Брондоону жаңылоо (admin)

---

## 📊 Indexes (Индекстер)

### Firestore Indexes
```javascript
// users коллекциясы
users: [
  { field: 'role', order: 'asc' },
  { field: 'status', order: 'asc' },
  { field: 'createdAt', order: 'desc' }
]

// courses коллекциясы
courses: [
  { field: 'category', order: 'asc' },
  { field: 'status', order: 'asc' },
  { field: 'startDate', order: 'desc' }
]

// payments коллекциясы
payments: [
  { field: 'status', order: 'asc' },
  { field: 'date', order: 'desc' },
  { field: 'userId', order: 'asc' }
]
```

---

## 🔒 Security Rules

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users коллекциясы
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId || 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Courses коллекциясы
    match /courses/{courseId} {
      allow read: if true; // Бардыгы окуй алат
      allow write: if request.auth != null && 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'teacher'];
    }
    
    // Payments коллекциясы
    match /payments/{paymentId} {
      allow read: if request.auth != null && 
                     (resource.data.userId == request.auth.uid || 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow create: if request.auth != null;
      allow update, delete: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

---

## 📈 Статистика (Admin Dashboard)

### Негизги метрикалар:
- Жалпы окуучулар саны
- Активдүү курстар саны
- Жалпы кирешелер
- Күтүүдөгү төлөмдөр

### Графиктер:
- Окуучулар боюнча айлар (6 ай)
- Кирешелер боюнча айлар (6 ай)
- Курстар боюнча окуучулар бөлүштүрүлүшү
- Төлөм статусу боюнча

---

## 🔄 Миграция жана Backup

### Backup стратегиясы:
- Күн сайын автоматтык backup (Firebase Extensions)
- Cloud Storage'га сактоо
- 30 күндүк тарых

### Миграция:
- Firebase Firestore Import/Export колдонуу
- JSON форматы

---

**Версия**: 1.0
**Акыркы жаңылоо**: 2024-01-20
