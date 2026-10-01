import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBullseye, FaUserTie, FaGift, FaBriefcase } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../context/LanguageContext';

function AboutUs() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: FaBullseye,
      title: t('hybridFormat'),
      description: t('hybridFormatDesc'),
    },
    {
      icon: FaUserTie,
      title: t('experiencedTrainers'),
      description: t('experiencedTrainersDesc'),
    },
    {
      icon: FaGift,
      title: t('bonusLessons'),
      description: t('bonusLessonsDesc'),
    },
    {
      icon: FaBriefcase,
      title: t('jobPlacement'),
      description: t('jobPlacementDesc'),
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <ScrollReveal
            baseOpacity={0.1}
            enableBlur
            baseRotation={3}
            blurStrength={4}
          >
            {t('aboutDescription')}
          </ScrollReveal>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
            {t('aboutFoundedText')}
          </p>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-800 dark:to-orange-700 rounded-3xl p-8 md:p-12 mb-16 transition-colors"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                {t('fromKnowledgeToOpportunities')}
              </h3>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                {t('studentsLearned')}
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                {t('studentsAgeRange')}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('studentsWorkAt')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center transition-colors">
                <FaBriefcase className="text-5xl text-orange-600 mb-3 mx-auto" />
                <div className="text-2xl font-bold text-orange-600">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('employed')}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center transition-colors">
                <FaBullseye className="text-5xl text-orange-600 mb-3 mx-auto" />
                <div className="text-2xl font-bold text-orange-600">2022</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('sinceYear')}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center transition-colors">
                <FaGift className="text-5xl text-orange-600 mb-3 mx-auto" />
                <div className="text-2xl font-bold text-orange-600">Freelance</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('freelanceIncome')}</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center transition-colors">
                <FaUserTie className="text-5xl text-orange-600 mb-3 mx-auto" />
                <div className="text-2xl font-bold text-orange-600">3000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('graduates')}</div>
              </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Выпускников</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <feature.icon className="text-5xl text-orange-600 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
