# 📋 TODO: Оставшиеся переводы

## 🎯 Цель
Перевести оставшиеся компоненты на 3 языка (RU, EN, KG)

---

## ✅ Уже переведено (9/24 компонентов)

1. ✅ Hero.jsx
2. ✅ Navbar.jsx
3. ✅ Courses.jsx
4. ✅ WhyUs.jsx
5. ✅ Login.jsx (страница)
6. ✅ Registration.jsx (страница)
7. ✅ Footer.jsx
8. ✅ AboutUs.jsx
9. ✅ BookingModal.jsx

---

## ⏳ Требуют перевода (15 компонентов + 6 страниц)

### 🔴 Высокий приоритет (видны на главной странице)

#### 1. **Team.jsx** - Команда преподавателей
**Тексты для перевода:**
- "Наша команда"
- "Преподаватели-практики"
- Имена и должности преподавателей
- "Преподаватель"

**Ключи:**
```javascript
teamTitle: 'Биздин команда',
teamSubtitle: 'Практикалык мугалимдер',
teacher: 'Мугалим',
```

#### 2. **Founders.jsx** - Основатели
**Тексты для перевода:**
- "Основатели"
- "Команда создателей OKURMEN"
- "Со-основатель и CEO"
- "Со-основатель и CTO"

**Ключи:**
```javascript
foundersTitle: 'Негиздөөчүлөр',
foundersSubtitle: 'OKURMEN түзүүчүлөрүнүн командасы',
coFounderCEO: 'Кошо-негиздөөчү жана CEO',
coFounderCTO: 'Кошо-негиздөөчү жана CTO',
```

#### 3. **Graduates.jsx** - Выпускники
**Тексты для перевода:**
- "Наши выпускники"
- "Истории успеха наших студентов"
- "Frontend Developer"
- "Backend Developer"
- Компании, где работают выпускники

**Ключи:**
```javascript
graduatesTitle: 'Биздин бүтүрүүчүлөр',
graduatesSubtitle: 'Студенттерибиздин ийгилик окуялары',
frontendDeveloper: 'Frontend иштеп чыгуучу',
backendDeveloper: 'Backend иштеп чыгуучу',
```

#### 4. **Testimonials.jsx** - Отзывы
**Тексты для перевода:**
- "Отзывы"
- "Что говорят наши студенты"
- Тексты отзывов
- "Студент"
- "Родитель"

**Ключи:**
```javascript
testimonialsTitle: 'Пикирлер',
testimonialsSubtitle: 'Студенттерибиз эмне дейт',
studentsTab: 'Студенттер',
parentsTab: 'Ата-энелер',
```

#### 5. **OurClassrooms.jsx** - Наши аудитории
**Тексты для перевода:**
- "Наши аудитории"
- "Современные и комфортные пространства"
- "Современные компьютеры"
- "Высокоскоростной интернет"
- "Главный зал"

**Ключи:**
```javascript
ourClassrooms: 'Биздин аудиториялар',
modernComfortableSpaces: 'Заманбап жана ыңгайлуу жайлар',
modernComputers: 'Заманбап компьютерлер',
highSpeedInternet: 'Жогорку ылдамдыктагы интернет',
```

#### 6. **Students.jsx** - Текущие студенты
**Тексты для перевода:**
- "Наши студенты"
- Информация о студентах
- "Студентов"

**Ключи:**
```javascript
ourStudents: 'Биздин студенттер',
activeStudents: 'Активдүү студенттер',
```

---

### 🟡 Средний приоритет (внутренние страницы)

#### 7. **StudentDashboard.jsx** - Личный кабинет студента
**Тексты для перевода:**
- "Личный кабинет студента"
- "Мои курсы"
- "Прогресс обучения"
- "Расписание"
- "Домашние задания"
- "Сертификаты"

**Ключи:**
```javascript
studentDashboard: 'Студенттин жеке кабинети',
myCourses: 'Менин курстарым',
learningProgress: 'Окуу прогресси',
schedule: 'Расписание',
homework: 'Үй тапшырмалары',
certificates: 'Сертификаттар',
```

#### 8. **TeacherDashboard.jsx** - Личный кабинет преподавателя
**Тексты для перевода:**
- "Личный кабинет преподавателя"
- "Мои студенты"
- "Мои курсы"
- "Оценки"
- "Аналитика"

**Ключи:**
```javascript
teacherDashboard: 'Мугалимдин жеке кабинети',
myStudents: 'Менин студенттерим',
grades: 'Баалар',
analytics: 'Аналитика',
```

#### 9. **AdminDashboard.jsx** - Панель администратора
**Тексты для перевода:**
- "Панель администратора"
- "Пользователи"
- "Статистика"
- "Финансы"
- "Настройки"

**Ключи:**
```javascript
adminDashboard: 'Администратор панели',
users: 'Колдонуучулар',
statistics: 'Статистика',
finance: 'Финансылар',
settings: 'Жөндөөлөр',
```

#### 10. **AdminVerification.jsx** - Верификация админа
**Тексты для перевода:**
- "Верификация администратора"
- "Введите код из Telegram"
- "Проверить код"

