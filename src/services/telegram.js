// Telegram Bot API для отправки уведомлений

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN';
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || 'YOUR_CHAT_ID';

/**
 * Отправка сообщения в Telegram
 */
export const sendTelegramMessage = async (message) => {
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const data = await response.json();
    
    if (!data.ok) {
      throw new Error(data.description || 'Ошибка отправки в Telegram');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error);
    throw error;
  }
};

/**
 * Форматирование сообщения о новой брони
 */
export const formatBookingMessage = (bookingData) => {
  const {
    fullName,
    phone,
    email,
    course,
    paymentMethod,
    amount,
    comment,
    date,
  } = bookingData;

  return `
🎓 <b>НОВАЯ БРОНЬ КУРСА</b> 🎓

👤 <b>Студент:</b> ${fullName}
📱 <b>Телефон:</b> ${phone}
📧 <b>Email:</b> ${email || 'Не указан'}

📚 <b>Курс:</b> ${course}
💰 <b>Сумма:</b> ${amount} сом
💳 <b>Метод оплаты:</b> ${paymentMethod}

💬 <b>Комментарий:</b> ${comment || 'Нет'}
📅 <b>Дата брони:</b> ${date}

⏳ <b>Статус:</b> Ожидает подтверждения
  `.trim();
};

/**
 * Форматирование сообщения об оплате
 */
export const formatPaymentMessage = (paymentData) => {
  const {
    fullName,
    phone,
    email,
    course,
    amount,
    paymentMethod,
    transactionId,
    date,
  } = paymentData;

  return `
💳 <b>НОВАЯ ОПЛАТА</b> 💳

👤 <b>Студент:</b> ${fullName}
📱 <b>Телефон:</b> ${phone}
📧 <b>Email:</b> ${email || 'Не указан'}

📚 <b>Курс:</b> ${course}
💰 <b>Сумма:</b> ${amount} сом
💳 <b>Метод оплаты:</b> ${paymentMethod}
🔖 <b>ID транзакции:</b> ${transactionId}

📅 <b>Дата оплаты:</b> ${date}

✅ <b>Статус:</b> Оплачено
  `.trim();
};

/**
 * Отправка уведомления о брони
 */
export const sendBookingNotification = async (bookingData) => {
  const message = formatBookingMessage(bookingData);
  return await sendTelegramMessage(message);
};

/**
 * Отправка уведомления об оплате
 */
export const sendPaymentNotification = async (paymentData) => {
  const message = formatPaymentMessage(paymentData);
  return await sendTelegramMessage(message);
};

export default {
  sendTelegramMessage,
  sendBookingNotification,
  sendPaymentNotification,
  formatBookingMessage,
  formatPaymentMessage,
};
