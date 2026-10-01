# 📸 Инструкция по добавлению фотографий команды

## 🎯 Список фотографий для добавления

### 📁 Куда добавлять
Все фотографии команды нужно поместить в папку:
```
src/assets/team/
```

---

## 👥 Список фотографий

### Основатели (2 фото)
1. **sanzharbek.jpg** - Кубанычбек уулу Санжарбек
   - Роль: Со-основатель & CEO
   - Дата рождения: 24 апреля 1994

2. **ulukbek.jpg** - Улукбек Бакыбек уулу
   - Роль: Со-основатель & CTO

### Руководство (2 фото)
3. **aruna.jpg** - Тазабекова Аруна
   - Роль: Руководитель учебного отдела, завуч
   - Должность: Директор Окурмен Студии

4. **arslanbek.jpg** ✅ - Орозобек уулу Арсланбек
   - Роль: Коммерческий директор
   - Опыт: 5 месяцев

### Отдел продаж (3 фото)
5. **elona.jpg** ✅ - Азаматова Элона Азаматовна
   - Роль: Руководитель отдела продаж
   - Опыт: 1 год 1 месяц

6. **begimbek.jpg** ✅ - Сатыбалдиев Бегимбек Темирбекович
   - Роль: РОП (Руководитель отдела продаж)
   - Опыт: 1 год

7. **sezim.jpg** ✅ - Жамалбекова Сезим Замирбековна
   - Роль: Старший менеджер отдела продаж
   - Сектор: "Аура"
   - Опыт: 10 месяцев

### Менторы (3 фото)
8. **gulnaz.jpg** ✅ - Орозгелдиева Гулназ Эрмековна
   - Роль: Ментор
   - Дата начала: 01.06.2026

9. **mirbek.jpg** ✅ - Атанбеков Мирбек
   - Роль: FullStack Developer / Ментор

10. **dastan.jpg** ✅ - Кутманбеков Дастан
    - Роль: Ментор

### Кураторы (1 фото)
11. **yasmin.jpg** ✅ - Зулпукарова Ясмин Зулпукаровна
    - Роль: Куратор

---

## 📋 Инструкция по добавлению фотографий

### Шаг 1: Создать папку для фотографий
```bash
# Создать папку team в assets
mkdir src/assets/team
```

### Шаг 2: Скопировать фотографии
Переместите фотографии из Telegram в папку `src/assets/team/` с правильными именами:

```
src/assets/team/
├── sanzharbek.jpg
├── ulukbek.jpg
├── aruna.jpg
├── arslanbek.jpg
├── elona.jpg
├── begimbek.jpg
├── sezim.jpg
├── gulnaz.jpg
├── mirbek.jpg
├── dastan.jpg
└── yasmin.jpg
```

### Шаг 3: Оптимизировать фотографии
Рекомендуемые параметры:
- **Формат**: JPG или WebP
- **Размер**: 500x500px (квадрат)
- **Вес**: < 200 KB
- **Качество**: 80-85%

### Шаг 4: Использование в компонентах

#### В Team.jsx:
```javascript
import { teamData, getTeamByCategory } from '../data/teamData';

function Team() {
  const { t } = useLanguage();
  const teams = getTeamByCategory();
  
  return (
    <section>
      {/* Основатели */}
      <div>
        {teams.founders.map(member => (
          <div key={member.id}>
            <img 
              src={`/src/assets/team/${member.image}`}
              alt={member.name}
            />
            <h3>{t(member.role)}</h3>
            <p>{member.name}</p>
          </div>
        ))}
      </div>
      
      {/* Менторы */}
      <div>
        {teams.mentors.map(member => (
          <div key={member.id}>
            <img 
              src={`/src/assets/team/${member.image}`}
              alt={member.name}
            />
            <h3>{t(member.role)}</h3>
            <p>{member.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

## 🔧 Альтернативный способ (через import)

### Создать файл импортов:
```javascript
// src/assets/team/index.js
import sanzharbek from './sanzharbek.jpg';
import ulukbek from './ulukbek.jpg';
import aruna from './aruna.jpg';
import arslanbek from './arslanbek.jpg';
import elona from './elona.jpg';
import begimbek from './begimbek.jpg';
import sezim from './sezim.jpg';
import gulnaz from './gulnaz.jpg';
import mirbek from './mirbek.jpg';
import dastan from './dastan.jpg';
import yasmin from './yasmin.jpg';

export const teamPhotos = {
  sanzharbek,
  ulukbek,
  aruna,
  arslanbek,
  elona,
  begimbek,
  sezim,
  gulnaz,
  mirbek,
  dastan,
  yasmin,
};

export default teamPhotos;
```

### Использование:
```javascript
import { teamPhotos } from '../assets/team';
import { teamData } from '../data/teamData';

function Team() {
  return (
    <div>
      {teamData.map(member => (
        <div key={member.id}>
          <img 
            src={teamPhotos[member.image.replace('.jpg', '')]}
            alt={member.name}
          />
          <h3>{member.name}</h3>
          <p>{member.role}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 🎨 Рекомендации по дизайну

### Карточка члена команды:
```jsx
<motion.div 
  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
  whileHover={{ y: -5 }}
>
  {/* Фото */}
  <div className="aspect-square overflow-hidden">
    <img 
      src={photo}
      alt={name}
      className="w-full h-full object-cover"
    />
  </div>
  
  {/* Информация */}
  <div className="p-6">
    <h3 className="text-xl font-bold text-gray-800 mb-2">
      {name}
    </h3>
    <p className="text-orange-600 font-semibold mb-2">
      {role}
    </p>
    <p className="text-gray-600 text-sm">
      {experience}
    </p>
  </div>
</motion.div>
```

---

## 📊 Структура данных

Каждый член команды содержит:
```javascript
{
  id: number,              // Уникальный ID
  name: string,            // Имя на кыргызском
  nameRu: string,          // Имя на русском
  nameEn: string,          // Имя на английском
  role: string,            // Роль на кыргызском
  roleRu: string,          // Роль на русском
  roleEn: string,          // Роль на английском
  experience: string,      // Опыт работы
  category: string,        // Категория (founder, mentor, sales, etc.)
  image: string,           // Имя файла фотографии
  description: string,     // Описание на кыргызском
  descriptionRu: string,   // Описание на русском
  descriptionEn: string,   // Описание на английском
}
```

---

## 🔍 Проверка

После добавления фотографий проверьте:

1. ✅ Все 11 фотографий в папке `src/assets/team/`
2. ✅ Правильные имена файлов (без пробелов, кириллицы)
3. ✅ Размер каждой фотографии < 200 KB
4. ✅ Все фото квадратные (1:1)
5. ✅ Хорошее качество и освещение

---

## 🚀 После добавления фотографий

1. Закоммитить изменения:
```bash
git add src/assets/team/
git add src/data/teamData.js
git commit -m "Added team photos and data"
git push
```

2. Обновить компоненты Team.jsx и Founders.jsx для использования новых данных

3. Протестировать отображение на всех устройствах

---

## 📞 Контакты

Если нужна помощь:
- 📧 Email: info@okurmen.kg
- 💬 Telegram: @OKURKIDSBOT

---

**Создано**: 24 сентября 2026  
**Обновлено**: 24 сентября 2026
