import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Создаем транспорт для Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// Проверка подключения
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email service error:', error);
  } else {
    console.log('✅ Email service ready');
  }
});

/**
 * Отправка кода верификации при регистрации
 */
export async function sendVerificationCode(email, code, userName) {
  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: email,
    subject: '🎓 ОКУРМЭН - Код верификации',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 30px; text-align: center; color: white; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { padding: 40px 30px; }
          .code-box { background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%); padding: 20px; text-align: center; border-radius: 8px; margin: 30px 0; }
          .code { font-size: 36px; font-weight: bold; color: #9a3412; letter-spacing: 8px; }
          .footer { background-color: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
          .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; text-decoration: none; border-radius: 25px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎓 ОКУРМЭН</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Билимден мүмкүнчүлүккө карай</p>
          </div>
          
          <div class="content">
            <h2 style="color: #1f2937;">Добро пожаловать, ${userName}!</h2>
            <p style="color: #4b5563; line-height: 1.6;">
              Спасибо за регистрацию в образовательной платформе ОКУРМЭН. 
              Для завершения регистрации введите код подтверждения ниже:
            </p>
            
            <div class="code-box">
              <p style="margin: 0 0 10px 0; color: #9a3412; font-weight: bold;">Ваш код верификации:</p>
              <div class="code">${code}</div>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
              ⏰ Код действителен в течение <strong>10 минут</strong>.<br>
              🔒 Никому не сообщайте этот код.<br>
              ❓ Если вы не регистрировались на нашей платформе, просто проигнорируйте это письмо.
            </p>
          </div>
          
          <div class="footer">
            <p style="margin: 0 0 10px 0;">
              © 2024 ОКУРМЭН. Все права защищены.
            </p>
            <p style="margin: 0; font-size: 12px;">
              г. Бишкек, Кыргызстан<br>
              📧 info@okurmen.kg | 📞 +996 XXX XXX XXX
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Verification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Отправка кода для админа в Telegram (через email уведомление)
 */
export async function sendAdminCode(email, code) {
  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: email,
    subject: '🔐 ОКУРМЭН - Админ код доступа',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #111827; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #1f2937; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.3); }
          .header { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 30px; text-align: center; color: white; }
          .content { padding: 40px 30px; color: #e5e7eb; }
          .code-box { background: linear-gradient(135deg, #374151 0%, #1f2937 100%); padding: 20px; text-align: center; border-radius: 8px; margin: 30px 0; border: 2px solid #f97316; }
          .code { font-size: 42px; font-weight: bold; color: #f97316; letter-spacing: 10px; }
          .footer { background-color: #111827; padding: 20px; text-align: center; color: #9ca3af; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 АДМИН-ПАНЕЛЬ</h1>
            <p style="margin: 10px 0 0 0;">ОКУРМЭН</p>
          </div>
          
          <div class="content">
            <h2 style="color: #f97316;">Код доступа администратора</h2>
            <p style="line-height: 1.6;">
              Используйте код ниже для входа в админ-панель:
            </p>
            
            <div class="code-box">
              <p style="margin: 0 0 10px 0; color: #f97316; font-weight: bold;">КОД:</p>
              <div class="code">${code}</div>
            </div>
            
            <p style="color: #9ca3af; font-size: 14px; line-height: 1.6;">
              ⏰ Код действителен <strong>10 минут</strong><br>
              🔒 Держите код в секрете<br>
              ⚠️ Не делитесь этим кодом ни с кем
            </p>
          </div>
          
          <div class="footer">
            <p style="margin: 0;">
              © 2024 ОКУРМЭН Admin System
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Admin code email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending admin email:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Отправка подтверждения записи на курс
 */
export async function sendBookingConfirmation(email, name, courseName) {
  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: email,
    subject: '✅ ОКУРМЭН - Ваша запись подтверждена!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; color: white; }
          .content { padding: 40px 30px; }
          .info-box { background-color: #f0fdf4; padding: 20px; border-left: 4px solid #10b981; margin: 20px 0; border-radius: 4px; }
          .footer { background-color: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Запись подтверждена!</h1>
          </div>
          
          <div class="content">
            <h2 style="color: #1f2937;">Здравствуйте, ${name}!</h2>
            <p style="color: #4b5563; line-height: 1.6;">
              Ваша запись на курс успешно подтверждена! Мы рады видеть вас среди наших студентов.
            </p>
            
            <div class="info-box">
              <h3 style="margin: 0 0 10px 0; color: #059669;">📚 Курс:</h3>
              <p style="margin: 0; font-size: 18px; font-weight: bold; color: #1f2937;">${courseName}</p>
            </div>
            
            <p style="color: #4b5563; line-height: 1.6;">
              В ближайшее время наш менеджер свяжется с вами для уточнения деталей и расписания занятий.
            </p>
            
            <p style="color: #6b7280; font-size: 14px;">
              📞 Телефон: +996 XXX XXX XXX<br>
              📧 Email: info@okurmen.kg<br>
              📍 Адрес: г. Бишкек, ул. Примерная, 123
            </p>
          </div>
          
          <div class="footer">
            <p style="margin: 0;">
              © 2024 ОКУРМЭН. Билимден мүмкүнчүлүккө карай
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Booking confirmation sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending booking email:', error);
    return { success: false, error: error.message };
  }
}

export default {
  sendVerificationCode,
  sendAdminCode,
  sendBookingConfirmation
};
