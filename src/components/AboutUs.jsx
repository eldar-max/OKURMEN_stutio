import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBullseye, FaUserTie, FaGift, FaBriefcase } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';

function AboutUs() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: FaBullseye,
      title: 'Гибриддик формат',
      description: 'Онлайн сабактар + жеке ментор колдоо',
    },
    {
      icon: FaUserTie,
      title: 'Тажрыйбалуу тренерлер',
      description: 'Америкада иштеген мугалимдер',
    },
    {
      icon: FaGift,
      title: 'Бонус сабактар',
      description: 'AI, Оратордук акысыз',
    },
    {
      icon: FaBriefcase,
      title: 'Иш табууга жардам',
      description: 'Компанияларга жайгаштыруу',
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
            ОКУРМЭН — заманбап билим берүү борбору. Биз 2022-жылдан бери сапаттуу билим берип келебиз.
          </ScrollReveal>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
            ОКУРМЭН 2022-жылы май айында Санжарбек Мадумар жана Улукбек Бакыбек уулу тарабынан негизделген
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
                Билимден мүмкүнчүлүккө карай
              </h3>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Бүгүнкү күндө ОКУРМЭНде 3000ден ашуун окуучу билим алды.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                ОКУРМЭНде 15 жаштан 50 жашка чейинки окуучулар билим алып, жаңы кесиптерди өздөштүрүп, заманбап көндүмдөрүн өнүктүрүшөт.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Алардын арасында ири компанияларда, Бишкек мэриясында, Казакстандагы IT компанияларда иштеп жаткандар бар.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center transition-colors">
                <FaBriefcase className="text-5xl text-orange-600 mb-3 mx-auto" />
                <div className="text-2xl font-bold text-orange-600">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Иштеп жаткандар</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center transition-colors">
                <FaBullseye className="text-5xl text-orange-600 mb-3 mx-auto" />
                <div className="text-2xl font-bold text-orange-600">2022</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Жылдан бери</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center transition-colors">
                <FaGift className="text-5xl text-orange-600 mb-3 mx-auto" />
                <div className="text-2xl font-bold text-orange-600">Freelance</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Киреше</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center transition-colors">
                <FaUserTie className="text-5xl text-orange-600 mb-3 mx-auto" />
                <div className="text-2xl font-bold text-orange-600">3000+</div>
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
