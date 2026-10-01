# 🎨 База данных - Визуалдык диаграмма

## 📊 ER Диаграмма (Entity Relationship Diagram)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         OKURMEN DATABASE SCHEMA                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│      USERS       │         │     COURSES      │         │    PAYMENTS      │
├──────────────────┤         ├──────────────────┤         ├──────────────────┤
│ • id (PK)        │────┐    │ • id (PK)        │    ┌───│ • id (PK)        │
│ • email          │    │    │ • name           │    │   │ • userId (FK)    │
│ • displayName    │    │    │ • nameKg         │    │   │ • courseId (FK)  │
│ • photoURL       │    │    │ • nameRu         │    │   │ • amount         │
│ • role           │    │    │ • nameEn         │    │   │ • method         │
│ • phone          │    │    │ • description    │    │   │ • status         │
│ • status         │    │    │ • duration       │    │   │ • transactionId  │
│ • createdAt      │    │    │ • price          │    │   │ • receipt        │
│ • lastActive     │    │    │ • teacherId (FK) │────┘   │ • confirmedBy    │
└──────────────────┘    │    │ • category       │        │ • createdAt      │
         │              │    │ • level          │        └──────────────────┘
         │              │    │ • maxStudents    │                 │
         │              │    │ • startDate      │                 │
         │              │    │ • status         │                 │
         │              │    │ • createdAt      │                 │
         │              │    └──────────────────┘                 │
         │              │             │                            │
         │              │             │                            │
         │              └─────────────┼────────────────────────────┘
         │                            │
         │                            │
┌────────┴─────────┐         ┌───────┴──────────┐         ┌──────────────────┐
│   ENROLLMENTS    │         │     BOOKINGS     │         │   TESTIMONIALS   │
├──────────────────┤         ├──────────────────┤         ├──────────────────┤
│ • id (PK)        │         │ • id (PK)        │         │ • id (PK)        │
│ • userId (FK)    │         │ • userId (FK)    │         │ • userId (FK)    │
│ • courseId (FK)  │         │ • name           │         │ • courseId (FK)  │
│ • status         │         │ • phone          │         │ • rating         │
│ • enrolledAt     │         │ • courseId (FK)  │         │ • text           │
│ • completedAt    │         │ • paymentMethod  │         │ • textKg         │
│ • progress       │         │ • status         │         │ • textRu         │
└──────────────────┘         │ • processedBy    │         │ • textEn         │
                             │ • createdAt      │         │ • status         │
                             └──────────────────┘         │ • approvedBy     │
                                                          │ • createdAt      │
┌──────────────────┐         ┌──────────────────┐         └──────────────────┘
│   TEAM MEMBERS   │         │    GRADUATES     │
├──────────────────┤         ├──────────────────┤
│ • id (PK)        │         │ • id (PK)        │
│ • name           │         │ • name           │
│ • nameKg         │         │ • course         │
│ • nameRu         │         │ • year           │
│ • nameEn         │         │ • photo          │
│ • role           │         │ • currentJob     │
│ • roleKg         │         │ • company        │
│ • roleRu         │         │ • testimonial    │
│ • roleEn         │         │ • achievements   │
│ • category       │         │ • featured       │
│ • specialty      │         │ • active         │
│ • photo          │         │ • createdAt      │
│ • bio            │         └──────────────────┘
│ • email          │
│ • phone          │         ┌──────────────────┐
│ • social         │         │   AUDIT LOGS     │
│ • active         │         ├──────────────────┤
└──────────────────┘         │ • id (PK)        │
                             │ • userId (FK)    │
                             │ • action         │
                             │ • entity         │
                             │ • entityId       │
                             │ • changes        │
                             │ • createdAt      │
                             └──────────────────┘
