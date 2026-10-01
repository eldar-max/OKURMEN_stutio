import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { 
  FaLaptopCode, FaServer, FaPaintBrush, FaLanguage, 
  FaMicrophone, FaRobot, FaClock, FaBook, FaDollarSign, FaGift 
} from 'react-icons/fa';
import BookingModal from './BookingModal';
import { useLanguage } from '../context/LanguageContext';

function Courses() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleBooking = (courseId) => {
    setSelectedCourse(courseId);
    setBookingModalOpen(true);
  };

  const categories = [
    { id: 'all', name: t('allCourses') },
    { id: 'it', name: t('itCourses') },
    { id: 'language', name: t('languages') },
    { id: 'skills', name: t('skills') },
  ];

  const courses = [
    {
      id: 1,
      category: 'it',
      title: 'Frontend Development',
      description: 'React, JavaScript, HTML/CSS',
      duration: '6 месяцев',
      format: 'Гибрид',
      price: 'от 5000 сом/мес',
      icon: FaLaptopCode,
      color: 'from-blue-500 to-cyan-500',
      features: ['React & Redux', 'Responsive Design', 'API Integration', 'Портфолио проекты'],
    },
    {
      id: 2,
      category: 'it',
      title: 'Backend Development',
      description: 'Node.js, Python, Databases',
      duration: '6 месяцев',
      format: 'Гибрид',
      price: 'от 5000 сом/мес',
      icon: FaServer,
      color: 'from-purple-500 to-pink-500',
      features: ['Node.js/Python', 'Database Design', 'REST API', 'Микросервисы'],
    },
    {
      id: 5,
      category: 'skills',
      title: 'Оратордук чеберчилик',
      description: 'Публичные выступления',
      duration: '2 месяца',
      format: 'Офлайн',
      price: 'Бонус',
      icon: FaMicrophone,
      color: 'from-orange-500 to-red-500',
      features: ['Уверенность', 'Дикция', 'Презентации', 'Практика'],
    },
    {
      id: 6,
      category: 'skills',
      title: 'Жасалма интеллект (AI)',
      description: 'ChatGPT, Midjourney, AI tools',
      duration: '1 месяц',
      format: 'Онлайн',
      price: 'Бонус',
      icon: FaRobot,
      color: 'from-indigo-500 to-purple-500',
      features: ['ChatGPT Pro', 'AI Art', 'Automation', 'Productivity'],
    },
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  return (
    <section id="courses" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
              {t('coursesTitle')}
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
            {t('coursesSubtitle')}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full font-semibold text-sm sm:text-base transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:shadow-md'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Courses Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
            >
              {/* Header with gradient */}
              <div className={`h-24 sm:h-28 md:h-32 bg-gradient-to-r ${course.color} flex items-center justify-center`}>
                <course.icon className="text-5xl sm:text-6xl md:text-7xl text-white" />
              </div>

              <div className="p-4 sm:p-5 md:p-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-gray-800 dark:text-white">
                  {course.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">{course.description}</p>

                <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <FaClock className="mr-2 flex-shrink-0" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                    <FaBook className="mr-2 flex-shrink-0" />
                    <span>{course.format}</span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm font-semibold text-blue-600">
                    <FaDollarSign className="mr-2 flex-shrink-0" />
                    <span>{course.price}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="border-t border-gray-100 pt-3 sm:pt-4 mb-3 sm:mb-4">
                  <ul className="space-y-1.5 sm:space-y-2">
                    {course.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-xs sm:text-sm text-gray-700">
                        <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBooking(course.id)}
                  className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-shadow"
                >
                  {t('enrollNow')}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 sm:mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white text-center"
        >
          <FaGift className="text-4xl sm:text-5xl md:text-6xl mx-auto mb-3 sm:mb-4" />
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Бонус сабактар</h3>
          <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 px-2">
            IT курстарга жазылган окуучулар бонус катары төмөнкү сабактарды АКЫСЫЗ алышат:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 sm:p-4">
              <FaLaptopCode className="text-2xl sm:text-3xl mb-2 mx-auto" />
              <div className="font-semibold">Компьютердик сабаттуулук</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 sm:p-4">
              <FaMicrophone className="text-2xl sm:text-3xl mb-2 mx-auto" />
              <div className="font-semibold">Оратордук чеберчилик</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 sm:p-4">
              <FaRobot className="text-2xl sm:text-3xl mb-2 mx-auto" />
              <div className="font-semibold">Жасалма интеллект</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 sm:p-4">
              <FaBook className="text-2xl sm:text-3xl mb-2 mx-auto" />
              <div className="font-semibold">Гапыр агай АЭМ</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedCourse={selectedCourse}
      />
    </section>
  );
}

export default Courses;
