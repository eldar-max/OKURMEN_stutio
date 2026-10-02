import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FaTrophy, FaHandshake, FaMedal, FaAward, FaHandPaper } from 'react-icons/fa';

function Partners() {
  const { language } = useLanguage();

  // Компания логотиптери (текст менен)
  const partners = [
    'Google', 'Microsoft', 'Apple', 'Amazon', 
    'Meta', 'Netflix', 'Tesla', 'Adobe',
    'Intel', 'Samsung', 'Oracle', 'IBM'
  ];

  const achievements = [
    {
      icon: FaTrophy,
      titleKg: 'ТОП-10',
      titleRu: 'ТОП-10',
      titleEn: 'TOP-10',
      descKg: 'IT мектептеринде',
      descRu: 'В IT школах',
      descEn: 'Among IT schools'
    },
    {
      icon: FaMedal,
      titleKg: '100+ Награды',
      titleRu: '100+ Наград',
      titleEn: '100+ Awards',
      descKg: 'Эл аралык конкурстардан',
      descRu: 'От международных конкурсов',
      descEn: 'From international competitions'
    },
    {
      icon: FaAward,
      titleKg: '5 жылдык',
      titleRu: '5 летний',
      titleEn: '5 years',
      descKg: 'Тажрыйба',
      descRu: 'Опыт работы',
      descEn: 'Experience'
    },
    {
      icon: FaHandshake,
      titleKg: '50+ Өнөктөш',
      titleRu: '50+ Партнёров',
      titleEn: '50+ Partners',
      descKg: 'IT компаниялар',
      descRu: 'IT компаний',
      descEn: 'IT companies'
    }
  ];

  const getTitle = (achievement) => {
    if (language === 'ru') return achievement.titleRu;
    if (language === 'en') return achievement.titleEn;
    return achievement.titleKg;
  };

  const getDesc = (achievement) => {
    if (language === 'ru') return achievement.descRu;
    if (language === 'en') return achievement.descEn;
    return achievement.descKg;
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
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <FaHandPaper className="text-lg" />
              {language === 'kg' ? 'Биздин өнөктөштөр' : 
               language === 'en' ? 'Our Partners' : 
               'Наши партнёры'}
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'kg' ? 'Биздин жетишкендиктер' :
             language === 'en' ? 'Our Achievements' :
             'Наши достижения'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {language === 'kg' ? 'Биз менен таанышып, чоң компаниялар менен өнөктөш болуңуз' :
             language === 'en' ? 'Get to know us and become partners with big companies' :
             'Познакомьтесь с нами и станьте партнёрами с крупными компаниями'}
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <motion.div
                  animate={{ 
                    rotateY: [0, 360],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 mb-4 shadow-xl"
                >
                  <Icon className="text-4xl text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {getTitle(achievement)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {getDesc(achievement)}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Partners Section */}
        <div className="border-t border-orange-200 dark:border-gray-700 pt-16">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12 flex items-center justify-center gap-3"
          >
            <FaHandshake className="text-orange-500 text-4xl" />
            {language === 'kg' ? 'Биздин өнөктөштөр' :
             language === 'en' ? 'Our Partners' :
             'Наши партнёры'}
          </motion.h3>

          {/* Partners Carousel */}
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ x: [0, -2000] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
              className="flex gap-12"
            >
              {[...partners, ...partners].map((partner, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="flex-shrink-0 w-48 h-24 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow duration-300 border-2 border-orange-200 dark:border-gray-700"
                >
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                    {partner}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <p className="text-center text-gray-500 dark:text-gray-400 mt-8 text-sm">
            {language === 'kg' ? '* Биздин студенттер бул компанияларда иштешет' :
             language === 'en' ? '* Our students work at these companies' :
             '* Наши студенты работают в этих компаниях'}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Partners;