**Ключи:**
```javascript
adminVerification: 'Администраторду текшерүү',
enterCodeFromTelegram: 'Telegram дан кодду киргизиңиз',
verifyCode: 'Кодду текшерүү',
```

---

### 🟢 Низкий приоритет (модальные окна и утилиты)

#### 11. **PaymentModal.jsx** - Модальное окно оплаты
**Тексты для перевода:**
- "Оплата курса"
- "Сумма к оплате"
- "Способ оплаты"
- "Оплатить"

**Ключи:**
```javascript
paymentTitle: 'Курс үчүн төлөө',
amountToPay: 'Төлөө суммасы',
paymentMethod: 'Төлөө ыкмасы',
pay: 'Төлөө',
```

#### 12. **AIChat.jsx** - AI чат-бот
**Тексты для перевода:**
- "Задать вопрос"
- "Напишите ваш вопрос"
- "Отправить"

**Ключи:**
```javascript
askQuestion: 'Суроо берүү',
writeYourQuestion: 'Суроонузду жазыңыз',
send: 'Жөнөтүү',
```

#### 13. **NotFound.jsx** - Страница 404
**Тексты для перевода:**
- "Страница не найдена"
- "Вернуться на главную"

**Ключи:**
```javascript
pageNotFound: 'Бет табылган жок',
backToHome: 'Башкы бетке кайтуу',
```

---

## 🛠️ Как добавить перевод

### Шаг 1: Добавить ключи в LanguageContext.jsx

```javascript
// src/context/LanguageContext.jsx

// Кыргызский
kg: {
  teamTitle: 'Биздин команда',
  teamSubtitle: 'Практикалык мугалимдер',
  teacher: 'Мугалим',
}

// Русский
ru: {
  teamTitle: 'Наша команда',
  teamSubtitle: 'Преподаватели-практики',
  teacher: 'Преподаватель',
}

// Английский
en: {
  teamTitle: 'Our Team',
  teamSubtitle: 'Practical Teachers',
  teacher: 'Teacher',
}
```

### Шаг 2: Импортировать useLanguage в компонент

```javascript
import { useLanguage } from '../context/LanguageContext';

function Team() {
  const { t } = useLanguage();
  
  // ...
}
```

### Шаг 3: Заменить hardcoded текст на t()

```javascript
// ❌ До
<h2>Наша команда</h2>

// ✅ После
<h2>{t('teamTitle')}</h2>
```

### Шаг 4: Закоммитить и запушить

```bash
git add .
git commit -m "Added translation to Team component"
git push
```

---

## 📝 Шаблон для перевода компонента

```javascript
// 1. Импортировать хук
import { useLanguage } from '../context/LanguageContext';

function MyComponent() {
  // 2. Использовать хук
  const { t } = useLanguage();
  
  return (
    <div>
      {/* 3. Применить t() к текстам */}
      <h1>{t('myTitle')}</h1>
      <p>{t('myDescription')}</p>
      <button>{t('myButton')}</button>
    </div>
  );
}

export default MyComponent;
```

---

## 🎯 Приоритет работы

### Неделя 1 (Высокий приоритет):
1. Team.jsx
2. Founders.jsx
3. Graduates.jsx
4. Testimonials.jsx
5. OurClassrooms.jsx
6. Students.jsx

### Неделя 2 (Средний приоритет):
7. StudentDashboard.jsx
8. TeacherDashboard.jsx
9. AdminDashboard.jsx
10. AdminVerification.jsx

### Неделя 3 (Низкий приоритет):
11. PaymentModal.jsx
12. AIChat.jsx
13. NotFound.jsx

---

## ✅ Чек-лист для каждого компонента

- [ ] Найти все hardcoded тексты
- [ ] Добавить ключи в LanguageContext (kg, ru, en)
- [ ] Импортировать useLanguage
- [ ] Заменить тексты на t()
- [ ] Протестировать все 3 языка
- [ ] Закоммитить изменения
- [ ] Запушить на GitHub
- [ ] Проверить на Vercel

---

## 📊 Прогресс

```
Переведено: 9/24 (37.5%)
███████░░░░░░░░░░░░░░░ 37.5%

Осталось: 15 компонентов
Примерное время: ~8-10 часов
```

---

## 💡 Советы

1. **Используйте существующие ключи**: Многие тексты уже переведены (например, "cancel", "continue", "email")

2. **Сохраняйте консистентность**: Используйте одинаковые термины во всех компонентах

3. **Проверяйте длину текста**: Кыргызский текст может быть длиннее русского

4. **Тестируйте на мобильных**: Убедитесь, что переведенный текст помещается на маленьких экранах

5. **Коммитьте часто**: После каждого компонента делайте отдельный коммит

---

## 🚀 Быстрый старт

```bash
# 1. Открыть компонент
code src/components/Team.jsx

# 2. Добавить переводы
code src/context/LanguageContext.jsx

# 3. Тестировать
npm run dev

# 4. Закоммитить
git add .
git commit -m "Added translation to Team component"
git push
```

---

**Удачи с переводами! 🎉**

Если нужна помощь - пишите в Telegram: @OKURKIDSBOT
