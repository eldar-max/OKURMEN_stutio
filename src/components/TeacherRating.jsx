import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { 
  FaChalkboardTeacher, 
  FaStar, 
  FaTasks, 
  FaChartLine, 
  FaMedal,
  FaUserGraduate,
  FaCheckCircle,
  FaTrophy
} from 'react-icons/fa';

function TeacherRating() {
  const { language } = useLanguage();

  const ratingSystem = [
    {
      icon: FaChalkboardTeacher,
      titleKg: 'Тренерлер баалайт',
      titleRu: 'Тренеры оценивают',
      titleEn: 'Trainers Evaluate',
      descKg: 'Ар бир студенттин жетишкендиктерин профессионалдуу баалоо',
      descRu: 'Профессиональная оценка достижений каждого студента',
      descEn: 'Professional evaluation of each student\'s achievements',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      darkBgColor: 'dark:bg-blue-900/20'
    },
    {
      icon: FaTasks,
      titleKg: 'Тапшырмаларды аткаруу',
      titleRu: 'Выполнение заданий',
      titleEn: 'Completing Tasks',
      descKg: 'Тапшырмаларды убагында жана сапаттуу аткарган студенттерге жогорку баалар',
      descRu: 'Высокие оценки студентам за своевременное и качественное выполнение заданий',
      descEn: 'High grades for timely and quality task completion',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      darkBgColor: 'dark:bg-green-900/20'
    },
    {
      icon: FaChartLine,
      titleKg: 'Прогрессти көзөмөлдөө',
      titleRu: 'Отслеживание прогресса',
      titleEn: 'Progress Tracking',
      descKg: 'Окуучунун өсүшүн жана өнүгүүсүн туруктуу баалоо',
      descRu: 'Постоянная оценка роста и развития студента',
      descEn: 'Continuous assessment of student growth and development',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      darkBgColor: 'dark:bg-purple-900/20'
    },
    {
      icon: FaMedal,
      titleKg: 'Жакшы окуган студенттер',
      titleRu: 'Успевающие студенты',
      titleEn: 'High-Performing Students',
      descKg: 'Мыкты окуган студенттерге бонустар жана жогорку баалар',
      descRu: 'Бонусы и высокие оценки для отлично успевающих студентов',
      descEn: 'Bonuses and high grades for excellent students',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      darkBgColor: 'dark:bg-orange-900/20'
    }
  ];

  const benefits = [
    {
      icon: FaTrophy,
      titleKg: 'Объективдүү баалоо',
      titleRu: 'Объективная оценка',
      titleEn: 'Objective Assessment',
      descKg: 'Ар бир студент адилеттүү баалоого ээ болот',
      descRu: 'Каждый студент получает справедливую оценку',
      descEn: 'Every student receives fair evaluation'
    },
    {
      icon: FaCheckCircle,
      titleKg: 'Мотивация',
      titleRu: 'Мотивация',
      titleEn: 'Motivation',
      descKg: 'Жогорку баалар студенттерди андан да жакшы окууга үндөйт',
      descRu: 'Высокие оценки мотивируют студентов учиться еще лучше',
      descEn: 'High grades motivate students to study even better'
    },
    {
      icon: FaUserGraduate,
      titleKg: 'Сапаттуу билим',
      titleRu: 'Качественное образование',
      titleEn: 'Quality Education',
      descKg: 'Туруктуу баалоо билимдин сапатын жогорулатат',
      descRu: 'Постоянная оценка повышает качество образования',
      descEn: 'Continuous assessment improves education quality'
    }
  ];

  const getTitle = (item) => {
    if (language === 'ru') return item.titleRu;
    if (language === 'en') return item.titleEn;
    return item.titleKg;
  };

  const getDesc = (item) => {
    if (language === 'ru') return item.descRu;
    if (language === 'en') return item.descEn;
    return item.descKg;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
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
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <FaStar className="text-lg" />
              {language === 'kg' ? 'Баалоо системасы' : 
               language === 'en' ? 'Rating System' : 
               'Система оценивания'}
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'kg' ? 'Тренерлер студенттерди баалайт' :
             language === 'en' ? 'Trainers Evaluate Students' :
             'Тренеры оценивают студентов'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {language === 'kg' ? 'Жакшы окуган жана тапшырмаларды аткарган студенттерге тренерлер жогорку баалар берет' :
             language === 'en' ? 'Trainers give high grades to students who study well and complete assignments' :
             'Тренеры ставят высокие оценки студентам, которые хорошо учатся и выполняют задания'}
          </p>
        </motion.div>

        {/* Rating System Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {ratingSystem.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`${item.bgColor} ${item.darkBgColor} rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} mb-6 shadow-lg`}>
                  <Icon className="text-3xl text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {getTitle(item)}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {getDesc(item)}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            {language === 'kg' ? 'Баалоонун артыкчылыктары' :
             language === 'en' ? 'Benefits of Assessment' :
             'Преимущества оценивания'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300"
                >
                  <Icon className="text-5xl text-white mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-white mb-3">
                    {getTitle(benefit)}
                  </h4>
                  <p className="text-white/90">
                    {getDesc(benefit)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TeacherRating;
