import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaUser, FaPhone, FaEnvelope, FaBook, FaCalendar } from 'react-icons/fa';
import { bookingsAPI, telegramAPI } from '../services/api';

function BookingModal({ isOpen, onClose, selectedCourse }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    course: selectedCourse || '',
    startDate: '',
    format: 'hybrid',
    message: '',
  });
  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Введите имя';
    if (!formData.lastName.trim()) newErrors.lastName = 'Введите фамилию';
    if (!formData.phone.trim()) newErrors.phone = 'Введите телефон';
    if (!formData.email.trim()) newErrors.email = 'Введите email';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Неверный формат email';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.course) newErrors.course = 'Выберите курс';
    if (!formData.startDate) newErrors.startDate = 'Выберите дату';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    try {
      // Найти выбранный курс
      const selectedCourseData = courses.find((c) => c.id === formData.course);

      // Подготовить данные
      const bookingData = {
        ...formData,
        courseName: selectedCourseData?.name,
        coursePrice: selectedCourseData?.price,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      // Отправка на backend
      const response = await bookingsAPI.create(bookingData);
      console.log('Booking created:', response);

      // Отправка в Telegram
      await telegramAPI.sendBooking(bookingData);
      console.log('Telegram notification sent');

      // Показать сообщение об успехе
      alert('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');

      // Закрыть модальное окно
      onClose();

      // Сбросить форму
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        course: '',
        startDate: '',
        format: 'hybrid',
        message: '',
      });
      setStep(1);
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Произошла ошибка. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.');
    }
  };

  const courses = [
    { id: 'frontend', name: 'Frontend Development', price: 5000, duration: '6 месяцев' },
    { id: 'backend', name: 'Backend Development', price: 5000, duration: '6 месяцев' },
    { id: 'uxui', name: 'UX/UI Design', price: 4000, duration: '4 месяца' },
    { id: 'english', name: 'Англис тили', price: 0, duration: 'Flexible' },
    { id: 'speaking', name: 'Оратордук чеберчилик', price: 0, duration: '2 месяца' },
    { id: 'ai', name: 'Жасалма интеллект (AI)', price: 0, duration: '1 месяц' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-3xl flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Записаться на курс</h2>
                <p className="text-sm text-blue-100 mt-1">Шаг {step} из 3</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="px-6 pt-4">
              <div className="flex items-center justify-between mb-2">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`flex items-center ${s < 3 ? 'flex-1' : ''}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        s <= step
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {s}
                    </div>
                    {s < 3 && (
                      <div
                        className={`flex-1 h-1 mx-2 ${
                          s < step ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6">
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold mb-4">Личная информация</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Имя *</label>
                      <div className="relative">
                        <FaUser className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                            errors.firstName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Айбек"
                        />
                      </div>
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Фамилия *</label>
                      <div className="relative">
                        <FaUser className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                            errors.lastName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Осмонов"
                        />
                      </div>
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Телефон *</label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+996 555 123 456"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Email *</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="aibek@example.com"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Course Selection */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold mb-4">Выберите курс</h3>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Курс *</label>
                    <div className="relative">
                      <FaBook className="absolute left-3 top-3 text-gray-400" />
                      <select
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          errors.course ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Выберите курс</option>
                        {courses.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.name} - {course.price === 0 ? 'Бесплатно' : `${course.price} сом/мес`}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course}</p>}
                  </div>

                  {/* Course Details */}
                  {formData.course && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      {(() => {
                        const selected = courses.find((c) => c.id === formData.course);
                        return (
                          <>
                            <h4 className="font-bold mb-2">{selected.name}</h4>
                            <div className="text-sm text-gray-700 space-y-1">
                              <p>• Длительность: {selected.duration}</p>
                              <p>• Цена: {selected.price === 0 ? 'Бесплатно (бонус)' : `${selected.price} сом/месяц`}</p>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold mb-2">Дата начала *</label>
                    <div className="relative">
                      <FaCalendar className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          errors.startDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Формат обучения</label>
                    <div className="space-y-2">
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="format"
                          value="hybrid"
                          checked={formData.format === 'hybrid'}
                          onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-semibold">Гибридный</div>
                          <div className="text-sm text-gray-600">Онлайн + Ментор поддержка</div>
                        </div>
                      </label>
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="format"
                          value="offline"
                          checked={formData.format === 'offline'}
                          onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-semibold">Офлайн группы</div>
                          <div className="text-sm text-gray-600">Очное обучение в классе</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Сообщение (необязательно)</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      placeholder="Расскажите о себе или задайте вопросы..."
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold mb-4">Подтверждение</h3>

                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Имя</p>
                      <p className="font-semibold">{formData.firstName} {formData.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Контакты</p>
                      <p className="font-semibold">{formData.phone}</p>
                      <p className="text-sm">{formData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Курс</p>
                      <p className="font-semibold">
                        {courses.find((c) => c.id === formData.course)?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Дата начала</p>
                      <p className="font-semibold">{formData.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Формат</p>
                      <p className="font-semibold">
                        {formData.format === 'hybrid' ? 'Гибридный' : 'Офлайн группы'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      ℹ️ После отправки заявки наш менеджер свяжется с вами для подтверждения записи и обсуждения деталей оплаты.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-3xl flex justify-between">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Назад
                </button>
              )}
              
              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow ml-auto"
                >
                  Далее
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow ml-auto"
                >
                  Отправить заявку
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default BookingModal;
