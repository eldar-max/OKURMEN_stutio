import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { 
  FaLightbulb, 
  FaHandPointer, 
  FaCode, 
  FaMobileAlt,
  FaRocket,
  FaUsers,
  FaCertificate,
  FaChalkboardTeacher
} from 'react-icons/fa';

function Features() {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: FaLightbulb,
      titleKg: '10,000+ Окуу материалдары',
      titleRu: '10,000+ Учебных материалов',
      titleEn: '10,000+ Learning Materials',
      descKg: 'Чоң көлөмдөгү дизайнер жасаган материалдардан тандаңыз',
      descRu: 'Выберите из огромного количества материалов от дизайнеров',
      descEn: 'Select from a huge variety of designer-made materials',
      color: 'blue',
      bgGradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: FaHandPointer,
      titleKg: 'Оңой жана ыңгайлуу',
      titleRu: 'Легко и удобно',
      titleEn: 'Easy Drag-n-Drop',
      descKg: 'Сайтыңызды жөнөкөй тартып коюу менен өзгөртүңүз',
      descRu: 'Настройте все на своем сайте простым перетаскиванием',
      descEn: 'Customize anything on your website with simple dragging',
      color: 'red',
      bgGradient: 'from-red-500 to-red-600'
    },
    {
      icon: FaCode,
      titleKg: 'Кодсуз үйрөнүү',
      titleRu: 'Без кодинга',
      titleEn: 'No Coding',
      descKg: 'Визуалдык түрдө кошуңуз, өзгөртүңүз, кодсуз!',
      descRu: 'Визуально добавляйте, редактируйте без кодинга!',
      descEn: 'Visually add, edit, move, and modify with no coding!',
      color: 'green',
      bgGradient: 'from-green-500 to-green-600'
    },
    {
      icon: FaMobileAlt,
      titleKg: 'Мобилдик версия',
      titleRu: 'Мобильная версия',
      titleEn: 'Mobile-Friendly',
      descKg: 'Бардык заманбап түзмөктөрдө мыкты көрүнөт',
      descRu: 'Отлично выглядит на всех современных устройствах',
      descEn: 'Build websites that look great on all modern devices',
      color: 'orange',
      bgGradient: 'from-orange-500 to-orange-600'
    },
    {
      icon: FaRocket,
      titleKg: 'Ылдам жетишүү',
      titleRu: 'Быстрый результат',
      titleEn: 'Fast Results',
      descKg: '3 айда биринчи проектиңизди жасаңыз',
      descRu: 'Создайте свой первый проект за 3 месяца',
      descEn: 'Create your first project in 3 months',
      color: 'purple',
      bgGradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: FaUsers,
      titleKg: 'Командалык иш',
      titleRu: 'Командная работа',
      titleEn: 'Team Work',
      descKg: 'Чыныгы долбоорлордо командада иштөө',
      descRu: 'Работа в команде над реальными проектами',
      descEn: 'Work in teams on real projects',
      color: 'indigo',
      bgGradient: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: FaCertificate,
      titleKg: 'Сертификат алуу',
      titleRu: 'Получение сертификата',
      titleEn: 'Get Certificate',
      descKg: 'Бүтүргөндөн кийин расмий сертификат',
      descRu: 'Официальный сертификат после окончания',
      descEn: 'Official certificate upon completion',
      color: 'yellow',
      bgGradient: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: FaChalkboardTeacher,
      titleKg: '1:1 Ментордук колдоо',
      titleRu: '1:1 Менторская поддержка',
      titleEn: '1:1 Mentor Support',
      descKg: 'Жеке ментордон туруктуу жардам',
      descRu: 'Постоянная помощь от личного ментора',
      descEn: 'Constant help from personal mentor',
      color: 'pink',
      bgGradient: 'from-pink-500 to-pink-600'
    }
  ];

  const getTitle = (feature) => {
    if (language === 'ru') return feature.titleRu;
    if (language === 'en') return feature.titleEn;
    return feature.titleKg;
  };

  const getDesc = (feature) => {
    if (language === 'ru') return feature.descRu;
    if (language === 'en') return feature.descEn;
    return feature.descKg;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {language === 'kg' ? 'Бардык керек нерселер жана андан көп' : 
             language === 'en' ? 'All You Need And More' : 
             'Все что нужно и больше'}
          </motion.h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {language === 'kg' ? 'Биздин платформа сизге керек болгон бардык мүмкүнчүлүктөрдү камтыйт' :
             language === 'en' ? 'Our platform includes all the features you need' :
             'Наша платформа включает все необходимые возможности'}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group cursor-pointer"
              >
                {/* Icon Card - Top colored section */}
                <div className={`bg-gradient-to-br ${feature.bgGradient} rounded-t-2xl p-8 flex items-center justify-center h-32 relative overflow-hidden`}>
                  {/* Icon container */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10"
                  >
                    <Icon className="text-6xl text-white drop-shadow-lg" />
                  </motion.div>
                  
                  {/* Decorative circles */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
                </div>

                {/* Content Card - White section */}
                <div className="bg-white dark:bg-gray-800 rounded-b-2xl p-6 shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 text-center">
                    {getTitle(feature)}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                    {getDesc(feature)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {language === 'kg' ? 'БАРДЫК МҮМКҮНЧҮЛҮКТӨРДҮ КӨРҮҮ' :
             language === 'en' ? 'SEE ALL FEATURES' :
             'СМОТРЕТЬ ВСЕ ВОЗМОЖНОСТИ'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default Features;
