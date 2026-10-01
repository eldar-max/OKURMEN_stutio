import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock, FaUser, FaEye, FaEyeSlash, FaEnvelope, FaPhone, FaArrowLeft, FaUserGraduate, FaChalkboardTeacher, FaGoogle, FaCheckCircle } from 'react-icons/fa';
import { signInWithGoogle } from '../services/firebase';
import logo from '../assets/5309874850258165398_121.jpg';
import Loader from '../components/Loader';
import { useLanguage } from '../context/LanguageContext';

function Registration() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: 'student', // student, teacher
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  
  // Email verification states
  const [step, setStep] = useState(1); // 1: form, 2: verify email
  const [verificationCode, setVerificationCode] = useState('');
  const [sentCode, setSentCode] = useState('');
  const [codeError, setCodeError] = useState('');

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);

    try {
      const { user } = await signInWithGoogle();
      
      // Сохраняем данные в localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'student'); // По умолчанию студент
      localStorage.setItem('username', user.displayName || user.email);
      localStorage.setItem('userId', user.uid);
      localStorage.setItem('userFullName', user.displayName || '');
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userPhoto', user.photoURL || '');

      // Отправляем событие для обновления Navbar
      window.dispatchEvent(new Event('authChange'));

      // Перенаправляем в кабинет студента
      navigate('/student');
    } catch (err) {
      setErrors({ general: t('googleLoginError') + err.message });
      setGoogleLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t('enterFullName');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('enterEmail');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('invalidEmail');
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('enterPhone');
    }

    if (!formData.username.trim()) {
      newErrors.username = t('enterUsername');
    } else if (formData.username.length < 3) {
      newErrors.username = t('usernameMin3');
    }

    if (!formData.password) {
      newErrors.password = t('enterPassword');
    } else if (formData.password.length < 6) {
      newErrors.password = t('passwordMin6');
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('passwordsNotMatch');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Проверка на существующего пользователя
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.username === formData.username)) {
      setErrors({ username: t('userExists') });
      setLoading(false);
      return;
    }

    if (users.find(u => u.email === formData.email)) {
      setErrors({ email: t('emailExists') });
      setLoading(false);
      return;
    }

    // Сохраняем пользователя сразу без кода
    users.push({
      id: Date.now(),
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      username: formData.username,
      password: formData.password,
      role: formData.role,
      emailVerified: true,
      createdAt: new Date().toISOString()
    });

    localStorage.setItem('users', JSON.stringify(users));

    // Входим в систему
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', formData.role);
    localStorage.setItem('username', formData.username);
    localStorage.setItem('userId', users[users.length - 1].id);
    localStorage.setItem('userFullName', formData.fullName);

    setLoading(false);

    // Отправляем событие для обновления Navbar
    window.dispatchEvent(new Event('authChange'));

    // Перенаправляем на нужную страницу
    if (formData.role === 'student') {
      navigate('/student');
    } else if (formData.role === 'teacher') {
      navigate('/teacher');
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 flex items-center justify-center p-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
            <img src={logo} alt="OKURMEN" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">{t('loginTitle')}</h1>
          <p className="text-gray-600 mt-2">
            {t('registerSubtitle')}
          </p>
        </div>

        {/* Registration Form */}
        {step === 1 && (
          <>
            {/* Google Sign In */}
            <motion.button
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold shadow-md hover:shadow-lg transition-shadow flex items-center justify-center space-x-2 mb-6 ${
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
                t('continueWithGoogle')
              )}</span>
            </motion.button>

            {/* Divider */}
            <div className="flex items-center mb-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-600">{t('or')}</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Role Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                {t('selectRole')}
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleChange('role', 'student')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.role === 'student'
                      ? 'border-orange-600 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <FaUserGraduate className={`text-3xl mx-auto mb-2 ${
                    formData.role === 'student' ? 'text-orange-600' : 'text-gray-400'
                  }`} />
                  <div className="font-semibold text-sm">{t('student')}</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('role', 'teacher')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.role === 'teacher'
                      ? 'border-orange-600 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <FaChalkboardTeacher className={`text-3xl mx-auto mb-2 ${
                    formData.role === 'teacher' ? 'text-orange-600' : 'text-gray-400'
                  }`} />
                  <div className="font-semibold text-sm">{t('teacher')}</div>
                </button>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('fullName')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.fullName ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                    placeholder="Иванов Иван Иванович"
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('email')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                    placeholder="example@mail.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('phone')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                    placeholder="+996 XXX XXX XXX"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('username')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleChange('username', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.username ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                    placeholder="username"
                  />
                </div>
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                )}
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
                    onChange={(e) => handleChange('password', e.target.value)}
                    className={`w-full pl-10 pr-12 py-3 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                    placeholder="••••••••"
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
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('confirmPassword')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    className={`w-full pl-10 pr-12 py-3 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FaEye className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
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
                    <span>{t('registering')}</span>
                  </span>
                ) : (
                  t('registerButton')
                )}
              </motion.button>
            </form>

            {/* Link to Login */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t('haveAccount')}{' '}
                <Link to="/login" className="text-orange-600 hover:text-orange-700 font-semibold">
                  {t('loginNow')}
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
          </>
        )}
      </motion.div>
    </div>
  );
}

export default Registration;
