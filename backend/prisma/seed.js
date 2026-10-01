import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Начинаем заполнение базы данных...');

  // Создание курсов
  const courses = await Promise.all([
    prisma.course.create({
      data: {
        title: 'Frontend Development',
        slug: 'frontend-development',
        description: 'Полный курс по разработке современных веб-интерфейсов с использованием HTML, CSS, JavaScript и React',
        shortDesc: 'HTML, CSS, JavaScript, React',
        category: 'IT',
        level: 'Beginner',
        language: 'Русский',
        duration: '6 месяцев',
        totalHours: 144,
        price: 5000,
        currency: 'KGS',
        status: 'ACTIVE',
        isPublished: true,
        isFeatured: true
      }
    }),
    prisma.course.create({
      data: {
        title: 'Backend Development',
        slug: 'backend-development',
        description: 'Изучите серверную разработку с Node.js, Python и работу с базами данных',
        shortDesc: 'Node.js, Python, Databases',
        category: 'IT',
        level: 'Intermediate',
        language: 'Русский',
        duration: '6 месяцев',
        totalHours: 144,
        price: 5000,
        currency: 'KGS',
        status: 'ACTIVE',
        isPublished: true
      }
    }),
    prisma.course.create({
      data: {
        title: 'UX/UI Design',
        slug: 'uxui-design',
        description: 'Создавайте красивые и удобные интерфейсы с Figma и Adobe XD',
        shortDesc: 'Figma, Adobe XD, Design Thinking',
        category: 'Design',
        level: 'Beginner',
        language: 'Русский',
        duration: '4 месяца',
        totalHours: 96,
        price: 4000,
        currency: 'KGS',
        status: 'ACTIVE',
        isPublished: true
      }
    })
  ]);

  console.log(`✅ Создано ${courses.length} курсов`);

  // Создание тестового пользователя
  const user = await prisma.user.create({
    data: {
      email: 'test@okurmen.kg',
      username: 'teststudent',
      name: 'Тестовый Студент',
      phone: '+996555123456',
      role: 'STUDENT',
      emailVerified: true
    }
  });

  console.log(`✅ Создан пользователь: ${user.name}`);

  // Создание учителя
  const teacher = await prisma.user.create({
    data: {
      email: 'teacher@okurmen.kg',
      username: 'teacher1',
      name: 'Нурбек Касымов',
      phone: '+996700111222',
      role: 'TEACHER',
      emailVerified: true,
      bio: 'Опытный преподаватель по Frontend разработке'
    }
  });

  console.log(`✅ Создан учитель: ${teacher.name}`);

  // Связываем учителя с курсом
  await prisma.course.update({
    where: { id: courses[0].id },
    data: { teacherId: teacher.id }
  });

  console.log(`✅ Учитель привязан к курсу Frontend Development`);

  // Создание записи на курс
  const enrollment = await prisma.enrollment.create({
    data: {
      userId: user.id,
      courseId: courses[0].id,
      status: 'ACTIVE',
      progress: 25,
      startDate: new Date()
    }
  });

  console.log(`✅ Создана запись на курс: ${courses[0].title}`);

  // Создание модуля
  const module = await prisma.module.create({
    data: {
      courseId: courses[0].id,
      title: 'Введение в Frontend',
      description: 'Основы HTML и CSS',
      order: 1,
      duration: '2 недели'
    }
  });

  console.log(`✅ Создан модуль: ${module.title}`);

  // Создание урока
  const lesson = await prisma.lesson.create({
    data: {
      courseId: courses[0].id,
      moduleId: module.id,
      title: 'Основы HTML',
      content: 'В этом уроке вы изучите основные теги HTML',
      duration: 60,
      order: 1,
      isFree: true,
      isPublished: true
    }
  });

  console.log(`✅ Создан урок: ${lesson.title}`);

  // Создание достижений
  const achievements = await Promise.all([
    prisma.achievement.create({
      data: {
        name: 'Первые шаги',
        description: 'Зарегистрировались на платформе',
        icon: '🎯',
        points: 10
      }
    }),
    prisma.achievement.create({
      data: {
        name: 'Первый курс',
        description: 'Записались на первый курс',
        icon: '📚',
        points: 25
      }
    }),
    prisma.achievement.create({
      data: {
        name: 'Отличник',
        description: 'Завершили курс с отличием',
        icon: '⭐',
        points: 100
      }
    })
  ]);

  console.log(`✅ Создано ${achievements.length} достижений`);

  // Выдать достижение пользователю
  await prisma.userAchievement.create({
    data: {
      userId: user.id,
      achievementId: achievements[0].id
    }
  });

  console.log(`✅ Выдано достижение "${achievements[0].name}"`);

  // Создание отзыва
  await prisma.review.create({
    data: {
      courseId: courses[0].id,
      userId: user.id,
      rating: 5,
      comment: 'Отличный курс! Многому научился.',
      isApproved: true
    }
  });

  console.log(`✅ Создан отзыв`);

  console.log('\n🎉 База данных успешно заполнена тестовыми данными!');
  console.log('\n📊 Статистика:');
  console.log(`- Курсов: ${courses.length}`);
  console.log(`- Пользователей: 2 (1 студент + 1 учитель)`);
  console.log(`- Модулей: 1`);
  console.log(`- Уроков: 1`);
  console.log(`- Записей на курсы: 1`);
  console.log(`- Достижений: ${achievements.length}`);
  console.log(`- Отзывов: 1`);
}

main()
  .catch((e) => {
    console.error('❌ Ошибка:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
