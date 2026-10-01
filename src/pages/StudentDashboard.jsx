import { useNavigate, Link } from 'react-router-dom';
import { FaBook, FaDollarSign, FaCertificate, FaChartLine, FaSignOutAlt, FaUserCircle, FaHome } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { signOutUser } from '../services/firebase';

function StudentDashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Студент';
  const fullName = localStorage.getItem('userFullName') || username;

  const handleLogout = async () => {
    await signOutUser();
    window.location.href = '/';
  };

  const myCourses = [
    { id: 1, name: 'Frontend Development', progress: 65, nextLesson: 'React Hooks' },
    { id: 2, name: 'Англис тили', progress: 80, nextLesson: 'Grammar Lesson 5' },
  ];

  const payments = [
    { id: 1, course: 'Frontend Development', amount: 5000, date: '01.01.2024', status: 'paid' },
    { id: 2, course: 'Frontend Development', amount: 5000, date: '01.02.2024', status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-blue-600 hover:text-blue-700 transition-colors" title="На главную">
              <FaHome className="text-2xl" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Личный кабинет студента</h1>
              <p className="text-sm text-gray-600">ОКУРМЭН</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-gray-100 rounded-full px-4 py-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {username.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800">{fullName}</p>
                <p className="text-xs text-gray-600">Студент</p>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
              <div className="bg-green-500 text-white p-4 rounded-lg">
                <FaChartLine className="text-2xl" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Средний прогресс</p>
            <p className="text-3xl font-bold">72%</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-500 text-white p-4 rounded-lg">
                <FaCertificate className="text-2xl" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Сертификаты</p>
            <p className="text-3xl font-bold">0</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-pink-500 text-white p-4 rounded-lg">
                <FaDollarSign className="text-2xl" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">К оплате</p>
            <p className="text-3xl font-bold">5,000₸</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Courses */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Мои курсы</h2>
            <div className="space-y-4">
              {myCourses.map((course) => (
                <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{course.name}</h3>
                    <span className="text-sm text-gray-600">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">Следующий урок: {course.nextLesson}</p>
                  <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                    Продолжить
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Payments */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">История платежей</h2>
            <div className="space-y-3">
              {payments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 border-b hover:bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold">{payment.course}</p>
                    <p className="text-sm text-gray-600">{payment.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{payment.amount} ₸</p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        payment.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {payment.status === 'paid' ? 'Оплачено' : 'Ожидание'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;
