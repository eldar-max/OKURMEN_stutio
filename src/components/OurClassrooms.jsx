import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaLaptop, FaWifi, FaTv, FaChair, FaDesktop, FaCoffee } from 'react-icons/fa';

function OurClassrooms() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const facilities = [
    {
      icon: FaLaptop,
      title: 'Современные компьютеры',
      description: 'Intel Core i7, 16GB RAM, SSD',
    },
    {
      icon: FaWifi,
      title: 'Высокоскоростной интернет',
      description: '100 Мбит/с оптоволокно',
    },
    {
      icon: FaTv,
      title: 'Проекторы и доски',
      description: 'Интерактивные презентации',
    },
    {
      icon: FaChair,
      title: 'Удобная мебель',
      description: 'Эргономичные кресла',
    },
    {
      icon: FaDesktop,
      title: 'Два монитора',
      description: 'Для комфортной работы',
    },
    {
      icon: FaCoffee,
      title: 'Зона отдыха',
      description: 'Кофе и перекусы',
    },
  ];

  // Placeholder изображения (замените на реальные фото)
  const classroomImages = [
    {
      title: 'Главный зал',
      description: '30 рабочих мест',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    },
    {
      title: 'Зал для практики',
      description: '20 рабочих мест',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    },
    {
      title: 'Переговорная комната',
      description: 'Для групповых проектов',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    },
    {
      title: 'Зона отдыха',
      description: 'Комфортная атмосфера',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
              Наши аудитории
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Современные и комфортные пространства для эффективного обучения
          </p>
        </motion.div>

        {/* Facilities */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 rounded-2xl p-6 flex items-start space-x-4"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <facility.icon className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                  {facility.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {facility.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Classroom Images */}
        <div className="grid md:grid-cols-2 gap-6">
          {classroomImages.map((classroom, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="aspect-video bg-gradient-to-br from-blue-200 to-purple-200 relative overflow-hidden">
                <img
                  src={classroom.image}
                  alt={classroom.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{classroom.title}</h3>
                <p className="text-blue-200">{classroom.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map and Address Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                Наш адрес на карте
              </span>
            </h3>
            <p className="text-xl text-gray-600">
              Приходите к нам на экскурсию или записывайтесь на курс
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.0966609834153!2d74.58573431548205!3d42.87470090915338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDUyJzI4LjkiTiA3NMKwMzUnMTcuMSJF!5e0!3m2!1sru!2skg!4v1234567890123!5m2!1sru!2skg"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="OKURMEN на карте"
                className="w-full h-full"
              ></iframe>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="space-y-6"
            >
              {/* Address Card */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 text-white shadow-xl">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-2">Адрес</h4>
                    <p className="text-orange-100 text-lg leading-relaxed">
                      г. Бишкек, ул. Примерная, 123<br />
                      БЦ "IT-Park", 3 этаж<br />
                      <span className="text-sm opacity-90">Рядом с метро "Московская"</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-2 border-gray-100 dark:border-gray-700 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Телефон</h4>
                    <p className="text-orange-600 text-xl font-semibold">
                      +996 XXX XXX XXX
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      Звоните с 9:00 до 20:00
                    </p>
                  </div>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-2 border-gray-100 dark:border-gray-700 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">Режим работы</h4>
                    <div className="space-y-2 text-gray-700 dark:text-gray-300">
                      <p className="flex justify-between">
                        <span className="font-medium">Понедельник - Пятница:</span>
                        <span className="text-orange-600 font-semibold">9:00 - 20:00</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="font-medium">Суббота - Воскресенье:</span>
                        <span className="text-orange-600 font-semibold">10:00 - 18:00</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg py-5 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
              >
                Записаться на экскурсию
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 bg-orange-50 dark:bg-orange-900 inline-block px-6 py-3 rounded-full">
            <strong>Примечание:</strong> Изображения классов - примеры. Замените на реальные фото ваших аудиторий.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default OurClassrooms;
