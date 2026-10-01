import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const translations = {
  ru: {
    // Navbar
    home: 'Главная',
    about: 'О нас',
    courses: 'Курсы',
    contacts: 'Контакты',
    login: 'Войти',
    register: 'Регистрация',
    
    // Hero
    heroTitle: 'Образовательная платформа',
    heroSubtitle: 'IT образование нового поколения',
    heroDescription: 'Обучаем программированию, дизайну и современным технологиям',
    getStarted: 'Начать обучение',
    learnMore: 'Подробнее',
    
    // About Us
    aboutTitle: 'О нас',
    aboutDescription: 'OKURMEN - это современная образовательная платформа, где каждый может освоить IT профессию с нуля',
    ourMission: 'Наша миссия',
    missionText: 'Сделать качественное IT образование доступным для всех',
    
    // Why Us
    whyTitle: 'Почему выбирают нас',
    whyExperience: 'Опытные преподаватели',
    whyExperienceText: 'Практикующие специалисты из крупных IT компаний',
    whyPractice: 'Практический подход',
    whyPracticeText: 'Реальные проекты в портфолио с первых занятий',
    whySupport: 'Поддержка 24/7',
    whySupportText: 'Помощь преподавателей и кураторов в любое время',
    whyJob: 'Помощь с трудоустройством',
    whyJobText: 'Карьерные консультации и стажировки в IT компаниях',
    
    // Courses
    coursesTitle: 'Наши курсы',
    coursesSubtitle: 'Выберите направление для обучения',
    frontend: 'Frontend разработка',
    frontendDesc: 'HTML, CSS, JavaScript, React',
    backend: 'Backend разработка',
    backendDesc: 'Node.js, Express, PostgreSQL',
    design: 'UX/UI дизайн',
    designDesc: 'Figma, Adobe XD, прототипирование',
    duration: 'Длительность',
    months: 'месяцев',
    month: 'мес',
    price: 'Стоимость',
    perMonth: 'сом/месяц',
    enrollNow: 'Записаться',
    bookLesson: 'Забронировать урок',
    
    // Team
    teamTitle: 'Наша команда',
    teamSubtitle: 'Преподаватели-практики',
    teacher: 'Преподаватель',
    
    // Founders
    foundersTitle: 'Основатели',
    foundersSubtitle: 'Команда создателей OKURMEN',
    
    // Graduates
    graduatesTitle: 'Наши выпускники',
    graduatesSubtitle: 'Истории успеха наших студентов',
    
    // Testimonials
    testimonialsTitle: 'Отзывы',
    testimonialsSubtitle: 'Что говорят наши студенты',
    
    // Footer
    footerAbout: 'О платформе',
    footerAboutText: 'OKURMEN - современная образовательная платформа для изучения IT технологий',
    quickLinks: 'Быстрые ссылки',
    followUs: 'Мы в соцсетях',
    allRightsReserved: 'Все права защищены',
    
    // Booking Modal
    bookingTitle: 'Бронирование урока',
    yourName: 'Ваше имя',
    yourEmail: 'Email',
    yourPhone: 'Телефон',
    selectCourse: 'Выберите курс',
    cancel: 'Отмена',
    continue: 'Продолжить',
    
    // Common
    students: 'Студентов',
    teachers: 'Преподавателей',
    years: 'Лет опыта',
    projects: 'Проектов',
  },
  
  en: {
    // Navbar
    home: 'Home',
    about: 'About',
    courses: 'Courses',
    contacts: 'Contacts',
    login: 'Login',
    register: 'Register',
    
    // Hero
    heroTitle: 'Educational Platform',
    heroSubtitle: 'New Generation IT Education',
    heroDescription: 'We teach programming, design and modern technologies',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    
    // About Us
    aboutTitle: 'About Us',
    aboutDescription: 'OKURMEN is a modern educational platform where everyone can master IT profession from scratch',
    ourMission: 'Our Mission',
    missionText: 'Make quality IT education accessible to everyone',
    
    // Why Us
    whyTitle: 'Why Choose Us',
    whyExperience: 'Experienced Teachers',
    whyExperienceText: 'Practicing specialists from major IT companies',
    whyPractice: 'Practical Approach',
    whyPracticeText: 'Real projects in portfolio from first lessons',
    whySupport: '24/7 Support',
    whySupportText: 'Teacher and curator help at any time',
    whyJob: 'Job Assistance',
    whyJobText: 'Career consultations and internships in IT companies',
    
    // Courses
    coursesTitle: 'Our Courses',
    coursesSubtitle: 'Choose your learning path',
    frontend: 'Frontend Development',
    frontendDesc: 'HTML, CSS, JavaScript, React',
    backend: 'Backend Development',
    backendDesc: 'Node.js, Express, PostgreSQL',
    design: 'UX/UI Design',
    designDesc: 'Figma, Adobe XD, prototyping',
    duration: 'Duration',
    months: 'months',
    month: 'mo',
    price: 'Price',
    perMonth: 'som/month',
    enrollNow: 'Enroll Now',
    bookLesson: 'Book a Lesson',
    
    // Team
    teamTitle: 'Our Team',
    teamSubtitle: 'Practicing Teachers',
    teacher: 'Teacher',
    
    // Founders
    foundersTitle: 'Founders',
    foundersSubtitle: 'OKURMEN Creators Team',
    
    // Graduates
    graduatesTitle: 'Our Graduates',
    graduatesSubtitle: 'Success stories of our students',
    
    // Testimonials
    testimonialsTitle: 'Testimonials',
    testimonialsSubtitle: 'What our students say',
    
    // Footer
    footerAbout: 'About Platform',
    footerAboutText: 'OKURMEN - modern educational platform for IT technologies',
    quickLinks: 'Quick Links',
    followUs: 'Follow Us',
    allRightsReserved: 'All Rights Reserved',
    
    // Booking Modal
    bookingTitle: 'Book a Lesson',
    yourName: 'Your Name',
    yourEmail: 'Email',
    yourPhone: 'Phone',
    selectCourse: 'Select Course',
    cancel: 'Cancel',
    continue: 'Continue',
    
    // Common
    students: 'Students',
    teachers: 'Teachers',
    years: 'Years Experience',
    projects: 'Projects',
  },
  
  kg: {
    // Navbar
    home: 'Башкы бет',
    about: 'Биз жөнүндө',
    courses: 'Курстар',
    contacts: 'Байланыш',
    login: 'Кирүү',
    register: 'Катталуу',
    
    // Hero
    heroTitle: 'Билим берүү платформасы',
    heroSubtitle: 'Жаңы муундун IT билими',
    heroDescription: 'Программалоону, дизайнды жана заманбап технологияларды үйрөтөбүз',
    getStarted: 'Окууну баштоо',
    learnMore: 'Кененирээк',
    
    // About Us
    aboutTitle: 'Биз жөнүндө',
    aboutDescription: 'OKURMEN - бул ар бир адам нөлдөн IT кесипти үйрөнө турган заманбап билим берүү платформасы',
    ourMission: 'Биздин максат',
    missionText: 'Сапаттуу IT билимди бардыгына жеткиликтүү кылуу',
    
    // Why Us
    whyTitle: 'Эмне үчүн бизди тандашат',
    whyExperience: 'Тажрыйбалуу мугалимдер',
    whyExperienceText: 'Чоң IT компаниялардын практикалык адистери',
    whyPractice: 'Практикалык мамиле',
    whyPracticeText: 'Биринчи сабактардан баштап чыныгы долбоорлор',
    whySupport: '24/7 Колдоо',
    whySupportText: 'Мугалимдердин жана кураторлордун каалаган убакта жардамы',
    whyJob: 'Жумушка жайгаштырууга жардам',
    whyJobText: 'Карьера боюнча консультациялар жана IT компанияларда практика',
    
    // Courses
    coursesTitle: 'Биздин курстар',
    coursesSubtitle: 'Окуу багытын тандаңыз',
    frontend: 'Frontend иштеп чыгуу',
    frontendDesc: 'HTML, CSS, JavaScript, React',
    backend: 'Backend иштеп чыгуу',
    backendDesc: 'Node.js, Express, PostgreSQL',
    design: 'UX/UI дизайн',
    designDesc: 'Figma, Adobe XD, прототиптештирүү',
    duration: 'Узактыгы',
    months: 'ай',
    month: 'ай',
    price: 'Баасы',
    perMonth: 'сом/ай',
    enrollNow: 'Катталуу',
    bookLesson: 'Сабак брондоо',
    
    // Team
    teamTitle: 'Биздин команда',
    teamSubtitle: 'Практикалык мугалимдер',
    teacher: 'Мугалим',
    
    // Founders
    foundersTitle: 'Негиздөөчүлөр',
    foundersSubtitle: 'OKURMEN түзүүчүлөрүнүн командасы',
    
    // Graduates
    graduatesTitle: 'Биздин бүтүрүүчүлөр',
    graduatesSubtitle: 'Студенттерибиздин ийгилик окуялары',
    
    // Testimonials
    testimonialsTitle: 'Пикирлер',
    testimonialsSubtitle: 'Студенттерибиз эмне дейт',
    
    // Footer
    footerAbout: 'Платформа жөнүндө',
    footerAboutText: 'OKURMEN - IT технологияларын үйрөнүү үчүн заманбап билим берүү платформасы',
    quickLinks: 'Тез шилтемелер',
    followUs: 'Биз соцтармактарда',
    allRightsReserved: 'Бардык укуктар корголгон',
    
    // Booking Modal
    bookingTitle: 'Сабак брондоо',
    yourName: 'Атыңыз',
    yourEmail: 'Email',
    yourPhone: 'Телефон',
    selectCourse: 'Курс тандаңыз',
    cancel: 'Жокко чыгаруу',
    continue: 'Улантуу',
    
    // Common
    students: 'Студенттер',
    teachers: 'Мугалимдер',
    years: 'Жылдык тажрыйба',
    projects: 'Долбоорлор',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'ru';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  const changeLanguage = (lang) => {
    if (['ru', 'en', 'kg'].includes(lang)) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
