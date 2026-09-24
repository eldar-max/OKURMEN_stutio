import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBullseye, FaUserTie, FaGift, FaBriefcase } from 'react-icons/fa';

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
      description: 'Англис тили, AI, Оратордук акысыз',
    },
    {
      icon: FaBriefcase,
      title: 'Иш табууга жардам',
      description: 'Компанияларга жайгаштыруу',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              О нас
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ОКУРМЭН 2022-жылы май айында Санжарбек Мадумар жана Улукбек Бакыбек уулу тарабынан негизделген
          </p>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 mb-16"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4 text-gray-800">
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
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <FaBriefcase className="text-5xl text-blue-600 mb-3 mx-auto" />
                <div className="text-2xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600">Иштеп жаткандар</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <FaBullseye className="text-5xl text-purple-600 mb-3 mx-auto" />
                <div className="text-2xl font-bold text-purple-600">2022</div>
                <div className="text-sm text-gray-600">Жылдан бери</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <FaGift className="text-5xl text-pink-600 mb-3 mx-auto" />
                <div className="text-2xl font-bold text-pink-600">Freelance</div>
                <div className="text-sm text-gray-600">Киреше</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <FaUserTie className="text-5xl text-indigo-600 mb-3 mx-auto" />
                <div className="text-2xl font-bold text-indigo-600">3000+</div>
                <div className="text-sm text-gray-600">Выпускников</div>
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
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <feature.icon className="text-5xl text-blue-600 mb-4" />
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
