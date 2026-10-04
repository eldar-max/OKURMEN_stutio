import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaPaperPlane, FaMicrophone, FaRobot, FaUser, FaClock, 
  FaLightbulb, FaCode, FaLanguage, FaHome, FaTrash, FaPlus,
  FaGraduationCap, FaBook, FaCalculator
} from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

function AIChat() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const messagesEndRef = useRef(null);
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: language === 'kg' 
        ? 'Салам! Мен ОКУРМЭН AI ассистентмин. Сизге кандай жардам бере алам?'
        : language === 'en'
        ? 'Hello! I am OKURMEN AI assistant. How can I help you?'
        : 'Привет! Я AI ассистент ОКУРМЭН. Чем могу помочь?',
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      title: language === 'kg' ? 'Бүгүн' : language === 'en' ? 'Today' : 'Сегодня',
      chats: [
        { id: 1, title: language === 'kg' ? 'Менин биринчи суроом' : language === 'en' ? 'My first question' : 'Мой первый вопрос', time: 'Азыр' }
      ]
    },
    {
      id: 2,
      title: language === 'kg' ? 'Кечээ' : language === 'en' ? 'Yesterday' : 'Вчера',
      chats: []
    },
    {
      id: 3,
      title: language === 'kg' ? '7 күн мурун' : language === 'en' ? '7 days ago' : '7 дней назад',
      chats: []
    },
    {
      id: 4,
      title: language === 'kg' ? 'Акыркы 30 күн' : language === 'en' ? 'Last 30 days' : 'Последние 30 дней',
      chats: []
    }
  ]);

  const quickPrompts = [
    {
      icon: FaLightbulb,
      titleKg: 'Идеялар',
      titleRu: 'Идеи',
      titleEn: 'Ideas',
      textKg: 'Долбоор идеялары генерациялоо',
      textRu: 'Генерировать идеи проектов',
      textEn: 'Generate project ideas'
    },
    {
      icon: FaCode,
      titleKg: 'Код',
      titleRu: 'Код',
      titleEn: 'Code',
      textKg: 'Код жазууга жардам',
      textRu: 'Помощь в написании кода',
      textEn: 'Help with coding'
    },
    {
      icon: FaBook,
      titleKg: 'Окуу',
      titleRu: 'Обучение',
      titleEn: 'Learning',
      textKg: 'Концепцияларды түшүндүрүү',
      textRu: 'Объяснение концепций',
      textEn: 'Explain concepts'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsTyping(true);

    try {
      // Вызываем Google Gemini AI
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAfz3G_uBQkDePEYWaQgfuLZtSAgaCJOag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Ты вежливый и полезный помощник образовательной платформы ОКУРМЭН. Отвечай на ${language === 'kg' ? 'кыргызском' : language === 'en' ? 'английском' : 'русском'} языке. Вопрос: ${currentInput}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          }
        })
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        const aiText = data.candidates[0].content.parts[0].text;
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          text: aiText,
          time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error('Invalid response from AI');
      }
    } catch (error) {
      console.error('AI Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: language === 'kg' 
          ? 'Кечиресиз, AI менен байланышта ката кетти. Кайра аракет кылыңыз.'
          : language === 'en'
          ? 'Sorry, there was an error connecting to AI. Please try again.'
          : 'Извините, произошла ошибка соединения с AI. Попробуйте снова.',
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickPrompt = (prompt) => {
    const text = language === 'kg' ? prompt.textKg : language === 'en' ? prompt.textEn : prompt.textRu;
    setInputText(text);
  };

  const handleVoiceInput = () => {
    // Проверяем поддержку браузера
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert(
        language === 'kg' 
          ? 'Үн тааныштыруу колдоого алынбайт. Chrome же Edge браузерин колдонуңуз.'
          : language === 'en'
          ? 'Voice recognition is not supported. Please use Chrome or Edge browser.'
          : 'Распознавание голоса не поддерживается. Используйте Chrome или Edge.'
      );
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    // Настройки распознавания
    recognition.lang = language === 'kg' ? 'ky-KG' : language === 'en' ? 'en-US' : 'ru-RU';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      if (event.error === 'no-speech') {
        alert(
          language === 'kg' 
            ? 'Үн табылган жок. Кайра аракет кылыңыз.'
            : language === 'en'
            ? 'No speech detected. Please try again.'
            : 'Голос не обнаружен. Попробуйте снова.'
        );
      } else if (event.error === 'not-allowed') {
        alert(
          language === 'kg' 
            ? 'Микрофонго уруксат берилген жок. Браузердин жөндөөлөрүндө уруксат бериңиз.'
            : language === 'en'
            ? 'Microphone access denied. Please allow microphone access in browser settings.'
            : 'Доступ к микрофону запрещен. Разрешите доступ в настройках браузера.'
        );
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: Date.now(),
        type: 'bot',
        text: language === 'kg' 
          ? 'Салам! Мен ОКУРМЭН AI ассистентмин. Сизге кандай жардам бере алам?'
          : language === 'en'
          ? 'Hello! I am OKURMEN AI assistant. How can I help you?'
          : 'Привет! Я AI ассистент ОКУРМЭН. Чем могу помочь?',
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex">
      {/* Sidebar */}
      <div className="w-80 bg-black/40 backdrop-blur-xl border-r border-gray-800 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <Link to="/" className="flex items-center space-x-3 mb-6 text-white hover:text-yellow-500 transition-colors">
            <FaHome className="text-xl" />
            <span className="font-semibold">
              {language === 'kg' ? 'Башкы бетке' : language === 'en' ? 'Home' : 'На главную'}
            </span>
          </Link>
          
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center space-x-3 py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black rounded-xl font-bold hover:shadow-lg hover:shadow-yellow-500/50 transition-all"
          >
            <FaPlus />
            <span>{language === 'kg' ? 'Жаңы маек' : language === 'en' ? 'New Chat' : 'Новый чат'}</span>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-gray-400 text-sm font-semibold mb-4 px-2">
            {language === 'kg' ? 'Тарых' : language === 'en' ? 'History' : 'История'}
          </h3>
          
          {chatHistory.map((section) => (
            <div key={section.id} className="mb-6">
              <h4 className="text-gray-500 text-xs font-semibold mb-2 px-2">{section.title}</h4>
              {section.chats.length > 0 ? (
                section.chats.map((chat) => (
                  <motion.button
                    key={chat.id}
                    whileHover={{ x: 5 }}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-all mb-1 flex items-center justify-between group"
                  >
                    <span className="truncate">{chat.title}</span>
                    <button className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400">
                      <FaTrash className="text-sm" />
                    </button>
                  </motion.button>
                ))
              ) : (
                <p className="text-gray-600 text-sm px-4 py-2">
                  {language === 'kg' ? 'Маектер жок' : language === 'en' ? 'No chats' : 'Нет чатов'}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* User Info */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
              <FaGraduationCap className="text-white text-xl" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">OKURMEN AI</p>
              <p className="text-yellow-500 text-xs">Premium</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-black/40 backdrop-blur-xl border-b border-gray-800 p-6">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
                {language === 'kg' ? 'Кош келиңиз!' : language === 'en' ? 'Welcome back!' : 'С возвращением!'}
              </h1>
              <p className="text-gray-400 mt-1">
                {language === 'kg' 
                  ? 'Бүгүн эмнени изилдегиңиз келет?'
                  : language === 'en'
                  ? 'What would you like to explore today?'
                  : 'Что бы вы хотели изучить сегодня?'}
              </p>
            </div>
            
            {/* AI Avatar */}
            <motion.div
              animate={{ 
                rotate: [0, 5, 0, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/50"
            >
              <FaRobot className="text-4xl text-black" />
            </motion.div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Quick Prompts - только если нет сообщений */}
            {messages.length === 1 && (
              <div className="grid grid-cols-3 gap-4 mb-8">
                {quickPrompts.map((prompt, index) => {
                  const Icon = prompt.icon;
                  const title = language === 'kg' ? prompt.titleKg : language === 'en' ? prompt.titleEn : prompt.titleRu;
                  const text = language === 'kg' ? prompt.textKg : language === 'en' ? prompt.textEn : prompt.textRu;
                  
                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleQuickPrompt(prompt)}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl hover:border-yellow-500/50 transition-all group"
                    >
                      <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-yellow-500/20 transition-colors">
                        <Icon className="text-2xl text-yellow-500" />
                      </div>
                      <h3 className="text-white font-bold mb-2">{title}</h3>
                      <p className="text-gray-400 text-sm">{text}</p>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Messages */}
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'bot' 
                        ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' 
                        : 'bg-gradient-to-br from-blue-500 to-blue-600'
                    }`}>
                      {message.type === 'bot' ? (
                        <FaRobot className="text-black text-xl" />
                      ) : (
                        <FaUser className="text-white text-xl" />
                      )}
                    </div>

                    {/* Message Content */}
                    <div className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`px-6 py-4 rounded-2xl ${
                        message.type === 'bot'
                          ? 'bg-gray-800 text-white'
                          : 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-black'
                      }`}>
                        <p className="text-base leading-relaxed">{message.text}</p>
                      </div>
                      <div className="flex items-center space-x-2 mt-2 px-2">
                        <FaClock className="text-gray-500 text-xs" />
                        <span className="text-gray-500 text-xs">{message.time}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex space-x-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                  <FaRobot className="text-black text-xl" />
                </div>
                <div className="bg-gray-800 px-6 py-4 rounded-2xl">
                  <div className="flex space-x-2">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-yellow-500 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-yellow-500 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-yellow-500 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-black/40 backdrop-blur-xl border-t border-gray-800 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/50 rounded-2xl border border-gray-700 p-2 flex items-end space-x-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={
                  language === 'kg' 
                    ? 'Суроо бериңиз...'
                    : language === 'en'
                    ? 'Ask a question...'
                    : 'Задайте вопрос...'
                }
                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none px-4 py-3 text-lg"
              />
              
              <motion.button
                onClick={handleVoiceInput}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-xl transition-all ${
                  isListening 
                    ? 'bg-red-600 text-white animate-pulse' 
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                }`}
                title={
                  language === 'kg' 
                    ? 'Үн менен айтыңыз'
                    : language === 'en'
                    ? 'Speak your message'
                    : 'Говорите ваше сообщение'
                }
              >
                <FaMicrophone className="text-xl" />
              </motion.button>

              <motion.button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-xl transition-all ${
                  inputText.trim()
                    ? 'bg-gradient-to-r from-yellow-600 to-yellow-500 text-black hover:shadow-lg hover:shadow-yellow-500/50'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                <FaPaperPlane className="text-xl" />
              </motion.button>
            </div>

            <p className="text-gray-500 text-xs text-center mt-3">
              {language === 'kg'
                ? 'ОКУРМЭН AI ката кетирүүсү мүмкүн. Маанилүү маалыматты текшериңиз.'
                : language === 'en'
                ? 'OKURMEN AI can make mistakes. Check important info.'
                : 'ОКУРМЭН AI может ошибаться. Проверяйте важную информацию.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIChat;
