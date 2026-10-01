import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock, FaCheckCircle, FaArrowLeft, FaTelegram } from 'react-icons/fa';
import { verifyAdminCode, clearAdminCode } from '../services/adminCode';
import logo from '../assets/logo.svg';
import Loader from '../components/Loader';

function AdminVerification() {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [adminEmail, setAdminEmail] = useState('');

  useEffect(() => {
    // Проверяем что есть сохраненный email админа
    const email = localStorage.getItem('pendingAdminEmail');
    if (!email) {
      navigate('/login');
      return;
    }
    setAdminEmail(email);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (verificationCode.length !== 6) {
      setError('Введите 6-значный код');
      return;
    }

    setLoading(true);
    setError('');

    // Проверяем код
    const result = verifyAdminCode(verificationCode);
    
    if (result.valid) {
      // Код верный - разрешаем доступ
      localStorage.setItem('adminVerified', 'true');
      localStorage.removeItem('pendingAdminEmail');
      clearAdminCode();
      
      setTimeout(() => {
        setLoading(false);
        navigate('/admin');
      }, 500);
    } else {
      setLoading(false);
      setError(result.message);
    }
  };

  const handleResendCode = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <img src={logo} alt="OKURMEN" className="w-16 h-16" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">ОКУРМЭН</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Подтверждение администратора</p>
        </div>

        {/* Icon */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaLock className="text-3xl text-white" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
            Код отправлен в Telegram
          </p>
          <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-lg">
            <FaTelegram className="text-blue-500 text-xl" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Проверьте Telegram бот</span>
          </div>
        </div>

        {/* Email */}
        <div className="text-center mb-6 p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
          <p className="text-sm text-gray-600 dark:text-gray-400">Администратор:</p>
          <p className="text-purple-600 dark:text-purple-400 font-semibold">{adminEmail}</p>
        </div>

        {/* Code Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 text-center">
              Введите 6-значный код из Telegram
            </label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => {
                setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                setError('');
              }}
              className={`w-full px-4 py-4 border-2 ${
                error ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
              } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-2xl font-bold tracking-widest bg-white dark:bg-gray-700 text-gray-800 dark:text-white`}
              placeholder="000000"
              maxLength={6}
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={loading || verificationCode.length !== 6}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center space-x-2 ${
              (loading || verificationCode.length !== 6) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <>
                <Loader size="sm" />
                <span>Проверка...</span>
              </>
            ) : (
              <>
                <FaCheckCircle />
                <span>Подтвердить</span>
              </>
            )}
          </motion.button>
        </form>

        {/* Info */}
        <div className="mt-6 text-center">
          {/* Убрали предупреждение о времени */}
        </div>

        {/* Resend Code */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Не получили код?
          </p>
          <button
            onClick={handleResendCode}
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold text-sm"
          >
            Войти заново
          </button>
        </div>

        {/* Back Button */}
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <FaArrowLeft className="mr-2" />
            Вернуться к входу
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default AdminVerification;
