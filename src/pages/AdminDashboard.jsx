import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaUsers, FaBook, FaChartLine, FaSignOutAlt, FaHome, 
  FaUserGraduate, FaChalkboardTeacher, FaMoneyBillWave, 
  FaTimes, FaEdit, FaTrash, FaPlus, FaCheck, FaBan,
  FaEnvelope, FaPhone, FaClock, FaCalendar, FaBell,
  FaGraduationCap, FaSearch, FaFilter, FaDownload
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { signOutUser } from '../services/firebase';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('башкы');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  
  const [currentDate] = useState(new Date().toLocaleDateString('kg-KG', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }));

  // Sample data
  const [stats] = useState({
    студенттер: 3247,
    мугалимдер: 45,
    курстар: 23,
    киреше: 2450000
  });

  const [окуучулар, setОкуучулар] = useState([
    { id: 1, аты: 'Айбек Мамедов', email: 'aibek@mail.ru', телефон: '+996 555 123 456', роль: 'студент', статус: 'активдүү', күн: '15.01.2024' },
    { id: 2, аты: 'Асель Бекова', email: 'asel@mail.ru', телефон: '+996 555 234 567', роль: 'студент', статус: 'активдүү', күн: '14.01.2024' },
    { id: 3, аты: 'Нурбек Кадыров', email: 'nurbek@mail.ru', телефон: '+996 555 345 678', роль: 'мугалим', статус: 'активдүү', күн: '10.01.2024' },
    { id: 4, аты: 'Гүлнара Сыдыкова', email: 'gulnara@mail.ru', телефон: '+996 555 456 789', роль: 'студент', статус: 'активдүү', күн: '12.01.2024' },
  ]);

  const [курстар, setКурстар] = useState([
    { id: 1, аталышы: 'Frontend Иштеп чыгуу', сүрөттөмө: 'React, JavaScript, HTML/CSS', мөөнөтү: '6 ай', студенттер: 45, баасы: '5000 сом' },
    { id: 2, аталышы: 'Backend Иштеп чыгуу', сүрөттөмө: 'Node.js, Python, Databases', мөөнөтү: '6 ай', студенттер: 38, баасы: '5000 сом' },
    { id: 3, аталышы: 'Англис тили', сүрөттөмө: 'Башталгычтан advanced деңгээлге чейин', мөөнөтү: '8 ай', студенттер: 52, баасы: '3000 сом' },
  ]);

  const [төлөмдөр] = useState([
    { id: 1, студент: 'Айбек М.', курс: 'Frontend', сумма: '5000', күн: '15.01.2024', статус: 'төлөнгөн' },
    { id: 2, студент: 'Асель Б.', курс: 'Backend', сумма: '5000', күн: '14.01.2024', статус: 'күтүүдө' },
    { id: 3, студент: 'Гүлнара С.', курс: 'Англис тили', сумма: '3000', күн: '16.01.2024', статус: 'төлөнгөн' },
  ]);

  // Окуруу панельге кирүү тексерүүсү
  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const adminEmail = 'isabekoveldat@gmail.com';
    
    if (!isAuthenticated || userEmail !== adminEmail) {
      alert('Сизде админ панелге кирүү укугу жок!');
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = async () => {
    await signOutUser();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Жогорку Панель */}
      <header className="bg-gradient-to-r from-orange-500 to-orange-600 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Лого жана ат */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-white hover:text-orange-200 transition-colors" title="Башкы бетке">
                <FaHome className="text-3xl" />
              </Link>
              <div>
                <div className="flex items-center space-x-3">
                  <FaGraduationCap className="text-4xl text-white" />
                  <div>
                    <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                      ОКУРМЭН
                    </h1>
                    <p className="text-orange-100 text-sm">Админ Башкаруу Панели</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Күн жана чыгуу */}
            <div className="flex items-center space-x-6">
              <div className="text-right hidden md:block">
                <p className="text-white font-semibold flex items-center">
                  <FaCalendar className="mr-2" />
                  {currentDate}
                </p>
                <p className="text-orange-100 text-sm">Администратор</p>
              </div>
              
              <button className="relative text-white hover:text-orange-200 transition-colors">
                <FaBell className="text-2xl" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-6 py-3 bg-white text-orange-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <FaSignOutAlt className="text-xl" />
                <span>Чыгуу</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Кош келиңиз баннери */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative z-10">
            <p className="text-orange-100 text-sm mb-2">📅 {currentDate}</p>
            <h2 className="text-4xl font-bold text-white mb-3">Кош келиңиз, Администратор!</h2>
            <p className="text-orange-50 text-lg">Студент порталында дайыма жаңыланып туруңуз</p>
          </div>
        </motion.div>
      </div>

      {/* Навигация */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg p-2 flex space-x-2">
          {[
            { id: 'башкы', label: 'Башкы бет', icon: FaChartLine },
            { id: 'окуучулар', label: 'Окуучулар', icon: FaUsers },
            { id: 'курстар', label: 'Курстар', icon: FaBook },
            { id: 'төлөмдөр', label: 'Төлөмдөр', icon: FaMoneyBillWave },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 rounded-xl transition-all font-semibold ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:bg-orange-50'
              }`}
            >
              <tab.icon className="text-xl" />
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Контент */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* БАШКЫ БЕТ */}
        {activeTab === 'башкы' && (
          <div>
            {/* Статистика карточкалары */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <FaUserGraduate className="text-5xl opacity-80" />
                  <div className="text-right">
                    <p className="text-blue-100 text-sm">Бардыгы</p>
                    <p className="text-4xl font-bold">{stats.студенттер}</p>
                  </div>
                </div>
                <p className="text-xl font-semibold">Студенттер</p>
                <p className="text-blue-100 text-sm mt-2">↑ 12% өсүү</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <FaChalkboardTeacher className="text-5xl opacity-80" />
                  <div className="text-right">
                    <p className="text-purple-100 text-sm">Бардыгы</p>
                    <p className="text-4xl font-bold">{stats.мугалимдер}</p>
                  </div>
                </div>
                <p className="text-xl font-semibold">Мугалимдер</p>
                <p className="text-purple-100 text-sm mt-2">↑ 5% өсүү</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <FaBook className="text-5xl opacity-80" />
                  <div className="text-right">
                    <p className="text-green-100 text-sm">Активдүү</p>
                    <p className="text-4xl font-bold">{stats.курстар}</p>
                  </div>
                </div>
                <p className="text-xl font-semibold">Курстар</p>
                <p className="text-green-100 text-sm mt-2">Иштеп жатат</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <FaMoneyBillWave className="text-5xl opacity-80" />
                  <div className="text-right">
                    <p className="text-orange-100 text-sm">Жалпы</p>
                    <p className="text-4xl font-bold">{(stats.киреше / 1000).toFixed(0)}K</p>
                  </div>
                </div>
                <p className="text-xl font-semibold">Киреше</p>
                <p className="text-orange-100 text-sm mt-2">↑ 8% өсүү</p>
              </motion.div>
            </div>

            {/* Соңку иш-аракеттер */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Жаңы окуучулар */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Жаңы окуучулар</h3>
                  <button className="text-orange-600 hover:text-orange-700 font-semibold">
                    Баарын көрүү →
                  </button>
                </div>
                <div className="space-y-4">
                  {окуучулар.slice(0, 4).map((окуучу) => (
                    <motion.div
                      key={окуучу.id}
                      whileHover={{ x: 10 }}
                      className="flex items-center space-x-4 p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors cursor-pointer"
                    >
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {окуучу.аты.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-800">{окуучу.аты}</p>
                        <p className="text-sm text-gray-600">{окуучу.email}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          окуучу.роль === 'мугалим' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {окуучу.роль === 'мугалим' ? 'Мугалим' : 'Студент'}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{окуучу.күн}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Соңку төлөмдөр */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Соңку төлөмдөр</h3>
                  <button className="text-orange-600 hover:text-orange-700 font-semibold">
                    Баарын көрүү →
                  </button>
                </div>
                <div className="space-y-4">
                  {төлөмдөр.map((төлөм) => (
                    <motion.div
                      key={төлөм.id}
                      whileHover={{ x: 10 }}
                      className="flex items-center justify-between p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors cursor-pointer"
                    >
                      <div className="flex-1">
                        <p className="font-bold text-gray-800">{төлөм.студент}</p>
                        <p className="text-sm text-gray-600">{төлөм.курс}</p>
                        <p className="text-xs text-gray-500 mt-1">{төлөм.күн}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600 text-xl">{төлөм.сумма} ₽</p>
                        <span className={`text-xs px-3 py-1 rounded-full inline-block mt-1 ${
                          төлөм.статус === 'төлөнгөн' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {төлөм.статус === 'төлөнгөн' ? '✓ Төлөнгөн' : '⏱ Күтүүдө'}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ОКУУЧУЛАР */}
        {activeTab === 'окуучулар' && (
          <div>
            {/* Издөө жана кошуу */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1 w-full relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    placeholder="Аты боюнча издөө..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                  />
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center space-x-2 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                    <FaFilter />
                    <span>Фильтр</span>
                  </button>
                  <button
                    onClick={() => setShowUserModal(true)}
                    className="flex items-center space-x-2 px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:shadow-lg transition-all"
                  >
                    <FaPlus />
                    <span>Кошуу</span>
                  </button>
                </div>
              </div>
              <p className="mt-4 text-gray-600">Табылды: <strong>{окуучулар.length}</strong> окуучу</p>
            </div>

            {/* Окуучулар тизмеси */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-lg">Окуучу</th>
                    <th className="text-left py-4 px-6 font-semibold text-lg">Байланыш</th>
                    <th className="text-left py-4 px-6 font-semibold text-lg">Роль</th>
                    <th className="text-left py-4 px-6 font-semibold text-lg">Статус</th>
                    <th className="text-right py-4 px-6 font-semibold text-lg">Аракеттер</th>
                  </tr>
                </thead>
                <tbody>
                  {окуучулар.map((окуучу, index) => (
                    <motion.tr
                      key={окуучу.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b hover:bg-orange-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                            {окуучу.аты.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 text-lg">{окуучу.аты}</p>
                            <p className="text-sm text-gray-500">ID: {окуучу.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-gray-800 flex items-center mb-1">
                          <FaEnvelope className="mr-2 text-gray-400" />
                          {окуучу.email}
                        </p>
                        <p className="text-gray-600 flex items-center">
                          <FaPhone className="mr-2 text-gray-400" />
                          {окуучу.телефон}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          окуучу.роль === 'мугалим' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {окуучу.роль === 'мугалим' ? '👨‍🏫 Мугалим' : '👨‍🎓 Студент'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                          ✓ Активдүү
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="p-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                            <FaEdit />
                          </button>
                          <button className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* КУРСТАР */}
        {activeTab === 'курстар' && (
          <div>
            {/* Издөө жана кошуу */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1 w-full relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    placeholder="Курс издөө..."
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                  />
                </div>
                <button
                  onClick={() => setShowCourseModal(true)}
                  className="flex items-center space-x-2 px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  <FaPlus />
                  <span>Жаңы курс</span>
                </button>
              </div>
            </div>

            {/* Курстар тизмеси */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {курстар.map((курс, index) => (
                <motion.div
                  key={курс.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all"
                >
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
                    <div className="flex items-center justify-between text-white mb-4">
                      <FaBook className="text-4xl opacity-80" />
                      <span className="bg-white text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                        {курс.студенттер} студент
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{курс.аталышы}</h3>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{курс.сүрөттөмө}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-700">
                        <FaClock className="mr-3 text-orange-500" />
                        <span>{курс.мөөнөтү}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <FaMoneyBillWave className="mr-3 text-orange-500" />
                        <span className="font-bold">{курс.баасы}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 py-3 bg-orange-100 text-orange-600 rounded-xl font-semibold hover:bg-orange-200 transition-colors">
                        <FaEdit className="inline mr-2" />
                        Өзгөртүү
                      </button>
                      <button className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ТӨЛӨМДӨР */}
        {activeTab === 'төлөмдөр' && (
          <div>
            {/* Фильтр жана экспорт */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800">Төлөм тарыхы</h3>
                <button className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
                  <FaDownload />
                  <span>Экспорт</span>
                </button>
              </div>
            </div>

            {/* Төлөмдөр тизмеси */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-lg">Студент</th>
                    <th className="text-left py-4 px-6 font-semibold text-lg">Курс</th>
                    <th className="text-left py-4 px-6 font-semibold text-lg">Сумма</th>
                    <th className="text-left py-4 px-6 font-semibold text-lg">Күн</th>
                    <th className="text-left py-4 px-6 font-semibold text-lg">Статус</th>
                    <th className="text-right py-4 px-6 font-semibold text-lg">Аракеттер</th>
                  </tr>
                </thead>
                <tbody>
                  {төлөмдөр.map((төлөм, index) => (
                    <motion.tr
                      key={төлөм.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b hover:bg-orange-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <p className="font-bold text-gray-800 text-lg">{төлөм.студент}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-gray-700">{төлөм.курс}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-bold text-green-600 text-xl">{төлөм.сумма} ₽</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-gray-600">{төлөм.күн}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          төлөм.статус === 'төлөнгөн' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {төлөм.статус === 'төлөнгөн' ? '✓ Төлөнгөн' : '⏱ Күтүүдө'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end space-x-2">
                          {төлөм.статус === 'күтүүдө' && (
                            <>
                              <button className="p-3 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                                <FaCheck />
                              </button>
                              <button className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                                <FaBan />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
