import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FaApple, FaGooglePlay, FaMobileAlt, FaBell, FaVideo, FaBook } from 'react-icons/fa';

function MobileApp() {
  const { language } = useLanguage();

  const features = [
    {
      icon: FaVideo,
      titleKg: 'Видео сабактар',
      titleRu: 'Видео уроки',
      titleEn: 'Video Lessons',
      descKg: 'Каалаган убакта көрүңүз',
      descRu: 'Смотрите в любое время',
      descEn: 'Watch anytime'
    },
    {
      icon: FaBook,
      titleKg: 'Тапшырмалар',
      titleRu: 'Задания',
      titleEn: 'Assignments',
      descKg: 'Практика жана тесттер',
      descRu: 'Практика и тесты',
      descEn: 'Practice and tests'
    },
    {
      icon: FaBell,
      titleKg: 'Билдирүүлөр',
      titleRu: 'Уведомления',
      titleEn: 'Notifications',
      descKg: 'Жаңылыктар жөнүндө',
      descRu: 'О новостях',
      descEn: 'About updates'
    }
  ];

  const getTitle = (feature) => {
    if (language === 'ru') return feature.titleRu;
    if (language === 'en') return feature.titleEn;
    return feature.titleKg;
  };

  const getDesc = (feature) => {
    if (language === 'ru') return feature.descRu;
    if (language === 'en') return feature.descEn;
    return feature.descKg;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-pink-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6"
            >
              <div className="bg-white/20 backdrop-blur-lg px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <FaMobileAlt />
                {language === 'kg' ? 'Мобилдик тиркеме' : 
                 language === 'en' ? 'Mobile App' : 
                 'Мобильное приложение'}
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {language === 'kg' ? 'Телефондон окуңуз!' :
               language === 'en' ? 'Learn on the Go!' :
               'Учитесь с телефона!'}
            </h2>

            <p className="text-xl text-white/90 mb-8">
              {language === 'kg' ? 'OKURMEN тиркемесин жүктөп алып, каалаган жеринен окуңуз. Видео сабактар, тапшырмалар жана менторлор менен байланыш!' :
               language === 'en' ? 'Download OKURMEN app and learn from anywhere. Video lessons, assignments and mentor communication!' :
               'Скачайте приложение OKURMEN и учитесь откуда угодно. Видео уроки, задания и связь с менторами!'}
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 bg-white/10 backdrop-blur-lg rounded-2xl p-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                      <Icon className="text-2xl text-orange-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{getTitle(feature)}</h4>
                      <p className="text-sm text-white/80">{getDesc(feature)}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl transition-all"
              >
                <FaApple className="text-3xl" />
                <div className="text-left">
                  <div className="text-xs opacity-80">
                    {language === 'kg' ? 'Жүктөп алыңыз' : 
                     language === 'en' ? 'Download on the' : 
                     'Загрузите в'}
                  </div>
                  <div className="text-lg font-bold">App Store</div>
                </div>
              </motion.a>

              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl transition-all"
              >
                <FaGooglePlay className="text-3xl" />
                <div className="text-left">
                  <div className="text-xs opacity-80">
                    {language === 'kg' ? 'Алыңыз' : 
                     language === 'en' ? 'GET IT ON' : 
                     'Доступно в'}
                  </div>
                  <div className="text-lg font-bold">Google Play</div>
                </div>
              </motion.a>
            </div>

            {/* QR Code */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 flex items-center gap-4"
            >
              <div className="bg-white p-3 rounded-2xl">
                <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-center">QR Code</span>
                </div>
              </div>
              <p className="text-sm text-white/80">
                {language === 'kg' ? 'QR кодду скандаңыз' :
                 language === 'en' ? 'Scan QR code' :
                 'Отсканируйте QR код'}
              </p>
            </motion.div>
          </motion.div>

          {/* Right - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10"
            >
              {/* Phone Frame */}
              <div className="relative mx-auto w-80 h-[600px] bg-gray-900 rounded-[3rem] shadow-2xl overflow-hidden border-8 border-gray-800">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-gray-900 rounded-b-3xl z-10"></div>
                
                {/* Screen Content */}
                <div className="w-full h-full bg-gradient-to-br from-orange-100 to-pink-100 p-6 overflow-hidden">
                  {/* App Header */}
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-900 mb-2">OKURMEN</div>
                    <div className="text-sm text-gray-600">
                      {language === 'kg' ? 'Билим алуу платформасы' :
                       language === 'en' ? 'Learning Platform' :
                       'Платформа обучения'}
                    </div>
                  </div>

                  {/* Cards */}
                  <div className="space-y-4">
                    <div className="bg-white rounded-2xl p-4 shadow-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-orange-500 rounded-xl"></div>
                        <div className="flex-1">
                          <div className="h-3 bg-gray-200 rounded mb-1"></div>
                          <div className="h-2 bg-gray-100 rounded w-20"></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 shadow-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-500 rounded-xl"></div>
                        <div className="flex-1">
                          <div className="h-3 bg-gray-200 rounded mb-1"></div>
                          <div className="h-2 bg-gray-100 rounded w-20"></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 shadow-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-green-500 rounded-xl"></div>
                        <div className="flex-1">
                          <div className="h-3 bg-gray-200 rounded mb-1"></div>
                          <div className="h-2 bg-gray-100 rounded w-20"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full filter blur-2xl"
            ></motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/20 rounded-full filter blur-2xl"
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default MobileApp;
