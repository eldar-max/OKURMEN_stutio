import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLock, FaUser, FaEye, FaEyeSlash, FaArrowLeft, FaGoogle, FaGithub, FaTimes, FaEnvelope } from 'react-icons/fa';
import { signInWithGoogle, signInWithGithub, resetPassword, signInWithEmail } from '../services/firebase';
import logo from '../assets/5309874850258165398_121.jpg';
import Loader from '../components/Loader';
import { generateAndSendAdminCode } from '../services/adminCode';
import { useLanguage } from '../context/LanguageContext';

function Login() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  
  // Forgot Password Modal
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState('');

  const handleGoogleSignIn = async () => {
    await handleOAuthSignIn(signInWithGoogle, setGoogleLoading, 'Google');
  };

  const handleGithubSignIn = async () => {
    await handleOAuthSignIn(signInWithGithub, setGithubLoading, 'GitHub');
  };

  const handleOAuthSignIn = async (signInMethod, setLoadingState, providerName) => {
    setError('');
    setLoadingState(true);

    try {
      const { user, userData } = await signInMethod();
      
      // Сохраняем данные в localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', userData?.role || 'student');
      localStorage.setItem('username', user.displayName || user.email);
      localStorage.setItem('userId', user.uid);
      localStorage.setItem('userFullName', user.displayName || '');
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userPhoto', user.photoURL || '');

      // Отправляем событие для обновления Navbar
      window.dispatchEvent(new Event('authChange'));

      // Проверяем админский email
      const adminEmail = 'isabekoveldat@gmail.com';
      
      if (user.email === adminEmail) {
        // Генерируем и отправляем код в Telegram (БЕЗ показа)
        await generateAndSendAdminCode(
          user.email, 
          user.displayName || 'Администратор'
        );
        
        // Сохраняем email для страницы подтверждения
        localStorage.setItem('pendingAdminEmail', user.email);
        
        // Перенаправляем на страницу подтверждения
        navigate('/admin-verification');
      } else {
        // Иначе перенаправляем в зависимости от роли
        const role = userData?.role || 'student';
        if (role === 'student') {
          navigate('/student');
        } else if (role === 'teacher') {
          navigate('/teacher');
        }
      }
    } catch (err) {
      console.error(`${providerName} login error:`, err);
      
      // Проверяем специфичные ошибки
      if (err.message && err.message.includes('email')) {
        setError(err.message);
      } else if (err.code === 'auth/popup-closed-by-user') {
        setError(t('loginCancelled') || 'Кириш жокко чыгарылды / Вход отменён / Login cancelled');
      } else if (err.code === 'auth/cancelled-popup-request') {
        // Просто игнорируем эту ошибку (множественные клики)
        return;
      } else {
        setError(`${providerName} ${t('loginError') || 'login error'}: ${err.message}`);
      }
    } finally {
      setLoadingState(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetError('');
    setResetSuccess(false);
    setResetLoading(true);

    try {
      await resetPassword(resetEmail);
      setResetSuccess(true);
      setResetEmail('');
    } catch (err) {
      setResetError(err.message);
    } finally {
      setResetLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Сначала проверяем LocalStorage (для старых пользователей)
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const localUser = users.find(u => u.username === formData.username && u.password === formData.password);

      if (localUser) {
        // Вход через LocalStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', localUser.role);
        localStorage.setItem('username', localUser.username);
        localStorage.setItem('userId', localUser.id);
        localStorage.setItem('userFullName', localUser.fullName);
        
        // Отправляем событие для обновления Navbar
        window.dispatchEvent(new Event('authChange'));
        
        if (localUser.role === 'student') {
          navigate('/student');
        } else if (localUser.role === 'teacher') {
          navigate('/teacher');
        }
      } else {
        // Пробуем войти через Firebase (для пользователей с Google/GitHub OAuth и сброшенным паролем)
        try {
          const { user, userData } = await signInWithEmail(formData.username, formData.password);
          
          // Сохраняем данные в localStorage
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userRole', userData?.role || 'student');
          localStorage.setItem('username', user.displayName || user.email);
          localStorage.setItem('userId', user.uid);
          localStorage.setItem('userFullName', user.displayName || '');
          localStorage.setItem('userEmail', user.email);
          localStorage.setItem('userPhoto', user.photoURL || '');

          // Отправляем событие для обновления Navbar
          window.dispatchEvent(new Event('authChange'));

          // Перенаправляем в зависимости от роли
          const role = userData?.role || 'student';
          if (role === 'student') {
            navigate('/student');
          } else if (role === 'teacher') {
            navigate('/teacher');
          }
        } catch (firebaseError) {
          // Если и Firebase не сработал - показываем ошибку
          setError(t('invalidCredentials'));
        }
      }
    } catch (err) {
      setError(t('invalidCredentials'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
            <img src={logo} alt="OKURMEN" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">{t('loginTitle')}</h1>
          <p className="text-gray-600 mt-2">{t('loginSubtitle')}</p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username/Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t('usernameOrEmail')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="username или email@example.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t('password')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                ) : (
                  <FaEye className="text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <span className="ml-2 text-sm text-gray-700">{t('rememberMe')}</span>
            </label>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setShowForgotPasswordModal(true); }}
              className="text-sm text-orange-600 hover:text-orange-700"
            >
              {t('forgotPassword')}
            </a>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center space-x-2">
                <Loader size="sm" />
                <span>{t('loggingIn')}</span>
              </span>
            ) : (
              t('loginButton')
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-600">{t('or')}</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3">
          {/* Google Sign In */}
          <motion.button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold shadow-md hover:shadow-lg transition-shadow flex items-center justify-center space-x-2 ${
              googleLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <FaGoogle className="text-red-500 text-xl" />
            <span>{googleLoading ? (
              <span className="flex items-center space-x-2">
                <Loader size="sm" />
                <span>{t('loggingIn')}</span>
              </span>
            ) : (
              t('loginWithGoogle')
            )}</span>
          </motion.button>

          {/* GitHub Sign In */}
          <motion.button
            type="button"
            onClick={handleGithubSignIn}
            disabled={githubLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 bg-gray-800 text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:bg-gray-900 transition-all flex items-center justify-center space-x-2 ${
              githubLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <FaGithub className="text-white text-xl" />
            <span>{githubLoading ? (
              <span className="flex items-center space-x-2">
                <Loader size="sm" />
                <span>{t('loggingIn')}</span>
              </span>
            ) : (
              'Continue with GitHub'
            )}</span>
          </motion.button>
        </div>

        {/* Link to Registration */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {t('noAccount')}{' '}
            <Link to="/registration" className="text-orange-600 hover:text-orange-700 font-semibold">
              {t('registerNow')}
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-4 text-center">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800"
          >
            <FaArrowLeft className="mr-2" />
            {t('backToHome')}
          </Link>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => {
              setShowForgotPasswordModal(false);
              setResetSuccess(false);
              setResetError('');
              setResetEmail('');
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">{t('resetPassword')}</h3>
                <button
                  onClick={() => {
                    setShowForgotPasswordModal(false);
                    setResetSuccess(false);
                    setResetError('');
                    setResetEmail('');
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="text-2xl" />
                </button>
              </div>

              {resetSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-6"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{t('emailSent')}</h4>
                  <p className="text-gray-600 mb-6">
                    {t('checkEmail')}
                  </p>
                  <button
                    onClick={() => {
                      setShowForgotPasswordModal(false);
                      setResetSuccess(false);
                      setResetEmail('');
                    }}
                    className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition-shadow"
                  >
                    {t('close')}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleForgotPassword}>
                  <p className="text-gray-600 mb-6">
                    {t('enterEmailForReset')}
                  </p>

                  {resetError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4"
                    >
                      {resetError}
                    </motion.div>
                  )}

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('emailAddress')}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="example@mail.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForgotPasswordModal(false);
                        setResetError('');
                        setResetEmail('');
                      }}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {t('cancel')}
                    </button>
                    <button
                      type="submit"
                      disabled={resetLoading}
                      className={`flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition-shadow ${
                        resetLoading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {resetLoading ? t('sending') : t('send')}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Login;
