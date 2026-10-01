import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUsers, FaBook, FaChartLine, FaSignOutAlt, FaHome, FaUserGraduate, FaChalkboardTeacher, FaMoneyBillWave, FaTimes, FaEdit, FaTrash, FaPlus, FaEye, FaCheck, FaBan, FaFilter, FaDownload, FaEnvelope, FaPhone, FaCalendar, FaClock, FaDollarSign } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { signOutUser } from '../services/firebase';
import StatCard from '../components/StatCard';
import SimpleChart from '../components/SimpleChart';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // States for data
  const [users, setUsers] = useState([
    { id: 1, name: 'Айбек Мамедов', email: 'aibek@mail.ru', phone: '+996 555 123 456', role: 'student', status: 'active', joined: '2024-01-15', lastActive: '2024-01-20' },
    { id: 2, name: 'Асель Бекова', email: 'asel@mail.ru', phone: '+996 555 234 567', role: 'student', status: 'active', joined: '2024-01-14', lastActive: '2024-01-19' },
    { id: 3, name: 'Нурбек Кадыров', email: 'nurbek@mail.ru', phone: '+996 555 345 678', role: 'teacher', status: 'active', joined: '2024-01-10', lastActive: '2024-01-20' },
    { id: 4, name: 'Гүлнара Сыдыкова', email: 'gulnara@mail.ru', phone: '+996 555 456 789', role: 'student', status: 'active', joined: '2024-01-12', lastActive: '2024-01-18' },
    { id: 5, name: 'Тилек Абдыкаров', email: 'tilek@mail.ru', phone: '+996 555 567 890', role: 'teacher', status: 'active', joined: '2024-01-08', lastActive: '2024-01-20' },
  ]);

  const [courses, setCourses] = useState([
    { id: 1, name: 'Frontend Development', description: 'Изучение React, JavaScript, HTML/CSS', duration: '6 месяцев', students: 45, teacher: 'Нурбек К.', price: '5000', status: 'active', category: 'IT', startDate: '2024-02-01' },
    { id: 2, name: 'React Advanced', description: 'Продвинутый React с Redux и TypeScript', duration: '4 месяца', students: 30, teacher: 'Нурбек К.', price: '5000', status: 'active', category: 'IT', startDate: '2024-02-15' },
    { id: 3, name: 'Backend Development', description: 'Node.js, Python, Databases', duration: '6 месяцев', students: 38, teacher: 'Тилек А.', price: '5000', status: 'active', category: 'IT', startDate: '2024-02-01' },
    { id: 4, name: 'Англис тили', description: 'От начального до продвинутого уровня', duration: '8 месяцев', students: 52, teacher: 'Айжан М.', price: '3000', status: 'active', category: 'Языки', startDate: '2024-02-01' },
  ]);

  const [payments, setPayments] = useState([
    { id: 1, student: 'Айбек М.', course: 'Frontend Development', amount: '5000', date: '2024-01-15', status: 'completed', method: 'Банк', transactionId: 'TXN001' },
    { id: 2, student: 'Асель Б.', course: 'React Advanced', amount: '5000', date: '2024-01-14', status: 'pending', method: 'Наличные', transactionId: 'TXN002' },
    { id: 3, student: 'Нурбек К.', course: 'Backend Development', amount: '5000', date: '2024-01-13', status: 'completed', method: 'Банк', transactionId: 'TXN003' },
    { id: 4, student: 'Гүлнара С.', course: 'Англис тили', amount: '3000', date: '2024-01-16', status: 'completed', method: 'Карта', transactionId: 'TXN004' },
    { id: 5, student: 'Тилек А.', course: 'Frontend Development', amount: '5000', date: '2024-01-17', status: 'pending', method: 'Наличные', transactionId: 'TXN005' },
  ]);

  // Form data states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'student',
    price: '',
    teacher: '',
    description: '',
    duration: '',
    category: 'IT',
    startDate: '',
  });

  // Check admin access
  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    const adminEmail = 'isabekoveldat@gmail.com';
    
    if (!isAuthenticated || userEmail !== adminEmail) {
      alert('У вас нет доступа к админ-панели!');
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = async () => {
    await signOutUser();
    window.location.href = '/';
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    setShowModal(true);
    
    if (item) {
      setFormData({
        name: item.name || '',
        email: item.email || '',
        phone: item.phone || '',
        role: item.role || 'student',
        price: item.price || '',
        teacher: item.teacher || '',
        description: item.description || '',
        duration: item.duration || '',
        category: item.category || 'IT',
        startDate: item.startDate || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'student',
        price: '',
        teacher: '',
        description: '',
        duration: '',
        category: 'IT',
        startDate: '',
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedItem(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'student',
      price: '',
      teacher: '',
      description: '',
      duration: '',
      category: 'IT',
      startDate: '',
    });
  };

  // USER FUNCTIONS
  const handleAddUser = (e) => {
    e.preventDefault();
    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      status: 'active',
      joined: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0],
    };
    setUsers([...users, newUser]);
    closeModal();
    alert('Пользователь успешно добавлен!');
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    setUsers(users.map(user => 
      user.id === selectedItem.id 
        ? { ...user, name: formData.name, email: formData.email, phone: formData.phone, role: formData.role }
        : user
    ));
    closeModal();
    alert('Пользователь успешно обновлен!');
  };

  const handleDeleteUser = () => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      setUsers(users.filter(user => user.id !== selectedItem.id));
      closeModal();
      alert('Пользователь удален!');
    }
  };

  const handleToggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' }
        : user
    ));
    alert('Статус пользователя изменен!');
  };

  // COURSE FUNCTIONS
  const handleAddCourse = (e) => {
    e.preventDefault();
    const newCourse = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      duration: formData.duration,
      price: formData.price,
      teacher: formData.teacher,
      category: formData.category,
      startDate: formData.startDate,
      students: 0,
      status: 'active',
    };
    setCourses([...courses, newCourse]);
    closeModal();
    alert('Курс успешно добавлен!');
  };

  const handleEditCourse = (e) => {
    e.preventDefault();
    setCourses(courses.map(course => 
      course.id === selectedItem.id 
        ? { 
            ...course, 
            name: formData.name, 
            description: formData.description,
            duration: formData.duration,
            price: formData.price, 
            teacher: formData.teacher,
            category: formData.category,
            startDate: formData.startDate,
          }
        : course
    ));
    closeModal();
    alert('Курс успешно обновлен!');
  };

  const handleDeleteCourse = () => {
    if (window.confirm('Вы уверены, что хотите удалить этот курс?')) {
      setCourses(courses.filter(course => course.id !== selectedItem.id));
      closeModal();
      alert('Курс удален!');
    }
  };

  const handleToggleCourseStatus = (courseId) => {
    setCourses(courses.map(course => 
      course.id === courseId 
        ? { ...course, status: course.status === 'active' ? 'inactive' : 'active' }
        : course
    ));
    alert('Статус курса изменен!');
  };

  // PAYMENT FUNCTIONS
  const handleConfirmPayment = (paymentId) => {
    setPayments(payments.map(payment => 
      payment.id === paymentId 
        ? { ...payment, status: 'completed' }
        : payment
    ));
    alert('Платеж подтвержден!');
  };

  const handleRejectPayment = (paymentId) => {
    if (window.confirm('Отклонить этот платеж?')) {
      setPayments(payments.map(payment => 
        payment.id === paymentId 
          ? { ...payment, status: 'rejected' }
          : payment
      ));
      alert('Платеж отклонен!');
    }
  };

  const handleExportPayments = () => {
    const csvContent = [
      ['ID', 'Студент', 'Курс', 'Сумма', 'Дата', 'Статус', 'Метод', 'Транзакция'],
      ...payments.map(p => [p.id, p.student, p.course, p.amount, p.date, p.status, p.method, p.transactionId])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payments_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    alert('Платежи экспортированы в CSV!');
  };

  // Filter functions
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPayments = payments.filter(payment => 
    payment.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats calculation
  const stats = {
    totalStudents: users.filter(u => u.role === 'student').length,
    totalTeachers: users.filter(u => u.role === 'teacher').length,
    totalCourses: courses.filter(c => c.status === 'active').length,
    totalRevenue: payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + parseInt(p.amount), 0).toLocaleString(),
    activeStudents: users.filter(u => u.role === 'student' && u.status === 'active').length,
    pendingPayments: payments.filter(p => p.status === 'pending').length,
  };

  const recentUsers = users.slice(-5).reverse();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-purple-600">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-purple-600 hover:text-purple-700 transition-colors" title="На главную">
              <FaHome className="text-2xl" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Админ-Панель ОКУРМЭН
              </h1>
              <p className="text-sm text-gray-600">Полное управление платформой</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800">Администратор</p>
              <p className="text-xs text-gray-600">isabekoveldat@gmail.com</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FaSignOutAlt className="text-xl" />
              <span className="font-semibold">Выйти</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Обзор', icon: FaChartLine },
              { id: 'users', label: 'Пользователи', icon: FaUsers },
              { id: 'courses', label: 'Курсы', icon: FaBook },
              { id: 'payments', label: 'Платежи', icon: FaMoneyBillWave },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-4 border-b-2 transition-colors font-semibold ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-purple-600'
                }`}
              >
                <tab.icon className="text-lg" />
                <span>{tab.label}</span>
                {tab.id === 'payments' && stats.pendingPayments > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {stats.pendingPayments}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Grid with Professional StatCard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={FaUserGraduate}
                title="Всего студентов"
                value={stats.totalStudents}
                suffix=""
                trend="up"
                trendValue="12"
                color="blue"
                delay={0}
              />
              
              <StatCard
                icon={FaChalkboardTeacher}
                title="Преподавателей"
                value={stats.totalTeachers}
                suffix=""
                trend="up"
                trendValue="5"
                color="purple"
                delay={0.1}
              />
              
              <StatCard
                icon={FaBook}
                title="Активных курсов"
                value={stats.totalCourses}
                suffix=""
                color="green"
                delay={0.2}
              />
              
              <StatCard
                icon={FaMoneyBillWave}
                title="Общий доход"
                value={parseInt(stats.totalRevenue.replace(/\s/g, ''))}
                suffix=" сом"
                trend="up"
                trendValue="8"
                color="orange"
                delay={0.3}
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <SimpleChart
                title="Студенты по месяцам"
                data={[
                  { label: 'Янв', value: 120 },
                  { label: 'Фев', value: 150 },
                  { label: 'Мар', value: 180 },
                  { label: 'Апр', value: 200 },
                  { label: 'Май', value: 165 },
                  { label: 'Июн', value: 195 },
                ]}
                color="orange"
              />
              
              <SimpleChart
                title="Доход по месяцам (тыс. сом)"
                data={[
                  { label: 'Янв', value: 450 },
                  { label: 'Фев', value: 520 },
                  { label: 'Мар', value: 480 },
                  { label: 'Апр', value: 600 },
                  { label: 'Май', value: 580 },
                  { label: 'Июн', value: 650 },
                ]}
                color="green"
              />
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Ожидающие платежи</h3>
                  <FaClock className="text-3xl text-yellow-500" />
                </div>
                <p className="text-4xl font-bold text-yellow-600">{stats.pendingPayments}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Требуют подтверждения</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Новые пользователи</h3>
                  <FaUsers className="text-3xl text-blue-500" />
                </div>
                <p className="text-4xl font-bold text-blue-600">{recentUsers.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">За последние 7 дней</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Популярные курсы</h3>
                  <FaChartLine className="text-3xl text-green-500" />
                </div>
                <p className="text-4xl font-bold text-green-600">{courses.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Всего доступно</p>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Users */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Последние пользователи</h3>
                  <button 
                    onClick={() => setActiveTab('users')}
                    className="text-sm text-purple-600 hover:text-purple-700 font-semibold"
                  >
                    Смотреть все →
                  </button>
                </div>
                <div className="space-y-3">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'teacher' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {user.role === 'teacher' ? 'Преподаватель' : 'Студент'}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{user.joined}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Payments */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Последние платежи</h3>
                  <button 
                    onClick={() => setActiveTab('payments')}
                    className="text-sm text-purple-600 hover:text-purple-700 font-semibold"
                  >
                    Смотреть все →
                  </button>
                </div>
                <div className="space-y-3">
                  {payments.slice(-5).reverse().map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-semibold text-gray-800">{payment.student}</p>
                        <p className="text-sm text-gray-600">{payment.course}</p>
                        <p className="text-xs text-gray-500 mt-1">{payment.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600 text-lg">{payment.amount} ₽</p>
                        <span className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                          payment.status === 'completed' ? 'bg-green-100 text-green-700' : 
                          payment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {payment.status === 'completed' ? 'Оплачено' : 
                           payment.status === 'pending' ? 'Ожидание' : 'Отклонено'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            {/* Filters and Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1 w-full md:w-auto">
                  <input
                    type="text"
                    placeholder="Поиск по имени или email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-3">
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">Все роли</option>
                    <option value="student">Студенты</option>
                    <option value="teacher">Преподаватели</option>
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">Все статусы</option>
                    <option value="active">Активные</option>
                    <option value="blocked">Заблокированные</option>
                  </select>
                  <button
                    onClick={() => openModal('addUser')}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-shadow"
                  >
                    <FaPlus />
                    <span>Добавить</span>
                  </button>
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
                <span>Найдено: <strong>{filteredUsers.length}</strong></span>
                <span>•</span>
                <span>Студенты: <strong>{filteredUsers.filter(u => u.role === 'student').length}</strong></span>
                <span>•</span>
                <span>Преподаватели: <strong>{filteredUsers.filter(u => u.role === 'teacher').length}</strong></span>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Пользователь</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Контакты</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Роль</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Статус</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Дата регистрации</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Последняя активность</th>
                      <th className="text-right py-4 px-6 font-semibold text-gray-700">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => (
                      <motion.tr 
                        key={user.id} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">{user.name}</p>
                              <p className="text-sm text-gray-500">ID: {user.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-sm text-gray-800 flex items-center">
                            <FaEnvelope className="mr-2 text-gray-400" />
                            {user.email}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center mt-1">
                            <FaPhone className="mr-2 text-gray-400" />
                            {user.phone}
                          </p>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === 'teacher' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {user.role === 'teacher' ? 'Преподаватель' : 'Студент'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button
                            onClick={() => handleToggleUserStatus(user.id)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                              user.status === 'active' 
                                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                            }`}
                          >
                            {user.status === 'active' ? 'Активен' : 'Заблокирован'}
                          </button>
                        </td>
                        <td className="py-4 px-6 text-gray-600 text-sm">
                          <FaCalendar className="inline mr-2 text-gray-400" />
                          {user.joined}
                        </td>
                        <td className="py-4 px-6 text-gray-600 text-sm">
                          <FaClock className="inline mr-2 text-gray-400" />
                          {user.lastActive}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => openModal('viewUser', user)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Просмотр"
                            >
                              <FaEye className="text-lg" />
                            </button>
                            <button
                              onClick={() => openModal('editUser', user)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Редактировать"
                            >
                              <FaEdit className="text-lg" />
                            </button>
                            <button
                              onClick={() => openModal('deleteUser', user)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Удалить"
                            >
                              <FaTrash className="text-lg" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div>
            {/* Filters and Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1 w-full md:w-auto">
                  <input
                    type="text"
                    placeholder="Поиск курсов..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => openModal('addCourse')}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-shadow"
                >
                  <FaPlus />
                  <span>Добавить курс</span>
                </button>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Всего курсов: <strong>{filteredCourses.length}</strong>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-xl mb-2 text-gray-800">{course.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                    </div>
                    <button
                      onClick={() => handleToggleCourseStatus(course.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        course.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {course.status === 'active' ? 'Активен' : 'Неактивен'}
                    </button>
                  </div>
                  
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center text-gray-600">
                      <FaUserGraduate className="mr-2 text-blue-500" />
                      <span><strong>{course.students}</strong> студентов</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaChalkboardTeacher className="mr-2 text-purple-500" />
                      <span>{course.teacher}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaClock className="mr-2 text-orange-500" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaDollarSign className="mr-2 text-green-500" />
                      <span className="font-bold text-green-600">{course.price} сом/мес</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaCalendar className="mr-2 text-pink-500" />
                      <span>Старт: {course.startDate}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                      {course.category}
                    </span>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => openModal('editCourse', course)}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      <FaEdit className="mr-2" /> Изменить
                    </button>
                    <button
                      onClick={() => openModal('deleteCourse', course)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div>
            {/* Filters and Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1 w-full md:w-auto">
                  <input
                    type="text"
                    placeholder="Поиск платежей..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleExportPayments}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FaDownload />
                  <span>Экспорт в Excel</span>
                </button>
              </div>
              <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
                <span>Всего: <strong>{filteredPayments.length}</strong></span>
                <span>•</span>
                <span className="text-green-600">Оплачено: <strong>{filteredPayments.filter(p => p.status === 'completed').length}</strong></span>
                <span>•</span>
                <span className="text-yellow-600">Ожидание: <strong>{filteredPayments.filter(p => p.status === 'pending').length}</strong></span>
                <span>•</span>
                <span className="text-red-600">Отклонено: <strong>{filteredPayments.filter(p => p.status === 'rejected').length}</strong></span>
              </div>
            </div>

            {/* Payments Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">ID / Транзакция</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Студент</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Курс</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Сумма</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Метод</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Дата</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">Статус</th>
                      <th className="text-right py-4 px-6 font-semibold text-gray-700">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map((payment, index) => (
                      <motion.tr 
                        key={payment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <p className="font-mono text-sm font-semibold text-gray-800">#{payment.id}</p>
                          <p className="text-xs text-gray-500">{payment.transactionId}</p>
                        </td>
                        <td className="py-4 px-6 font-semibold text-gray-800">{payment.student}</td>
                        <td className="py-4 px-6 text-gray-600">{payment.course}</td>
                        <td className="py-4 px-6">
                          <span className="font-bold text-lg text-green-600">{payment.amount} ₽</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                            {payment.method}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-gray-600 text-sm">
                          <FaCalendar className="inline mr-2 text-gray-400" />
                          {payment.date}
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            payment.status === 'completed' ? 'bg-green-100 text-green-700' : 
                            payment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {payment.status === 'completed' ? 'Оплачено' : 
                             payment.status === 'pending' ? 'Ожидание' : 'Отклонено'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-end space-x-2">
                            {payment.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleConfirmPayment(payment.id)}
                                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  title="Подтвердить"
                                >
                                  <FaCheck className="text-lg" />
                                </button>
                                <button
                                  onClick={() => handleRejectPayment(payment.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Отклонить"
                                >
                                  <FaBan className="text-lg" />
                                </button>
                              </>
                            )}
                            <button
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Детали"
                            >
                              <FaEye className="text-lg" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                  {modalType === 'addUser' && (
                    <>
                      <FaPlus className="mr-2 text-purple-600" />
                      Добавить пользователя
                    </>
                  )}
                  {modalType === 'editUser' && (
                    <>
                      <FaEdit className="mr-2 text-blue-600" />
                      Редактировать пользователя
                    </>
                  )}
                  {modalType === 'deleteUser' && (
                    <>
                      <FaTrash className="mr-2 text-red-600" />
                      Удалить пользователя
                    </>
                  )}
                  {modalType === 'viewUser' && (
                    <>
                      <FaEye className="mr-2 text-green-600" />
                      Информация о пользователе
                    </>
                  )}
                  {modalType === 'addCourse' && (
                    <>
                      <FaPlus className="mr-2 text-purple-600" />
                      Добавить курс
                    </>
                  )}
                  {modalType === 'editCourse' && (
                    <>
                      <FaEdit className="mr-2 text-blue-600" />
                      Редактировать курс
                    </>
                  )}
                  {modalType === 'deleteCourse' && (
                    <>
                      <FaTrash className="mr-2 text-red-600" />
                      Удалить курс
                    </>
                  )}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes className="text-2xl" />
                </button>
              </div>

              {/* View User Modal */}
              {modalType === 'viewUser' && selectedItem && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-3xl">
                      {selectedItem.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-gray-800">{selectedItem.name}</h4>
                      <p className="text-gray-600">{selectedItem.role === 'teacher' ? 'Преподаватель' : 'Студент'}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Email</p>
                      <p className="font-semibold text-gray-800">{selectedItem.email}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Телефон</p>
                      <p className="font-semibold text-gray-800">{selectedItem.phone}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Дата регистрации</p>
                      <p className="font-semibold text-gray-800">{selectedItem.joined}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Последняя активность</p>
                      <p className="font-semibold text-gray-800">{selectedItem.lastActive}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      selectedItem.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {selectedItem.status === 'active' ? 'Активен' : 'Заблокирован'}
                    </span>
                  </div>

                  <button
                    onClick={closeModal}
                    className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-shadow"
                  >
                    Закрыть
                  </button>
                </div>
              )}

              {/* Add/Edit User Form */}
              {(modalType === 'addUser' || modalType === 'editUser') && (
                <form onSubmit={modalType === 'addUser' ? handleAddUser : handleEditUser} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Полное имя *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Иван Иванов"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Телефон *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="+996 XXX XXX XXX"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Роль *</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="student">Студент</option>
                      <option value="teacher">Преподаватель</option>
                    </select>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Отмена
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-shadow"
                    >
                      {modalType === 'addUser' ? 'Добавить' : 'Сохранить'}
                    </button>
                  </div>
                </form>
              )}

              {/* Delete User Confirmation */}
              {modalType === 'deleteUser' && selectedItem && (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaTrash className="text-3xl text-red-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Удалить пользователя?</h4>
                  <p className="text-gray-600 mb-6">
                    Вы действительно хотите удалить <strong>{selectedItem.name}</strong>?<br />
                    Это действие нельзя отменить.
                  </p>
                  <div className="flex space-x-3">
                    <button
                      onClick={closeModal}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Отмена
                    </button>
                    <button
                      onClick={handleDeleteUser}
                      className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              )}

              {/* Add/Edit Course Form */}
              {(modalType === 'addCourse' || modalType === 'editCourse') && (
                <form onSubmit={modalType === 'addCourse' ? handleAddCourse : handleEditCourse} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Название курса *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Frontend Development"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Описание *</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Краткое описание курса"
                      rows="3"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Длительность *</label>
                      <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="6 месяцев"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Цена (сом/мес) *</label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="5000"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Преподаватель *</label>
                      <input
                        type="text"
                        value={formData.teacher}
                        onChange={(e) => setFormData({...formData, teacher: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Иван И."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Категория *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="IT">IT</option>
                        <option value="Языки">Языки</option>
                        <option value="Навыки">Навыки</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Дата старта *</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Отмена
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-shadow"
                    >
                      {modalType === 'addCourse' ? 'Добавить' : 'Сохранить'}
                    </button>
                  </div>
                </form>
              )}

              {/* Delete Course Confirmation */}
              {modalType === 'deleteCourse' && selectedItem && (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaTrash className="text-3xl text-red-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Удалить курс?</h4>
                  <p className="text-gray-600 mb-6">
                    Вы действительно хотите удалить <strong>{selectedItem.name}</strong>?<br />
                    Это действие нельзя отменить.
                  </p>
                  <div className="flex space-x-3">
                    <button
                      onClick={closeModal}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Отмена
                    </button>
                    <button
                      onClick={handleDeleteCourse}
                      className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdminDashboard;
