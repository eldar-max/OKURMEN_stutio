# Unsplash API Integration - OKURMEN

## 📸 Обзор

Сайт OKURMEN теперь использует **Unsplash API** для загрузки профессиональных высококачественных изображений вместо placeholder'ов.

## ✨ Что было добавлено

### 1. Unsplash Service (`src/services/unsplashService.js`)
Централизованный сервис для работы с Unsplash API:
- ✅ Загрузка случайных изображений по категориям
- ✅ Получение коллекций изображений (портреты команды, классы)
- ✅ Кэширование изображений в localStorage (24 часа)
- ✅ Fallback на Unsplash Source если API ключ не настроен
- ✅ Предопределенные категории для разных секций сайта

### 2. Обновленные компоненты

#### Hero Section (`src/components/Hero.jsx`)
- Профессиональное фоновое изображение с категориями: `education, technology, students, learning`
- Динамическая загрузка при первом рендере
- Кэширование для быстрой загрузки при повторных посещениях

#### Team Section (`src/components/Team.jsx`)
- **21 профессиональное портретное фото** для всех членов команды
- Портреты загружаются с Unsplash по категориям: `professional, portrait, business`
- Fallback на иконки если изображения не загрузились
- Кэширование всех портретов единовременно

#### OurClassrooms Section (`src/components/OurClassrooms.jsx`)
- **4 профессиональных изображения** классов и офисов
- Категории: `modern, classroom, office, tech, coworking`
- Hover эффекты для интерактивности
- Градиентные оверлеи для читаемости текста

#### AboutUs Section (`src/components/AboutUs.jsx`)
- Изображение команды/успеха в секции "История"
- Категории: `team, collaboration, success, office`
- Интеграция со статистикой компании

## 🚀 Установка и настройка

### Шаг 1: Получить API ключ Unsplash (опционально)

Без API ключа сайт будет работать через **Unsplash Source** (упрощенный сервис).

Для полного функционала:

1. Зарегистрируйтесь на [Unsplash Developers](https://unsplash.com/developers)
2. Создайте новое приложение
3. Скопируйте **Access Key**

### Шаг 2: Настроить переменные окружения

1. Скопируйте `.env.example` в `.env`:
```bash
cp .env.example .env
```

2. Откройте `.env` и добавьте ваш ключ:
```env
VITE_UNSPLASH_ACCESS_KEY=your_actual_access_key_here
```

### Шаг 3: Установить зависимости и запустить

```bash
npm install
npm run dev
```

## 📊 Использование API

### Без API ключа (Unsplash Source)
- ✅ Работает из коробки
- ✅ Не требует регистрации
- ⚠️ Нет аналитики и статистики
- ⚠️ Ограниченный контроль над изображениями

Пример URL: `https://source.unsplash.com/1200x800/?education`

### С API ключом (Unsplash API)
- ✅ Полный доступ к API
- ✅ Аналитика загрузок
- ✅ Контроль над ориентацией и качеством
- ✅ Доступ к конкретным коллекциям
- ✅ 50 запросов в час (бесплатный тариф)

## 🎨 Категории изображений

```javascript
{
  hero: {
    education: 'education,learning,students,university',
    technology: 'technology,coding,programming,computer',
    success: 'success,achievement,graduation,celebration'
  },
  team: {
    portraits: 'professional,portrait,business,person',
    teacher: 'teacher,instructor,mentor,professional',
    developer: 'developer,programmer,tech,professional'
  },
  classroom: {
    modern: 'modern,classroom,office,workspace',
    technology: 'computer,lab,tech,office',
    coworking: 'coworking,workspace,office,modern'
  },
  students: {
    learning: 'students,learning,studying,education',
    coding: 'coding,programming,developer,laptop',
    group: 'team,collaboration,group,working'
  }
}
```

## 💾 Кэширование

Изображения кэшируются в `localStorage` на **24 часа**:

```javascript
// Сохранение в кэш
cacheImage('hero_main', imageUrl);

// Получение из кэша
const cached = getCachedImage('hero_main');
```

### Ключи кэша:
- `hero_main` - главное изображение Hero секции
- `team_portraits_all` - все портреты команды (JSON)
- `classroom_images` - изображения классов (JSON)
- `aboutus_story` - изображение в AboutUs секции

### Очистка кэша:
```javascript
localStorage.removeItem('unsplash_cache');
```

## 🛠️ API методы

### `getRandomImage(query, options)`
Получить одно случайное изображение:
```javascript
const image = await getRandomImage('education', {
  width: 1200,
  height: 800,
  orientation: 'landscape'
});
```

### `getImageCollection(query, count, options)`
Получить коллекцию изображений:
```javascript
const images = await getImageCollection('office', 5, {
  width: 800,
  height: 600
});
```

### `getTeamPortraits(count)`
Получить портреты для команды:
```javascript
const portraits = await getTeamPortraits(21);
```

### `getClassroomImages(count)`
Получить изображения классов:
```javascript
const classrooms = await getClassroomImages(4);
```

## 🔒 Безопасность

- ✅ API ключ хранится в `.env` (не коммитится в Git)
- ✅ `.env.example` предоставлен для справки
- ✅ Fallback на публичный Unsplash Source при отсутствии ключа
- ✅ Обработка ошибок и откаты

## 📈 Производительность

- **Lazy Loading**: изображения загружаются по мере прокрутки
- **Кэширование**: уменьшает количество запросов к API
- **Fallback изображения**: гарантируют работу сайта даже при сбоях API
- **Оптимизированные размеры**: запрашиваем именно нужные разрешения

## 🎯 Результаты

### До интеграции:
- ❌ Placeholder градиенты вместо изображений
- ❌ Непрофессиональный вид
- ❌ Отсутствие визуальной привлекательности

### После интеграции:
- ✅ Профессиональные фотографии высокого качества
- ✅ Реалистичные изображения команды (21 портрет)
- ✅ Привлекательные фото классов и офисов
- ✅ Улучшенная визуальная презентация
- ✅ Кэширование для быстрой загрузки

## 🐛 Troubleshooting

### Изображения не загружаются
1. Проверьте интернет соединение
2. Проверьте консоль браузера на ошибки
3. Убедитесь что API ключ правильный (если используется)
4. Очистите кэш: `localStorage.clear()`

### Rate Limit exceeded
- Бесплатный план: **50 запросов/час**
- Решение: используйте кэширование или обновите план на Unsplash

### CORS ошибки
- Unsplash API поддерживает CORS
- Убедитесь что домен зарегистрирован в настройках приложения Unsplash

## 📝 TODO (будущие улучшения)

- [ ] Добавить изображения для Founders секции
- [ ] Добавить изображения для VideoSection (thumbnails)
- [ ] Интеграция с Cloudinary для оптимизации
- [ ] Админ панель для управления изображениями
- [ ] Возможность загрузки собственных фото команды
- [ ] Поддержка WebP формата
- [ ] Прогрессивная загрузка (blur-up эффект)

## 📚 Ресурсы

- [Unsplash API Documentation](https://unsplash.com/documentation)
- [Unsplash Developers](https://unsplash.com/developers)
- [Unsplash Source](https://source.unsplash.com/)
- [Rate Limits & Guidelines](https://help.unsplash.com/en/articles/2511258-guideline-triggering-a-download)

## 🤝 Поддержка

При возникновении вопросов:
1. Проверьте документацию Unsplash
2. Посмотрите консоль браузера на ошибки
3. Проверьте сетевую вкладку DevTools

---

**Автор**: OKURMEN Development Team  
**Дата**: 2026  
**Версия**: 1.0.0
