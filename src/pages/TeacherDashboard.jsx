import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaBook, FaUsers, FaChartLine, FaSignOutAlt, FaUserCircle, FaHome, FaTimes, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { signOutUser } from '../services/firebase';

function TeacherDashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Преподаватель';
  const fullName = localStorage.getItem('userFullName') || username;

  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showManageCourseModal, setShowManageCourseModal] = useState(false);
  const [showStatisticsModal, setShowStatisticsModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({
    name: '',
    description: '',
    duration: '',
    price: '',
  });

  const handleLogout = async () => {
    await signOutUser();
    window.location.href = '/';
  };

  const handleManageCourse = (course) => {
    setSelectedCourse(course);
    setShowManageCourseModal(true);
  };

  const handleShowStatistics = (course) => {
    setSelectedCourse(course);
    setShowStatisticsModal(true);
  };

  const handleAddCourse = () => {
    // Здесь будет отправка на backend
    console.log('Добавление курса:', newCourse);
    setShowAddCourseModal(false);
    setNewCourse({ name: '', description: '', duration: '', price: '' });
    alert('Курс успешно добавлен!');
  };

  const myCourses = [
    { id: 1, name: 'Frontend Development', students: 45, lessons: 24 },
    { id: 2, name: 'React Advanced', students: 30, lessons: 18 },
  ];

  const students = [
    { id: 1, name: 'Айбек М.', course: 'Frontend Development', progress: 65 },
    { id: 2, name: 'Асель Б.', course: 'Frontend Development', progress: 80 },
    { id: 3, name: 'Нурбек К.', course: 'React Advanced', progress: 45 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-purple-600 hover:text-purple-700 transition-colors" title="На главную">
              <FaHome className="text-2xl" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Кабинет преподавателя</h1>
              <p className="text-sm text-gray-600">ОКУРМЭН</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-gray-100 rounded-full px-4 py-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                {username.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800">{fullName}</p>
                <p className="text-xs text-gray-600">Преподаватель</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Выйти"
            >
              <FaSignOutAlt className="text-xl" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-500 text-white p-4 rounded-lg">
                <FaBook className="text-2xl" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Мои курсы</p>
            <p className="text-3xl font-bold">2</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-500 text-white p-4 rounded-lg">
                <FaUsers className="text-2xl" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Всего студентов</p>
            <p className="text-3xl font-bold">75</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-500 text-white p-4 rounded-lg">
                <FaChartLine className="text-2xl" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Средний прогресс</p>
            <p className="text-3xl font-bold">63%</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Courses */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Мои курсы</h2>
            <div className="space-y-4">
              {myCourses.map((course) => (
                <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">{course.name}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span>👥 {course.students} студентов</span>
                    <span>📚 {course.lessons} уроков</span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleManageCourse(course)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                    >
                      Управление
                    </button>
                    <button 
                      onClick={() => handleShowStatistics(course)}
                      className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm hover:bg-blue-50 transition-colors"
                    >
                      Статистика
                    </button>
                  </div>
                </div>
              ))}
              <button 
                onClick={() => setShowAddCourseModal(true)}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-colors"
              >
                + Добавить курс
              </button>
            </div>
          </div>

          {/* Students */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Мои студенты</h2>
            <div className="space-y-3">
              {students.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 border-b hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.course}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800">{student.progress}%</p>
                    <div className="w-16 bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-1.5 rounded-full"
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Add Course Modal */}
      <AnimatePresence>
        {showAddCourseModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowAddCourseModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Добавить курс</h3>
                <button
                  onClick={() => setShowAddCourseModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="text-2xl" />
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleAddCourse(); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Название курса
                  </label>
                  <input
                    type="text"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="например: Python для начинающих"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Описание
                  </label>
                  <textarea
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Краткое описание курса"
                    rows="3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Длительность
                  </label>
                  <input
                    type="text"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="например: 3 месяца"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Цена
                  </label>
                  <input
                    type="text"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="например: 5000 сом/мес"
                    required
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddCourseModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow"
                  >
                    Добавить
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manage Course Modal */}
      <AnimatePresence>
        {showManageCourseModal && selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowManageCourseModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Управление курсом</h3>
                <button
                  onClick={() => setShowManageCourseModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="text-2xl" />
                </button>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-2">{selectedCourse.name}</h4>
                <p className="text-gray-600">👥 {selectedCourse.students} студентов • 📚 {selectedCourse.lessons} уроков</p>
              </div>

              <div className="space-y-3">
                <button className="w-full px-6 py-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-left flex items-center justify-between transition-colors">
                  <div className="flex items-center space-x-3">
                    <FaEdit className="text-xl" />
                    <span className="font-semibold">Редактировать информацию курса</span>
                  </div>
                </button>

                <button className="w-full px-6 py-4 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-left flex items-center justify-between transition-colors">
                  <div className="flex items-center space-x-3">
                    <FaBook className="text-xl" />
                    <span className="font-semibold">Управление уроками</span>
                  </div>
                </button>

                <button className="w-full px-6 py-4 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-left flex items-center justify-between transition-colors">
                  <div className="flex items-center space-x-3">
                    <FaUsers className="text-xl" />
                    <span className="font-semibold">Список студентов</span>
                  </div>
                </button>

                <button className="w-full px-6 py-4 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-left flex items-center justify-between transition-colors">
                  <div className="flex items-center space-x-3">
                    <FaTrash className="text-xl" />
                    <span className="font-semibold">Удалить курс</span>
                  </div>
                </button>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setShowManageCourseModal(false)}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Закрыть
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Statistics Modal */}
      <AnimatePresence>
        {showStatisticsModal && selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowStatisticsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Статистика курса</h3>
                <button
                  onClick={() => setShowStatisticsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="text-2xl" />
                </button>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-4">{selectedCourse.name}</h4>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <FaUsers className="text-3xl text-blue-600" />
                  </div>
                  <p className="text-gray-600 text-sm mt-2">Всего студентов</p>
                  <p className="text-3xl font-bold text-blue-600">{selectedCourse.students}</p>
                </div>

                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <FaBook className="text-3xl text-purple-600" />
                  </div>
                  <p className="text-gray-600 text-sm mt-2">Уроков</p>
                  <p className="text-3xl font-bold text-purple-600">{selectedCourse.lessons}</p>
                </div>

                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <FaChartLine className="text-3xl text-green-600" />
                  </div>
                  <p className="text-gray-600 text-sm mt-2">Средний прогресс</p>
                  <p className="text-3xl font-bold text-green-600">68%</p>
                </div>

                <div className="bg-yellow-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <FaChartLine className="text-3xl text-yellow-600" />
                  </div>
                  <p className="text-gray-600 text-sm mt-2">Завершили</p>
                  <p className="text-3xl font-bold text-yellow-600">12</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h5 className="font-semibold mb-3">Активность студентов</h5>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Активные (посещают регулярно)</span>
                    <span className="font-semibold">38 (84%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '84%' }} />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setShowStatisticsModal(false)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow"
                >
                  Закрыть
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TeacherDashboard;
