import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend, FiUser, FiCpu } from 'react-icons/fi';
import axios from 'axios';

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Здравствуйте! Я AI ассистент OKURMEN. Чем могу помочь?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Using Google Gemini API (free tier)
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
        {
          contents: [{
            parts: [{
              text: `Ты AI ассистент образовательной платформы OKURMEN в Кыргызстане. 
              
Информация о OKURMEN:
- Мы обучаем программированию, дизайну и IT технологиям
- Курсы: Frontend разработка (HTML, CSS, JavaScript, React), Backend (Node.js, PostgreSQL), UX/UI дизайн
- Для детей и взрослых от 8 до 60 лет
- Стоимость курсов: 5000-6000 сом/месяц
- Длительность: 6-12 месяцев
- Форматы: онлайн и офлайн в Бишкеке
- Наши контакты: +996 702 038 656, WhatsApp, Telegram
- Соцсети: Instagram @okurmen_studio, YouTube @Okurmen_edu

Отвечай дружелюбно, кратко и по делу. Помогай с выбором курса, отвечай на вопросы о программе обучения, ценах и записи.

Вопрос пользователя: ${input.trim()}`
            }]
          }]
        },
        {
          params: {
            key: import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyAfz3G_uBQkDePEYWaQgfuLZtSAgaCJOag'
          }
        }
      );

      const aiResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 
        'Извините, произошла ошибка. Попробуйте еще раз.';

      const assistantMessage = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI Chat Error:', error);
      
      // Fallback responses
      const fallbackResponse = getFallbackResponse(input.trim());
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: fallbackResponse,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getFallbackResponse = (question) => {
    const q = question.toLowerCase();
    
    if (q.includes('курс') || q.includes('обучение') || q.includes('программа')) {
      return `📚 Наши курсы:

✅ Frontend разработка (6 месяцев) - 5000 сом/мес
   HTML, CSS, JavaScript, React, Git

✅ Backend разработка (8 месяцев) - 5000 сом/мес
   Node.js, Express, PostgreSQL, API

✅ UX/UI дизайн (6 месяцев) - 4500 сом/мес
   Figma, Adobe XD, прототипирование

Записаться: +996 702 038 656 📱`;
    }
    
    if (q.includes('цена') || q.includes('стоимость') || q.includes('сколько')) {
      return `💰 Стоимость обучения:

• Frontend/Backend: 5000 сом/месяц
• UX/UI дизайн: 4500 сом/месяц

Возможна рассрочка! Первый урок - БЕСПЛАТНО!

Записаться: +996 702 038 656`;
    }
    
    if (q.includes('возраст') || q.includes('кому') || q.includes('для кого')) {
      return `👥 Обучение для всех возрастов:

• Дети от 8 лет
• Подростки 12-17 лет
• Взрослые 18-60+ лет

Индивидуальный подход к каждому!`;
    }
    
    if (q.includes('контакт') || q.includes('связаться') || q.includes('телефон')) {
      return `📞 Наши контакты:

• Телефон: +996 702 038 656
• WhatsApp: +996 702 038 656
• Telegram: @OKURKIDSBOT
• Instagram: @okurmen_studio
• YouTube: @Okurmen_edu

Работаем каждый день с 9:00 до 20:00`;
    }
    
    if (q.includes('где') || q.includes('адрес') || q.includes('офис')) {
      return `📍 Мы находимся в Бишкеке!

Также доступны онлайн-занятия из любой точки мира.

Для уточнения адреса: +996 702 038 656`;
    }
    
    return `Спасибо за ваш вопрос! 

Для получения подробной информации свяжитесь с нами:
📱 +996 702 038 656 (WhatsApp, Telegram)
📧 Instagram: @okurmen_studio

Наши менеджеры с радостью ответят на все вопросы!`;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 ${
          isOpen ? 'hidden' : 'flex'
        } items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-2xl hover:shadow-orange-500/50 transition-all duration-300`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <FiMessageCircle size={28} />
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <FiCpu className="text-orange-500" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold">OKURMEN AI</h3>
                  <p className="text-orange-100 text-xs">Онлайн ассистент</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                        : 'bg-gradient-to-r from-orange-500 to-orange-600'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <FiUser className="text-white" size={16} />
                    ) : (
                      <FiCpu className="text-white" size={16} />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                        : 'bg-white text-gray-800 shadow-md'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.role === 'user' ? 'text-blue-100' : 'text-gray-400'
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-orange-500 to-orange-600">
                    <FiCpu className="text-white" size={16} />
                  </div>
                  <div className="bg-white p-3 rounded-2xl shadow-md">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-orange-500 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-orange-500 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-orange-500 rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Задайте вопрос..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <FiSend size={20} />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Powered by OKURMEN AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;
