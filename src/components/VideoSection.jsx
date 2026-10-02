import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FaPlay, FaTimes, FaTv, FaYoutube } from 'react-icons/fa';

function VideoSection() {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <FaPlay className="text-lg" />
              {language === 'kg' ? 'Видео' : language === 'en' ? 'Video' : 'Видео'}
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {language === 'kg' ? 'Окуу процессин көрүңүз' :
             language === 'en' ? 'See Learning Process' :
             'Посмотрите процесс обучения'}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {language === 'kg' ? 'Биздин окуучулар кандай окуп, кандай натыйжаларга жетишет' :
             language === 'en' ? 'How our students learn and what results they achieve' :
             'Как учатся наши студенты и каких результатов достигают'}
          </p>
        </motion.div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Video Container */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video bg-gray-800">
            {!isPlaying ? (
              <>
                {/* Thumbnail */}
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=675&fit=crop"
                  alt="Video Thumbnail"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Play Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsPlaying(true)}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-shadow"
                  >
                    <FaPlay className="text-3xl text-white ml-1" />
                  </motion.div>
                  
                  <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                </motion.button>

                {/* Info Overlay */}
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {language === 'kg' ? '🎓 Биздин окуучулардын жетишкендиктери' :
                     language === 'en' ? '🎓 Our Students Success Stories' :
                     '🎓 Истории успеха наших студентов'}
                  </h3>
                  <p className="text-white/80">
                    {language === 'kg' ? '3000+ окуучу • 95% ийгилик • 5 жыл тажрыйба' :
                     language === 'en' ? '3000+ students • 95% success • 5 years experience' :
                     '3000+ студентов • 95% успех • 5 лет опыта'}
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* YouTube Video Embed */}
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="OKURMEN Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0"
                ></iframe>

                {/* Close Button */}
                <button
                  onClick={() => setIsPlaying(false)}
                  className="absolute top-4 right-4 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center z-10 transition-colors"
                >
                  <FaTimes className="text-white text-xl" />
                </button>
              </>
            )}
          </div>

          {/* Stats Below Video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-6 mt-8"
          >
            {[
              { 
                value: '50K+', 
                labelKg: 'Көрүүлөр', 
                labelRu: 'Просмотров', 
                labelEn: 'Views' 
              },
              { 
                value: '4.9★', 
                labelKg: 'Рейтинг', 
                labelRu: 'Рейтинг', 
                labelEn: 'Rating' 
              },
              { 
                value: '1K+', 
                labelKg: 'Комменттер', 
                labelRu: 'Комментариев', 
                labelEn: 'Comments' 
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-300">
                  {language === 'ru' ? stat.labelRu : 
                   language === 'en' ? stat.labelEn : 
                   stat.labelKg}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-white text-lg mb-6 flex items-center justify-center gap-2">
            <FaTv className="text-orange-500 text-2xl" />
            {language === 'kg' ? 'Дагы көптөгөн видеолорду биздин YouTube каналында көрүңүз!' :
             language === 'en' ? 'Watch more videos on our YouTube channel!' :
             'Смотрите больше видео на нашем YouTube канале!'}
          </p>
          <motion.a
            href="https://youtube.com/@okurmen"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-colors flex items-center gap-3"
          >
            <FaYoutube className="text-2xl" />
            {language === 'kg' ? 'YouTube каналыбыз' :
             language === 'en' ? 'Our YouTube Channel' :
             'Наш YouTube канал'}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default VideoSection;
