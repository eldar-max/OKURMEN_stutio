import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaCrown, FaMoon, FaSun } from 'react-icons/fa';
import { signOutUser } from '../services/firebase';
import WinkingLogo from './WinkingLogo';
import { useTheme } from '../context/ThemeContext';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWinking, setIsWinking] = useState(false);

  const handleLogoClick = () => {
    setIsWinking(true);
    setTimeout(() => {
      setIsWinking(false);
      navigate('/'); // Переход на главную страницу
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Прокрутка наверх
    }, 400); // После анимации
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Проверяем авторизацию
    const checkAuth = () => {
      const auth = localStorage.getItem('isAuthenticated') === 'true';
      const user = localStorage.getItem('username') || '';
      const email = localStorage.getItem('userEmail') || '';
      const photo = localStorage.getItem('userPhoto') || '';
      let role = localStorage.getItem('userRole') || '';
      
      // Проверяем, если это админ
      const adminEmail = 'isabekoveldat@gmail.com';
      if (email === adminEmail) {
        role = 'admin';
      }
      
      setIsAuthenticated(auth);
      setUsername(user);
      setUserRole(role);
      setUserPhoto(photo);
    };

    checkAuth();

    // Слушаем изменения в localStorage (для обновления после логина/логаута)
    window.addEventListener('storage', checkAuth);
    // Слушаем кастомное событие authChange (для обновления в том же табе)
    window.addEventListener('authChange', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    signOutUser();
    setIsAuthenticated(false);
    setShowDropdown(false);
    window.location.href = '/';
  };

  const handleProfileClick = () => {
    if (userRole === 'admin') {
      navigate('/admin');
    } else if (userRole === 'student') {
      navigate('/student');
    } else if (userRole === 'teacher') {
      navigate('/teacher');
    }
  };

  // Получить имя пользователя
  const getUsername = () => {
    const user = localStorage.getItem('username') || '';
    const email = localStorage.getItem('userEmail') || '';
    
    // Если имя - это email, обрезаем его
    if (user.includes('@') && user.length > 20) {
      return user.substring(0, 17) + '...';
    }
    
    return user;
  };

  const menuItems = [
    { name: t('about'), href: '#about' },
    { name: t('courses'), href: '#courses' },
    { name: t('teamTitle'), href: '#team' },
    { name: t('students'), href: '#students' },
    { name: t('testimonialsTitle'), href: '#testimonials' },
    { name: t('contacts'), href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/20 dark:border-gray-700/20'
          : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <WinkingLogo isWinking={isWinking} onClick={handleLogoClick} />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
              ОКУРМЭН
            </span>
          </motion.div>

          {/* Desktop Menu - Center */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-800 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium whitespace-nowrap"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA Button - Right */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* Theme Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-1.5 lg:p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <FaMoon className="text-base lg:text-xl text-gray-700 dark:text-gray-300" />
              ) : (
                <FaSun className="text-base lg:text-xl text-yellow-500" />
              )}
            </motion.button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                    userRole === 'admin' 
                      ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white hover:shadow-lg' 
                      : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {/* User Avatar or Initial */}
                  {userPhoto ? (
                    <img 
                      src={userPhoto} 
                      alt={username}
                      className="w-8 h-8 rounded-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      userRole === 'admin' 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gradient-to-br from-orange-600 to-orange-700 text-white'
                    }`}
                    style={{ display: userPhoto ? 'none' : 'flex' }}
                  >
                    {userRole === 'admin' ? <FaCrown /> : username.charAt(0).toUpperCase()}
                  </div>
                  <span className={`font-semibold ${userRole === 'admin' ? 'text-white' : 'text-gray-800 dark:text-white'}`}>
                    {getUsername()}
                  </span>
                </button>

                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <p className="font-semibold text-gray-800 dark:text-white truncate" title={username}>
                        {username}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center mt-1">
                        {userRole === 'admin' ? (
                          <>
                            <FaCrown className="mr-1 text-orange-600" />
                            Администратор
                          </>
                        ) : userRole === 'teacher' ? (
                          'Преподаватель'
                        ) : (
                          'Студент'
                        )}
                      </p>
                    </div>
                    <button
                      onClick={handleProfileClick}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 text-gray-700 dark:text-gray-300"
                    >
                      {userRole === 'admin' ? <FaCrown className="text-orange-600" /> : <FaUserCircle className="text-gray-600 dark:text-gray-400" />}
                      <span>{userRole === 'admin' ? 'Админ-панель' : 'Мой кабинет'}</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center space-x-2"
                    >
                      <FaSignOutAlt />
                      <span>Выйти</span>
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <>
                <motion.a
                  href="/login"
                  whileHover={{ scale: 1.05, color: "#ea580c" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 font-semibold transition-colors"
                >
                  {t('login')}
                </motion.a>
                <motion.a
                  href="/registration"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(249, 115, 22, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
                >
                  <span className="relative z-10">{t('register')}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </motion.a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-gray-800 transition-all ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-full h-0.5 bg-gray-800 transition-all ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-full h-0.5 bg-gray-800 transition-all ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 bg-white dark:bg-gray-800 rounded-b-2xl shadow-lg"
          >
            <div className="space-y-2 px-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors font-medium py-3 px-4 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              {isAuthenticated ? (
                <>
                  <div className="border-t border-gray-200 my-2 pt-2">
                    <div className="px-4 py-2">
                      <p className="font-semibold text-gray-800">{username}</p>
                      <p className="text-xs text-gray-600 flex items-center mt-1">
                        {userRole === 'admin' ? (
                          <>
                            <FaCrown className="mr-1 text-orange-600" />
                            Администратор
                          </>
                        ) : userRole === 'teacher' ? (
                          'Преподаватель'
                        ) : (
                          'Студент'
                        )}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleProfileClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-lg flex items-center space-x-2"
                  >
                    {userRole === 'admin' ? <FaCrown className="text-orange-600" /> : <FaUserCircle className="text-gray-600" />}
                    <span>{userRole === 'admin' ? 'Админ-панель' : 'Мой кабинет'}</span>
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 rounded-lg flex items-center space-x-2"
                  >
                    <FaSignOutAlt />
                    <span>Выйти</span>
                  </button>
                </>
              ) : (
                <div className="border-t border-gray-200 my-2 pt-2 space-y-2">
                  <a
                    href="/login"
                    className="block text-center py-3 px-4 text-gray-700 hover:bg-gray-100 font-semibold rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Войти
                  </a>
                  <a
                    href="/registration"
                    className="block text-center py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold shadow-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Регистрация
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

export default Navbar;
