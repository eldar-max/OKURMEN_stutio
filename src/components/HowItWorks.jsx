import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FaUserPlus, FaBookOpen, FaGraduationCap, FaCertificate, FaPencilAlt, FaCheckCircle, FaRocket } from 'react-icons/fa';

function HowItWorks() {
  const { language } = useLanguage();

  const steps = [
    {
      number: '01',
      icon: FaUserPlus,
      titleKg: 'Каттоо',
      titleRu: 'Регистрация',
      titleEn: 'Registration',
      descKg: 'Сайтта каттоодон өтүп, профилиңизди толтуруңуз',
      descRu: 'Зарегистрируйтесь на сайте и заполните профиль',
      descEn: 'Register on the website and fill out your profile'
    },
    {
      number: '02',
      icon: FaBookOpen,
      titleKg: 'Курс тандоо',
      titleRu: 'Выбор курса',
      titleEn: 'Choose Course',
      descKg: 'Өзүңүзгө ылайыктуу курсту тандап, жазылыңыз',
      descRu: 'Выберите подходящий курс и запишитесь',
      descEn: 'Choose the right course and enroll'
    },
    {
      number: '03',
      icon: FaGraduationCap,
      titleKg: 'Окуу',
      titleRu: 'Обучение',
      titleEn: 'Learning',
      descKg: 'Онлайн сабактар жана практикалык тапшырмалар',
      descRu: 'Онлайн уроки и практические задания',
      descEn: 'Online lessons and practical assignments'
    },
    {
      number: '04',
      icon: FaCertificate,
      titleKg: 'Сертификат',
      titleRu: 'Сертификат',
      titleEn: 'Certificate',
      descKg: 'Сертификат алып, жумушка орношуңуз',
      descRu: 'Получите сертификат и устройтесь на работу',
      descEn: 'Get certificate and find a job'
    }
  ];

  const getTitle = (step) => {
    if (language === 'ru') return step.titleRu;
    if (language === 'en') return step.titleEn;
    return step.titleKg;
  };

  const getDesc = (step) => {
    if (language === 'ru') return step.descRu;
    if (language === 'en') return step.descEn;
    return step.descKg;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <FaCheckCircle className="text-lg" />
              {language === 'kg' ? 'Процесс' : language === 'en' ? 'Process' : 'Процесс'}
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'kg' ? 'Кантип иштейт?' :
             language === 'en' ? 'How It Works?' :
             'Как это работает?'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {language === 'kg' ? '4 жөнөкөй кадам менен билим алып, карьера куруңуз' :
             language === 'en' ? 'Build your career in 4 simple steps' :
             'Постройте карьеру за 4 простых шага'}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-orange-300 via-orange-500 to-orange-300 transform -translate-y-1/2"></div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -10, scale: 1.05 }}
                    className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 relative z-10"
                  >
                    {/* Number Badge */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                        <span className="text-2xl font-bold text-white">{step.number}</span>
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="mt-8 mb-6 flex justify-center">
                      <motion.div
                        animate={{ 
                          rotateY: [0, 360],
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                          delay: index * 0.5
                        }}
                        className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-lg"
                      >
                        <Icon className="text-4xl text-white" />
                      </motion.div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                      {getTitle(step)}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                      {getDesc(step)}
                    </p>

                    {/* Decorative Elements */}
                    <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-orange-200 dark:bg-orange-900/30 rounded-full filter blur-2xl opacity-50"></div>
                  </motion.div>

                  {/* Arrow for mobile */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-6">
                      <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-orange-500 text-4xl"
                      >
                        ↓
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-12 py-5 rounded-full text-xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            <FaRocket className="text-2xl" />
            {language === 'kg' ? 'Башталуу' :
             language === 'en' ? 'Get Started' :
             'Начать обучение'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default HowItWorks;
