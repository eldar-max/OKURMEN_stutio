import { motion } from 'framer-motion';
import { FaGraduationCap, FaBook, FaStar, FaRocket } from 'react-icons/fa';
import { useState } from 'react';
import BookingModal from './BookingModal';
import AnimatedCounter from './AnimatedCounter';
import { useLanguage } from '../context/LanguageContext';

// Import teacher photos
import teacher1 from '../assets/adb37158-119f-413e-9633-ce9fd060408f.jpeg';
import teacher2 from '../assets/b0fdf58a-6c96-4ac0-885c-8968f9dd1ee0.jpeg';
import teacher3 from '../assets/c94cd545-7c02-42e7-ab7a-7595b0cba938.jpeg';

function Hero() {
  const { t } = useLanguage();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const teachers = [
    {
      name: 'Бактыбек А.',
      role: 'IT Ментор',
      photo: teacher1,
      borderColor: 'border-yellow-400',
      bgColor: 'bg-yellow-400',
    },
    {
      name: 'Айлери К.',
      role: 'Контент Менеджер',
      photo: teacher2,
      borderColor: 'border-amber-600',
      bgColor: 'bg-amber-600',
    },
    {
      name: 'Нурлан Т.',
      role: 'Маркетолог',
      photo: teacher3,
      borderColor: 'border-slate-700',
      bgColor: 'bg-slate-700',
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-orange-400 to-orange-600 dark:from-orange-800 dark:to-orange-900 transition-colors">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-white drop-shadow-lg">
                ОКУРМЭН
              </span>
            </motion.h1>

            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white dark:text-white mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {t('heroSubtitle')}
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-white/90 dark:text-white/80 mb-6 sm:mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {t('heroDescription')}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                onClick={() => setBookingModalOpen(true)}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-orange-600 rounded-full font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group"
              >
                <span className="relative z-10">{t('getStarted')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-orange-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </motion.button>
              <motion.a
                href="#courses"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto text-center px-6 sm:px-8 py-3 sm:py-4 bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all border-2 border-white hover:bg-white/30"
              >
                {t('viewCourses')}
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-8 sm:mt-12 grid grid-cols-3 gap-3 sm:gap-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 shadow-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                  <AnimatedCounter end={3000} suffix="+" />
                </div>
                <div className="text-xs sm:text-sm text-white/80 dark:text-white/70 mt-1">Окуучулар</div>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                  <AnimatedCounter end={15} suffix="+" />
                </div>
                <div className="text-xs sm:text-sm text-white/80 mt-1">Курстар</div>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                  <AnimatedCounter end={95} suffix="%" />
                </div>
                <div className="text-xs sm:text-sm text-white/80 mt-1">Канааттануу</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Teacher Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative hidden md:block"
          >
            <div className="grid grid-cols-2 gap-4">
              {teachers.map((teacher, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className={`${teacher.bgColor} p-2 rounded-3xl shadow-xl hover:shadow-2xl transition-all ${
                    index === 0 ? 'col-span-1 row-span-1' : 
                    index === 1 ? 'col-span-1 row-span-2' : 
                    'col-span-1 row-span-1'
                  }`}
                >
                  <div className={`bg-white rounded-2xl overflow-hidden h-full`}>
                    <div className={`${index === 1 ? 'aspect-[3/5]' : 'aspect-square'} overflow-hidden`}>
                      <img 
                        src={teacher.photo} 
                        alt={teacher.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 text-center">
                      <h3 className="text-base font-bold text-gray-800 mb-1">{teacher.name}</h3>
                      <p className="text-sm text-gray-600">{teacher.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="hidden lg:block absolute -top-10 -left-10 bg-white p-4 rounded-2xl shadow-xl"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaBook className="text-2xl text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold">IT курстар</div>
                  <div className="text-sm text-gray-600">Frontend, Backend</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="hidden lg:block absolute -bottom-10 -right-10 bg-white p-4 rounded-2xl shadow-xl"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <FaStar className="text-2xl text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold">Оратордук</div>
                  <div className="text-sm text-gray-600">Сүйлөө чеберчилиги</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </section>
  );
}

export default Hero;
