// Функция генерации и отправки кода администратора в Telegram

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

export async function generateAndSendAdminCode(adminEmail, adminName) {
  // Генерируем 6-значный код
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Сохраняем код в localStorage с временной меткой (действителен 10 минут)
  const codeData = {
    code: code,
    timestamp: Date.now(),
    email: adminEmail,
    expiresIn: 10 * 60 * 1000 // 10 минут
  };
  
  localStorage.setItem('adminCode', JSON.stringify(codeData));
  
  // Формируем сообщение для Telegram
  const message = `
🔐 <b>Новый вход администратора</b>

👤 <b>Администратор:</b> ${adminName}
📧 <b>Email:</b> ${adminEmail}
🔢 <b>Код доступа:</b> <code>${code}</code>

⏰ Код действителен 10 минут
🌐 Платформа: OKURMEN

<i>Время: ${new Date().toLocaleString('ru-RU')}</i>
  `;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );

    if (response.ok) {
      console.log('✅ Код администратора отправлен в Telegram');
      return { success: true, code };
    } else {
      console.error('❌ Ошибка отправки кода в Telegram');
      return { success: false, code };
    }
  } catch (error) {
    console.error('❌ Ошибка:', error);
    return { success: false, code };
  }
}

export function verifyAdminCode(inputCode) {
  const storedData = localStorage.getItem('adminCode');
  
  if (!storedData) {
    return { valid: false, message: 'Код не найден' };
  }
  
  const codeData = JSON.parse(storedData);
  const now = Date.now();
  
  // Проверяем срок действия (10 минут)
  if (now - codeData.timestamp > codeData.expiresIn) {
    localStorage.removeItem('adminCode');
    return { valid: false, message: 'Код истек. Войдите снова.' };
  }
  
  // Проверяем совпадение кода
  if (inputCode === codeData.code) {
    return { valid: true, message: 'Код верный' };
  } else {
    return { valid: false, message: 'Неверный код' };
  }
}

export function clearAdminCode() {
  localStorage.removeItem('adminCode');
}
