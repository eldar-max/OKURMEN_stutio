import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaGraduationCap, FaChalkboardTeacher, FaLaptop, FaCertificate, 
  FaHandshake, FaRocket, FaUsers, FaAward, FaHeadset, FaClock 
} from 'react-icons/fa';
import AnimatedCounter from './AnimatedCounter';
import { useLanguage } from '../context/LanguageContext';

function WhyUs() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const reasons = [
    {
      icon: FaChalkboardTeacher,
      title: t('experiencedTeachers'),
      description: t('experiencedTeachersDesc'),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FaLaptop,
      title: t('modernEquipment'),
      description: t('modernEquipmentDesc'),
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: FaUsers,
      title: t('smallGroups'),
      description: t('smallGroupsDesc'),
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: FaCertificate,
      title: t('certificate'),
      description: t('certificateDesc'),
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: FaHandshake,
      title: t('jobAssistance'),
      description: t('jobAssistanceDesc'),
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: FaRocket,
      title: t('realProjects'),
      description: t('realProjectsDesc'),
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: FaHeadset,
      title: t('support247'),
      description: t('support247Desc'),
      color: 'from-teal-500 to-cyan-500',
    },
    {
      icon: FaClock,
      title: t('hybridLearning'),
      description: t('hybridLearningDesc'),
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  const stats = [
    { number: '500+', label: 'Выпускников', icon: FaGraduationCap },
    { number: '95%', label: 'Трудоустроены', icon: FaHandshake },
    { number: '12+', label: 'Опытных менторов', icon: FaChalkboardTeacher },
    { number: '4.9/5', label: 'Средний рейтинг', icon: FaAward },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
              {t('whyTitle')}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            ОКУРМЭН - это не просто курсы, это инвестиция в ваше будущее
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center transition-colors"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="text-3xl text-white" />
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent mb-2">
                <AnimatedCounter end={parseInt(stat.number.replace(/[^0-9]/g, ''))} suffix={stat.number.includes('+') ? '+' : stat.number.includes('%') ? '%' : ''} />
              </div>
              <p className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${reason.color} rounded-2xl flex items-center justify-center mb-4`}>
                <reason.icon className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                {reason.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-12 text-center text-white"
        >
          <h3 className="text-3xl font-bold mb-4">{t('readyToStart')}</h3>
          <p className="text-xl mb-8 text-orange-100">
            {t('joinSuccessfulIT')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#courses"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-orange-600 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              {t('chooseCourse')}
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold border-2 border-white hover:bg-white/30 transition-colors"
            >
              {t('contactUs')}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default WhyUs;
