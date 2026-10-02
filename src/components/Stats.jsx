import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FaUsers, FaChalkboardTeacher, FaBook, FaTrophy, FaRocket } from 'react-icons/fa';

function Stats() {
  const { language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    {
      icon: FaUsers,
      value: 3000,
      suffix: '+',
      labelKg: 'Окуучулар',
      labelRu: 'Студентов',
      labelEn: 'Students',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FaChalkboardTeacher,
      value: 50,
      suffix: '+',
      labelKg: 'Мугалимдер',
      labelRu: 'Преподавателей',
      labelEn: 'Teachers',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: FaBook,
      value: 100,
      suffix: '+',
      labelKg: 'Курстар',
      labelRu: 'Курсов',
      labelEn: 'Courses',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: FaTrophy,
      value: 95,
      suffix: '%',
      labelKg: 'Ийгилик',
      labelRu: 'Успеваемость',
      labelEn: 'Success Rate',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const getLabel = (stat) => {
    if (language === 'ru') return stat.labelRu;
    if (language === 'en') return stat.labelEn;
    return stat.labelKg;
  };

  const Counter = ({ value, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isInView) return;

      let startTime;
      let animationFrame;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        
        setCount(Math.floor(value * percentage));

        if (percentage < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }, [value, duration, isInView]);

    return <span>{count}</span>;
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {language === 'kg' ? 'Биздин жетишкендиктер' :
             language === 'en' ? 'Our Achievements' :
             'Наши достижения'}
          </h2>
          <p className="text-xl text-gray-300">
            {language === 'kg' ? 'Сандар биз жөнүндө сүйлөйт' :
             language === 'en' ? 'Numbers speak for themselves' :
             'Цифры говорят сами за себя'}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300 border border-white/20">
                  {/* Icon */}
                  <motion.div
                    animate={{ 
                      rotateY: [0, 360],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${stat.color} mb-6 shadow-2xl`}
                  >
                    <Icon className="text-4xl text-white" />
                  </motion.div>

                  {/* Number */}
                  <div className="text-6xl font-bold text-white mb-2">
                    {isInView && <Counter value={stat.value} />}
                    <span>{stat.suffix}</span>
                  </div>

                  {/* Label */}
                  <p className="text-xl text-gray-300 font-semibold">
                    {getLabel(stat)}
                  </p>

                  {/* Glow Effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-2xl text-white font-semibold flex items-center justify-center gap-3">
            <FaRocket className="text-orange-500 text-3xl" />
            {language === 'kg' ? 'Сиз да бул сандарга кошулуңуз!' :
             language === 'en' ? 'Join these numbers!' :
             'Присоединяйтесь к этим цифрам!'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Stats;
