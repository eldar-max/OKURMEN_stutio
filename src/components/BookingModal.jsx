import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaUser, FaPhone, FaEnvelope, FaBook, FaMoneyBillWave, FaCommentDots, FaCreditCard, FaUniversity, FaMoneyBill, FaCalendar } from 'react-icons/fa';
import { sendBookingNotification } from '../services/telegram';
import { useLanguage } from '../context/LanguageContext';

function BookingModal({ isOpen, onClose, selectedCourse }) {
  const { t } = useLanguage();
  const [step, setStep] = useState(1); // 1: Форма, 2: Выбор оплаты, 3: Успех
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    course: selectedCourse || '',
    paymentMethod: '',
    comment: '',
    startDate: '',
    format: 'hybrid',
  });
  const [errors, setErrors] = useState({});

  const courses = [
    { id: 1, name: 'Frontend Development', price: '5000' },
    { id: 2, name: 'React Advanced', price: '5000' },
    { id: 3, name: 'Backend Development', price: '5000' },
    { id: 5, name: 'Оратордук чеберчилик', price: 'Бонус' },
    { id: 6, name: 'Жасалма интеллект (AI)', price: 'Бонус' },
  ];

  const paymentMethods = [
    { id: 'bank', name: t('bankTransfer'), icon: FaUniversity, description: t('bankTransferDesc') },
    { id: 'card', name: t('cardPayment'), icon: FaCreditCard, description: t('cardPaymentDesc') },
    { id: 'cash', name: t('cashPayment'), icon: FaMoneyBill, description: t('cashPaymentDesc') },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t('enterName');
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('enterPhone');
    } else {
      const cleanPhone = formData.phone.replace(/[\s\-\(\)\+]/g, '');
      if (!/^[0-9]{9,15}$/.test(cleanPhone)) {
        newErrors.phone = t('invalidPhoneFormat');
      }
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('invalidEmail');
    }

    if (!formData.course) {
      newErrors.course = t('selectCourseError');
    }

    if (!formData.startDate) {
      newErrors.startDate = t('selectStartDate');
    }

    console.log('📋 Validation errors:', newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('=== BOOKING FORM SUBMIT ===');
    console.log('Form Data:', formData);
    
    if (!validateForm()) {
      console.log('❌ Validation failed:', errors);
      return;
    }

    console.log('✅ Validation passed, moving to step 2');
    setStep(2); // Переход к выбору оплаты
  };

  const handlePaymentSelect = async (method) => {
    setFormData({ ...formData, paymentMethod: method });
    setLoading(true);

    try {
      const selectedCourseData = courses.find(c => c.name === formData.course);
      
      // Отправка в Telegram
      await sendBookingNotification({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email || 'Не указан',
        course: formData.course,
        amount: selectedCourseData?.price || 'Не указано',
        paymentMethod: paymentMethods.find(p => p.id === method)?.name || method,
        comment: formData.comment || 'Нет комментариев',
        startDate: formData.startDate,
        format: formData.format === 'hybrid' ? 'Гибридный' : 'Офлайн группы',
        date: new Date().toLocaleString('ru-RU'),
      });

      setStep(3); // Успех
    } catch (error) {
      console.error('Ошибка отправки:', error);
      alert('Ошибка при отправке заявки. Попробуйте позже или позвоните нам по телефону: +996 XXX XXX XXX');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      course: selectedCourse || '',
      paymentMethod: '',
      comment: '',
      startDate: '',
      format: 'hybrid',
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {step === 1 && 'Забронировать курс'}
                {step === 2 && 'Выберите способ оплаты'}
                {step === 3 && 'Заявка отправлена!'}
              </h3>
              <p className="text-sm text-gray-600 mt-1">Шаг {step} из 3</p>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes className="text-2xl" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    s <= step 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {s}
                  </div>
                  {s < 3 && (
                    <div className={`flex-1 h-1 mx-2 transition-all ${
                      s < step 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                        : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Форма */}
          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Полное имя *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.fullName ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    placeholder="Айбек Мамедов"
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Телефон *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    placeholder="+996 555 123 456 или 0555 123 456"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email (необязательно)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    placeholder="example@mail.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Course Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Выберите курс *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaBook className="text-gray-400" />
                  </div>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.course ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none`}
                  >
                    <option value="">-- Выберите курс --</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.name}>
                        {course.name} ({course.price === 'Бонус' ? 'Бесплатно' : `${course.price} сом/мес`})
                      </option>
                    ))}
                  </select>
                </div>
                {errors.course && (
                  <p className="mt-1 text-sm text-red-600">{errors.course}</p>
                )}
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Дата начала обучения *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendar className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.startDate ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                  />
                </div>
                {errors.startDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
                )}
              </div>

              {/* Format Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Формат обучения
                </label>
                <div className="space-y-2">
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                    <input
                      type="radio"
                      name="format"
                      value="hybrid"
                      checked={formData.format === 'hybrid'}
                      onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                      className="mr-3 text-purple-600 focus:ring-purple-500"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">Гибридный</div>
                      <div className="text-sm text-gray-600">Онлайн + Ментор поддержка</div>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                    <input
                      type="radio"
                      name="format"
                      value="offline"
                      checked={formData.format === 'offline'}
                      onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                      className="mr-3 text-purple-600 focus:ring-purple-500"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">Офлайн группы</div>
                      <div className="text-sm text-gray-600">Очное обучение в классе</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Комментарий (необязательно)
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                    <FaCommentDots className="text-gray-400" />
                  </div>
                  <textarea
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Расскажите о себе или задайте вопросы..."
                    rows="3"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-shadow font-semibold"
                >
                  Продолжить
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Payment Method */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Выбранный курс:</strong> {formData.course}<br />
                  <strong>Дата начала:</strong> {new Date(formData.startDate).toLocaleDateString('ru-RU')}<br />
                  <strong>Формат:</strong> {formData.format === 'hybrid' ? 'Гибридный' : 'Офлайн группы'}
                </p>
              </div>

              <p className="text-gray-600 mb-4 font-semibold">
                Выберите удобный способ оплаты:
              </p>

              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <motion.button
                    key={method.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePaymentSelect(method.id)}
                    disabled={loading}
                    className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-purple-600 hover:bg-purple-50 transition-all text-left flex items-center space-x-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl flex-shrink-0">
                      <method.icon />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-lg">{method.name}</h4>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() => setStep(1)}
                disabled={loading}
                className="w-full mt-6 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50"
              >
                Назад
              </button>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center py-6">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-3xl font-bold text-gray-800 mb-3">Заявка успешно отправлена!</h4>
              <p className="text-gray-600 mb-6 text-lg">
                Мы получили вашу заявку на курс <strong className="text-purple-600">{formData.course}</strong>.<br />
                Наш менеджер свяжется с вами в ближайшее время по номеру<br />
                <strong className="text-gray-800">{formData.phone}</strong>
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6 mb-6 text-left">
                <h5 className="font-bold text-gray-800 mb-3 flex items-center">
                  <FaMoneyBillWave className="mr-2 text-purple-600" />
                  Что дальше?
                </h5>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="font-bold text-purple-600 mr-2">1.</span>
                    <span>Менеджер позвонит вам для подтверждения заявки</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-purple-600 mr-2">2.</span>
                    <span>Вы получите полную информацию об оплате и графике занятий</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-purple-600 mr-2">3.</span>
                    <span>После оплаты - добро пожаловать на обучение! 🎓</span>
                  </li>
                </ol>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleClose}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-shadow font-bold text-lg"
                >
                  Отлично!
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default BookingModal;
