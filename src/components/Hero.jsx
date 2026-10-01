import { motion } from 'framer-motion';
import { FaGraduationCap, FaBook, FaStar, FaRocket } from 'react-icons/fa';
import { useState } from 'react';
import BookingModal from './BookingModal';
import AnimatedCounter from './AnimatedCounter';
import { useLanguage } from '../context/LanguageContext';

function Hero() {
  const { t } = useLanguage();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

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

          {/* Right Content - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative hidden md:block"
          >
            <div className="relative w-full h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 opacity-90" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center p-8">
                  <FaGraduationCap className="text-7xl lg:text-9xl mb-6 mx-auto" />
                  <div className="text-2xl lg:text-3xl font-bold mb-2">Гибриддик окуу</div>
                  <div className="text-base lg:text-lg">Онлайн + Ментор колдоо</div>
                </div>
              </div>
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
