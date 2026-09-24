import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { 
  FaLaptopCode, FaServer, FaPaintBrush, FaLanguage, 
  FaMicrophone, FaRobot, FaClock, FaBook, FaDollarSign, FaGift 
} from 'react-icons/fa';
import BookingModal from './BookingModal';

function Courses() {
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
    { id: 'all', name: 'Все курсы' },
    { id: 'it', name: 'IT курсы' },
    { id: 'language', name: 'Языки' },
    { id: 'skills', name: 'Навыки' },
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
      id: 3,
      category: 'it',
      title: 'UX/UI Design',
      description: 'Figma, Adobe XD, Design Theory',
      duration: '4 месяца',
      format: 'Гибрид',
      price: 'от 4000 сом/мес',
      icon: FaPaintBrush,
      color: 'from-pink-500 to-rose-500',
      features: ['Figma Pro', 'User Research', 'Prototyping', 'Portfolio'],
    },
    {
      id: 4,
      category: 'language',
      title: 'Англис тили',
      description: 'Beginner to Advanced',
      duration: 'Flexible',
      format: 'Офлайн группы',
      price: 'Бонус',
      icon: FaLanguage,
      color: 'from-green-500 to-emerald-500',
      features: ['Speaking Club', 'Grammar', 'Business English', 'IELTS prep'],
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
    <section id="courses" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Наши курсы
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Выберите свой путь к успеху. Все курсы с гибридным форматом обучения
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:shadow-md'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
            >
              {/* Header with gradient */}
              <div className={`h-32 bg-gradient-to-r ${course.color} flex items-center justify-center`}>
                <course.icon className="text-7xl text-white" />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4">{course.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaClock className="mr-2" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaBook className="mr-2" />
                    <span>{course.format}</span>
                  </div>
                  <div className="flex items-center text-sm font-semibold text-blue-600">
                    <FaDollarSign className="mr-2" />
                    <span>{course.price}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="border-t border-gray-100 pt-4 mb-4">
                  <ul className="space-y-2">
                    {course.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBooking(course.id)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-shadow"
                >
                  Записаться
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
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center"
        >
          <FaGift className="text-6xl mx-auto mb-4" />
          <h3 className="text-3xl font-bold mb-4">Бонус сабактар</h3>
          <p className="text-xl mb-6">
            IT курстарга жазылган окуучулар бонус катары төмөнкү сабактарды АКЫСЫЗ алышат:
          </p>
          <div className="grid md:grid-cols-5 gap-4 text-sm">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <FaLaptopCode className="text-3xl mb-2 mx-auto" />
              <div className="font-semibold">Компьютердик сабаттуулук</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <FaLanguage className="text-3xl mb-2 mx-auto" />
              <div className="font-semibold">Англис тили</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <FaMicrophone className="text-3xl mb-2 mx-auto" />
              <div className="font-semibold">Оратордук чеберчилик</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <FaRobot className="text-3xl mb-2 mx-auto" />
              <div className="font-semibold">Жасалма интеллект</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <FaBook className="text-3xl mb-2 mx-auto" />
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
