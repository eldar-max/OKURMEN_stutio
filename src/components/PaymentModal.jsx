import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCreditCard, FaMobileAlt, FaUniversity, FaCheckCircle } from 'react-icons/fa';
import { paymentsAPI, telegramAPI } from '../services/api';

function PaymentModal({ isOpen, onClose, bookingData }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [mBankPhone, setMBankPhone] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    setProcessing(true);

    try {
      // Подготовить данные платежа
      const paymentData = {
        studentName: `${bookingData?.firstName || 'Student'} ${bookingData?.lastName || ''}`,
        courseName: bookingData?.courseName || 'Frontend Development',
        amount: 5000,
        method: paymentMethod === 'card' ? 'Банковская карта' : paymentMethod === 'mbank' ? 'Mbank' : 'Наличные',
        status: 'completed',
        paymentDetails: paymentMethod === 'card' ? {
          cardNumber: cardData.cardNumber.slice(-4),
          cardName: cardData.cardName,
        } : paymentMethod === 'mbank' ? {
          phone: mBankPhone,
        } : null,
        createdAt: new Date().toISOString(),
      };

      // Отправка на backend
      const response = await paymentsAPI.create(paymentData);
      console.log('Payment created:', response);

      // Отправка уведомления в Telegram
      await telegramAPI.sendPayment(paymentData);
      console.log('Telegram payment notification sent');

      setProcessing(false);
      setSuccess(true);

      // Закрыть через 3 секунды
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Payment error:', error);
      setProcessing(false);
      alert('Ошибка при обработке платежа. Пожалуйста, попробуйте снова или свяжитесь с нами.');
    }
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(' ').substr(0, 19);
  };

  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substr(0, 2) + '/' + cleaned.substr(2, 2);
    }
    return cleaned;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg"
          >
            {!success ? (
              <>
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-3xl flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Оплата</h2>
                    <p className="text-sm text-green-100 mt-1">Выберите способ оплаты</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Order Summary */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <h3 className="font-bold mb-3">Детали заказа</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Курс:</span>
                        <span className="font-semibold">Frontend Development</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Формат:</span>
                        <span className="font-semibold">Гибридный</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-200">
                        <span className="text-gray-600 font-bold">Итого:</span>
                        <span className="font-bold text-green-600 text-lg">5,000 сом</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-3 mb-6">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`w-full p-4 border-2 rounded-xl flex items-center space-x-3 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <FaCreditCard className={`text-2xl ${paymentMethod === 'card' ? 'text-green-600' : 'text-gray-400'}`} />
                      <div className="text-left">
                        <div className="font-semibold">Банковская карта</div>
                        <div className="text-xs text-gray-600">Visa, Mastercard</div>
                      </div>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('mbank')}
                      className={`w-full p-4 border-2 rounded-xl flex items-center space-x-3 transition-all ${
                        paymentMethod === 'mbank'
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <FaMobileAlt className={`text-2xl ${paymentMethod === 'mbank' ? 'text-green-600' : 'text-gray-400'}`} />
                      <div className="text-left">
                        <div className="font-semibold">Mbank</div>
                        <div className="text-xs text-gray-600">Оплата через приложение</div>
                      </div>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('cash')}
                      className={`w-full p-4 border-2 rounded-xl flex items-center space-x-3 transition-all ${
                        paymentMethod === 'cash'
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <FaUniversity className={`text-2xl ${paymentMethod === 'cash' ? 'text-green-600' : 'text-gray-400'}`} />
                      <div className="text-left">
                        <div className="font-semibold">Наличные</div>
                        <div className="text-xs text-gray-600">Оплата в офисе</div>
                      </div>
                    </button>
                  </div>

                  {/* Card Payment Form */}
                  {paymentMethod === 'card' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-semibold mb-2">Номер карты</label>
                        <input
                          type="text"
                          value={cardData.cardNumber}
                          onChange={(e) =>
                            setCardData({ ...cardData, cardNumber: formatCardNumber(e.target.value) })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Имя на карте</label>
                        <input
                          type="text"
                          value={cardData.cardName}
                          onChange={(e) => setCardData({ ...cardData, cardName: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                          placeholder="AIBEK OSMONOV"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Срок действия</label>
                          <input
                            type="text"
                            value={cardData.expiryDate}
                            onChange={(e) =>
                              setCardData({ ...cardData, expiryDate: formatExpiryDate(e.target.value) })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            placeholder="MM/YY"
                            maxLength="5"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">CVV</label>
                          <input
                            type="text"
                            value={cardData.cvv}
                            onChange={(e) =>
                              setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '') })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            placeholder="123"
                            maxLength="3"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Mbank Payment */}
                  {paymentMethod === 'mbank' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-semibold mb-2">Номер телефона Mbank</label>
                        <input
                          type="tel"
                          value={mBankPhone}
                          onChange={(e) => setMBankPhone(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                          placeholder="+996 555 123 456"
                        />
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
                        После подтверждения вам придет push-уведомление в приложении Mbank для подтверждения платежа.
                      </div>
                    </motion.div>
                  )}

                  {/* Cash Payment Info */}
                  {paymentMethod === 'cash' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-yellow-50 p-4 rounded-lg"
                    >
                      <p className="text-sm text-yellow-800 mb-2">
                        📍 Вы можете оплатить наличными в нашем офисе:
                      </p>
                      <p className="text-sm font-semibold">г. Бишкек, ул. Примерная 123</p>
                      <p className="text-sm text-gray-600">Режим работы: Пн-Пт 9:00-18:00</p>
                    </motion.div>
                  )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 p-6 rounded-b-3xl">
                  <button
                    onClick={handlePayment}
                    disabled={processing}
                    className={`w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all ${
                      processing ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {processing ? 'Обработка...' : 'Оплатить 5,000 сом'}
                  </button>
                  <p className="text-xs text-gray-600 text-center mt-3">
                    🔒 Защищенное соединение. Ваши данные в безопасности
                  </p>
                </div>
              </>
            ) : (
              /* Success Screen */
              <div className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <FaCheckCircle className="text-6xl text-green-600" />
                </motion.div>
                <h2 className="text-3xl font-bold mb-2">Успешно!</h2>
                <p className="text-gray-600 mb-4">Ваш платеж обработан</p>
                <p className="text-sm text-gray-500">
                  Информация отправлена менеджеру. Мы свяжемся с вами в ближайшее время.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default PaymentModal;