```

## 🔗 Relationships (Байланыштар)

### 1. User → Enrollments (One-to-Many)
- Бир колдонуучу көптөгөн курстарга жазыла алат
- `User.id` → `Enrollment.userId`

### 2. User → Payments (One-to-Many)
- Бир колдонуучу көптөгөн төлөмдөрдү жасай алат
- `User.id` → `Payment.userId`

### 3. User → Bookings (One-to-Many)
- Бир колдонуучу көптөгөн брондоолорду жасай алат
- `User.id` → `Booking.userId`

### 4. User → Testimonials (One-to-Many)
- Бир колдонуучу көптөгөн пикирлерди калтыра алат
- `User.id` → `Testimonial.userId`

### 5. User → Courses (One-to-Many) [Teacher]
- Бир мугалим көптөгөн курстарды окута алат
- `User.id` → `Course.teacherId`

### 6. Course → Enrollments (One-to-Many)
- Бир курста көптөгөн окуучулар болушу мүмкүн
- `Course.id` → `Enrollment.courseId`

### 7. Course → Payments (One-to-Many)
- Бир курс үчүн көптөгөн төлөмдөр болушу мүмкүн
- `Course.id` → `Payment.courseId`

### 8. Course → Bookings (One-to-Many)
- Бир курска көптөгөн брондоолор болушу мүмкүн
- `Course.id` → `Booking.courseId`

### 9. Course → Testimonials (One-to-Many)
- Бир курс жөнүндө көптөгөн пикирлер болушу мүмкүн
- `Course.id` → `Testimonial.courseId`

---

## 🎯 Data Flow (Маалымат агымы)

```
                    ┌──────────────────┐
                    │   NEW USER       │
                    │  Registration    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   User Created   │
                    │   in Firebase    │
                    └────────┬─────────┘
                             │
                ┌────────────┼────────────┐
                │            │            │
                ▼            ▼            ▼
        ┌───────────┐ ┌───────────┐ ┌───────────┐
        │  Browse   │ │  Enroll   │ │  Make     │
        │  Courses  │ │  Course   │ │  Booking  │
        └───────────┘ └─────┬─────┘ └─────┬─────┘
                            │             │
                            ▼             ▼
                    ┌───────────────────────┐
                    │   Create Payment      │
                    │   (Pending Status)    │
                    └──────────┬────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Admin Reviews        │
                    │  Payment              │
                    └──────────┬────────────┘
                               │
                    ┌──────────┼───────────┐
                    │                      │
                    ▼                      ▼
            ┌──────────────┐      ┌──────────────┐
            │   Approve    │      │   Reject     │
            │   Payment    │      │   Payment    │
            └──────┬───────┘      └──────────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │  Enrollment Created   │
        │  User → Student       │
        └──────────────────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │  Complete Course      │
        └──────────────────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │  Leave Testimonial    │
        │  Become Graduate      │
        └──────────────────────┘
```

---

## 📊 Index Strategy (Индекс стратегиясы)

### Users
```javascript
users:
  - email (unique)
  - role (for filtering)
  - status (for active user queries)
  - createdAt (for sorting)
```

### Courses
```javascript
courses:
  - category (for filtering)
  - status (for active courses)
  - teacherId (for teacher's courses)
  - startDate (for sorting)
```

### Payments
```javascript
payments:
  - userId (for user's payments)
  - courseId (for course payments)
  - status (for pending payments)
  - createdAt (for sorting)
  - transactionId (unique)
```

### Enrollments
```javascript
enrollments:
  - [userId, courseId] (composite unique)
  - userId (for user's enrollments)
  - courseId (for course students)
  - status (for active enrollments)
```

---

## 🔐 Security & Access Control

```
┌──────────────────────────────────────────────────────────┐
│                    ROLE-BASED ACCESS                      │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  STUDENT                                                  │
│  ├─ View courses (read)                                  │
│  ├─ Enroll in courses (create enrollment)               │
│  ├─ Make payments (create payment)                       │
│  ├─ View own profile (read own user)                    │
│  └─ Leave testimonials (create testimonial)             │
│                                                           │
│  TEACHER                                                  │
│  ├─ All Student permissions                              │
│  ├─ View course students (read enrollments)             │
│  ├─ Update own courses (update course)                  │
│  └─ View student progress (read enrollments)            │
│                                                           │
│  ADMIN                                                    │
│  ├─ All permissions                                      │
│  ├─ Manage users (CRUD)                                 │
│  ├─ Manage courses (CRUD)                               │
│  ├─ Approve/reject payments (update payment)            │
│  ├─ Manage team members (CRUD)                          │
│  ├─ View analytics (read all)                           │
│  └─ Approve testimonials (update testimonial)           │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

---

## 📈 Scalability Considerations

### Current: Firebase (NoSQL)
- ✅ Real-time updates
- ✅ Easy setup
- ✅ Good for <100K users
- ❌ Complex queries limited
- ❌ No joins

### Future: PostgreSQL + Prisma (SQL)
- ✅ Complex queries
- ✅ Joins & relations
- ✅ Better for >100K users
- ✅ Full ACID compliance
- ❌ Need to manage server
- ❌ More setup complexity

---

## 🔄 Migration Path (Firebase → PostgreSQL)

```
1. Setup PostgreSQL database
   └─ Use Prisma schema (prisma-schema.prisma)

2. Export Firebase data
   └─ Use Firebase Admin SDK

3. Transform data
   └─ Map Firebase structure to SQL tables

4. Import to PostgreSQL
   └─ Use Prisma migrations

5. Update backend
   └─ Switch from Firebase SDK to Prisma Client

6. Test thoroughly
   └─ Verify all features work

7. Deploy
   └─ Zero-downtime migration
```

---

**Версия**: 1.0  
**Акыркы жаңылоо**: 2024-01-20  
**Статус**: Firebase (Current), Prisma (Future)
