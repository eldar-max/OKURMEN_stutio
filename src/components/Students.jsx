import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaUsers, FaChartLine, FaBriefcase, FaDollarSign, FaRocket, FaStar } from 'react-icons/fa';
import AnimatedCounter from './AnimatedCounter';

function Students() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="students" className="py-20 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
              Наши студенты
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            15 жаштан 50 жашка чейинки адамдар билим алышат
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl text-center transition-colors"
          >
            <FaGraduationCap className="text-6xl text-orange-600 mb-4 mx-auto" />
            <div className="text-5xl font-bold text-orange-600 mb-2">
              <AnimatedCounter end={3000} suffix="+" />
            </div>
            <div className="text-xl text-gray-700 dark:text-white font-semibold">Окуучулар</div>
            <div className="text-gray-600 dark:text-gray-400 mt-2">билим алды</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl text-center transition-colors"
          >
            <FaUsers className="text-6xl text-orange-600 mb-4 mx-auto" />
            <div className="text-5xl font-bold text-orange-600 mb-2">
              <AnimatedCounter end={15} />-<AnimatedCounter end={50} />
            </div>
            <div className="text-xl text-gray-700 dark:text-white font-semibold">Жаш курагы</div>
            <div className="text-gray-600 dark:text-gray-400 mt-2">ар түрдүү окуучулар</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl text-center transition-colors"
          >
            <FaStar className="text-6xl text-orange-600 mb-4 mx-auto" />
            <div className="text-5xl font-bold text-orange-600 mb-2">
              <AnimatedCounter end={95} suffix="%" />
            </div>
            <div className="text-xl text-gray-700 dark:text-white font-semibold">Канааттануу</div>
            <div className="text-gray-600 dark:text-gray-400 mt-2">студенттер</div>
          </motion.div>
        </div>

        {/* Success Stories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl"
        >
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Студенттердин ийгиликтери
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                  <FaBriefcase className="text-2xl text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1 text-gray-800 dark:text-white">Иштеп жаткандар</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Ири компанияларда, Бишкек мэриясында, Казакстандагы IT компанияларда
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                  <FaDollarSign className="text-2xl text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1 text-gray-800 dark:text-white">Freelance</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Окуу менен бирге заказ алып, киреше таба башташкан
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                  <FaRocket className="text-2xl text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1 text-gray-800 dark:text-white">Карьера өсүшү</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Жаңы кесиптерди өздөштүрүп, мүмкүнчүлүккө жетишүүдө
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                  <FaChartLine className="text-2xl text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1 text-gray-800 dark:text-white">Өнүгүү</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Заманбап көндүмдөрүн өнүктүрүп, келечегин түзүүдө
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Students;
