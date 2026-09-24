import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaUsers, FaBook, FaDollarSign, FaChartLine, FaSignOutAlt, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

function AdminPanel() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const username = localStorage.getItem('username') || 'Admin';

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-blue-600 to-purple-600 text-white transition-all duration-300 relative`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            {sidebarOpen && (
              <div>
                <h1 className="text-2xl font-bold">ОКУРМЭН</h1>
                <p className="text-sm text-blue-100">Админ панель</p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/20 rounded-lg"
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* User Info */}
          {sidebarOpen && (
            <div className="mb-6 p-3 bg-white/10 rounded-lg flex items-center space-x-3">
              <FaUserCircle className="text-3xl" />
              <div>
                <p className="font-semibold">{username}</p>
                <p className="text-xs text-blue-100">Администратор</p>
              </div>
            </div>
          )}

          <nav className="space-y-2">
            <Link
              to="/admin"
              className={`flex items-center ${
                sidebarOpen ? 'space-x-3' : 'justify-center'
              } p-3 rounded-lg hover:bg-white/20 transition-colors`}
            >
              <FaChartLine className="text-xl" />
              {sidebarOpen && <span>Дашборд</span>}
            </Link>
            <Link
              to="/admin/courses"
              className={`flex items-center ${
                sidebarOpen ? 'space-x-3' : 'justify-center'
              } p-3 rounded-lg hover:bg-white/20 transition-colors`}
            >
              <FaBook className="text-xl" />
              {sidebarOpen && <span>Курсы</span>}
            </Link>
            <Link
              to="/admin/students"
              className={`flex items-center ${
                sidebarOpen ? 'space-x-3' : 'justify-center'
              } p-3 rounded-lg hover:bg-white/20 transition-colors`}
            >
              <FaUsers className="text-xl" />
              {sidebarOpen && <span>Студенты</span>}
            </Link>
            <Link
              to="/admin/payments"
              className={`flex items-center ${
                sidebarOpen ? 'space-x-3' : 'justify-center'
              } p-3 rounded-lg hover:bg-white/20 transition-colors`}
            >
              <FaDollarSign className="text-xl" />
              {sidebarOpen && <span>Платежи</span>}
            </Link>
          </nav>

          <button
            onClick={handleLogout}
            className={`flex items-center ${
              sidebarOpen ? 'space-x-3' : 'justify-center'
            } p-3 rounded-lg hover:bg-white/20 transition-colors w-full absolute bottom-6 left-0 px-6`}
          >
            <FaSignOutAlt className="text-xl" />
            {sidebarOpen && <span>Выход</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses" element={<CoursesManagement />} />
          <Route path="/students" element={<StudentsManagement />} />
          <Route path="/payments" element={<PaymentsManagement />} />
        </Routes>
      </main>
    </div>
  );
}

function Dashboard() {
  const stats = [
    { label: 'Всего студентов', value: '3,245', icon: FaUsers, color: 'bg-blue-500', change: '+12%' },
    { label: 'Активных курсов', value: '12', icon: FaBook, color: 'bg-purple-500', change: '+2' },
    { label: 'Доход этого месяца', value: '₸ 2.5M', icon: FaDollarSign, color: 'bg-green-500', change: '+18%' },
    { label: 'Новые заявки', value: '45', icon: FaChartLine, color: 'bg-pink-500', change: '+5' },
  ];

  const recentEnrollments = [
    { id: 1, student: 'Айбек М.', course: 'Frontend Development', date: 'Сегодня', status: 'active' },
    { id: 2, student: 'Гүлнара С.', course: 'UX/UI Design', date: 'Сегодня', status: 'active' },
    { id: 3, student: 'Нурбек К.', course: 'Backend Development', date: 'Вчера', status: 'pending' },
    { id: 4, student: 'Асель Б.', course: 'Frontend Development', date: 'Вчера', status: 'active' },
    { id: 5, student: 'Эмир Т.', course: 'Англис тили', date: '2 дня назад', status: 'active' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Дашборд</h1>
        <p className="text-gray-600">Добро пожаловать в панель управления ОКУРМЭН</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} text-white p-4 rounded-lg`}>
                <stat.icon className="text-2xl" />
              </div>
              <span className="text-green-600 font-semibold text-sm">{stat.change}</span>
            </div>
            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Enrollments */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Последние записи</h2>
          <div className="space-y-3">
            {recentEnrollments.map((enrollment) => (
              <div key={enrollment.id} className="flex items-center justify-between p-3 border-b hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {enrollment.student.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{enrollment.student}</p>
                    <p className="text-sm text-gray-600">{enrollment.course}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{enrollment.date}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      enrollment.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {enrollment.status === 'active' ? 'Активен' : 'Ожидание'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Быстрые действия</h2>
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl text-left"
            >
              <FaBook className="text-2xl mb-2" />
              <p className="font-semibold">Добавить курс</p>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl text-left"
            >
              <FaUsers className="text-2xl mb-2" />
              <p className="font-semibold">Добавить студента</p>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl text-left"
            >
              <FaDollarSign className="text-2xl mb-2" />
              <p className="font-semibold">Платежи</p>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-xl text-left"
            >
              <FaChartLine className="text-2xl mb-2" />
              <p className="font-semibold">Отчеты</p>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoursesManagement() {
  const [courses, setCourses] = useState([
    { id: 1, name: 'Frontend Development', students: 120, price: 5000, status: 'active' },
    { id: 2, name: 'Backend Development', students: 95, price: 5000, status: 'active' },
    { id: 3, name: 'UX/UI Design', students: 80, price: 4000, status: 'active' },
    { id: 4, name: 'Англис тили', students: 150, price: 0, status: 'active' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    students: 0,
    price: 0,
    status: 'active',
  });

  const handleAdd = () => {
    setEditingCourse(null);
    setFormData({ name: '', students: 0, price: 0, status: 'active' });
    setShowModal(true);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData(course);
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingCourse) {
      setCourses(courses.map((c) => (c.id === editingCourse.id ? { ...formData, id: c.id } : c)));
    } else {
      setCourses([...courses, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Удалить этот курс?')) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Управление курсами</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <span>+</span>
          <span>Добавить курс</span>
        </motion.button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Название</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Студентов</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Цена</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-semibold">{course.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{course.students}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {course.price === 0 ? 'Бесплатно' : `${course.price} сом`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      course.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {course.status === 'active' ? 'Активен' : 'Неактивен'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(course)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Изменить
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-6">
              {editingCourse ? 'Редактировать курс' : 'Добавить курс'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Название</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Студентов</label>
                <input
                  type="number"
                  value={formData.students}
                  onChange={(e) => setFormData({ ...formData, students: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Цена (сом)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Статус</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Активен</option>
                  <option value="inactive">Неактивен</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Сохранить
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Отмена
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function StudentsManagement() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Айбек Осмонов',
      email: 'aibek@example.com',
      phone: '+996 555 123 456',
      course: 'Frontend Development',
      status: 'active',
      enrolled: '2024-01-15',
    },
    {
      id: 2,
      name: 'Гүлнара Сатыбалдиева',
      email: 'gulnara@example.com',
      phone: '+996 555 234 567',
      course: 'UX/UI Design',
      status: 'active',
      enrolled: '2024-02-20',
    },
    {
      id: 3,
      name: 'Нурбек Касымов',
      email: 'nurbek@example.com',
      phone: '+996 555 345 678',
      course: 'Backend Development',
      status: 'active',
      enrolled: '2024-01-10',
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    status: 'active',
  });

  const handleAdd = () => {
    setEditingStudent(null);
    setFormData({ name: '', email: '', phone: '', course: '', status: 'active' });
    setShowModal(true);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData(student);
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingStudent) {
      setStudents(students.map((s) => (s.id === editingStudent.id ? { ...formData, id: s.id, enrolled: s.enrolled } : s)));
    } else {
      setStudents([
        ...students,
        { ...formData, id: Date.now(), enrolled: new Date().toISOString().split('T')[0] },
      ]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Удалить этого студента?')) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Управление студентами</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <span>+</span>
          <span>Добавить студента</span>
        </motion.button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Имя</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Телефон</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Курс</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-semibold">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{student.course}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {student.status === 'active' ? 'Активен' : 'Неактивен'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(student)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Изменить
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-6">
              {editingStudent ? 'Редактировать студента' : 'Добавить студента'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Имя</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Телефон</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Курс</label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Выберите курс</option>
                  <option value="Frontend Development">Frontend Development</option>
                  <option value="Backend Development">Backend Development</option>
                  <option value="UX/UI Design">UX/UI Design</option>
                  <option value="Англис тили">Англис тили</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Статус</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Активен</option>
                  <option value="inactive">Неактивен</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Сохранить
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Отмена
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function PaymentsManagement() {
  const [payments, setPayments] = useState([
    {
      id: 1,
      student: 'Айбек Осмонов',
      course: 'Frontend Development',
      amount: 5000,
      date: '2024-09-15',
      status: 'completed',
      method: 'Банковская карта',
    },
    {
      id: 2,
      student: 'Гүлнара Сатыбалдиева',
      course: 'UX/UI Design',
      amount: 4000,
      date: '2024-09-18',
      status: 'completed',
      method: 'Mbank',
    },
    {
      id: 3,
      student: 'Нурбек Касымов',
      course: 'Backend Development',
      amount: 5000,
      date: '2024-09-20',
      status: 'pending',
      method: 'Наличные',
    },
  ]);

  const [filter, setFilter] = useState('all');

  const filteredPayments =
    filter === 'all'
      ? payments
      : payments.filter((p) => p.status === filter);

  const totalRevenue = payments
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Управление платежами</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-gray-600 text-sm mb-2">Общий доход</p>
          <p className="text-3xl font-bold text-green-600">{totalRevenue.toLocaleString()} сом</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-gray-600 text-sm mb-2">Завершенных</p>
          <p className="text-3xl font-bold text-blue-600">
            {payments.filter((p) => p.status === 'completed').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-gray-600 text-sm mb-2">Ожидание</p>
          <p className="text-3xl font-bold text-yellow-600">
            {payments.filter((p) => p.status === 'pending').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-semibold ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Все
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-lg font-semibold ${
            filter === 'completed'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Завершенные
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg font-semibold ${
            filter === 'pending'
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Ожидание
        </button>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Студент</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Курс</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Сумма</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Дата</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Метод</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPayments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-semibold">{payment.student}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{payment.course}</td>
                <td className="px-6 py-4 whitespace-nowrap font-bold text-green-600">
                  {payment.amount.toLocaleString()} сом
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{payment.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{payment.method}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      payment.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : payment.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {payment.status === 'completed'
                      ? 'Завершен'
                      : payment.status === 'pending'
                      ? 'Ожидание'
                      : 'Отменен'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;
