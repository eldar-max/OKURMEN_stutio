import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaWhatsapp, FaTelegram, FaMapPin } from 'react-icons/fa';

function Contact() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactInfo = [
    {
      icon: FaPhone,
      titleKg: 'Телефон',
      titleRu: 'Телефон',
      titleEn: 'Phone',
      value: '+996 555 123 456',
      link: 'tel:+996555123456'
    },
    {
      icon: FaWhatsapp,
      titleKg: 'WhatsApp',
      titleRu: 'WhatsApp',
      titleEn: 'WhatsApp',
      value: '+996 777 123 456',
      link: 'https://wa.me/996777123456'
    },
    {
      icon: FaEnvelope,
      titleKg: 'Email',
      titleRu: 'Email',
      titleEn: 'Email',
      value: 'info@okurmen.kg',
      link: 'mailto:info@okurmen.kg'
    },
    {
      icon: FaMapMarkerAlt,
      titleKg: 'Дарек',
      titleRu: 'Адрес',
      titleEn: 'Address',
      value: language === 'kg' ? 'Бишкек, Чүй проспекти 123' :
             language === 'en' ? 'Bishkek, Chui Avenue 123' :
             'Бишкек, проспект Чуй 123',
      link: 'https://maps.google.com'
    },
    {
      icon: FaClock,
      titleKg: 'Иш убактысы',
      titleRu: 'Время работы',
      titleEn: 'Working Hours',
      value: language === 'kg' ? 'Дүй-Жек: 9:00-18:00' :
             language === 'en' ? 'Mon-Sat: 9:00-18:00' :
             'Пн-Сб: 9:00-18:00',
      link: null
    },
    {
      icon: FaTelegram,
      titleKg: 'Telegram',
      titleRu: 'Telegram',
      titleEn: 'Telegram',
      value: '@okurmen_kg',
      link: 'https://t.me/okurmen_kg'
    }
  ];

  const getTitle = (info) => {
    if (language === 'ru') return info.titleRu;
    if (language === 'en') return info.titleEn;
    return info.titleKg;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '' });
      
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <FaPhone className="text-lg" />
              {language === 'kg' ? 'Байланыш' : language === 'en' ? 'Contact' : 'Контакты'}
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'kg' ? 'Биз менен байланышыңыз' :
             language === 'en' ? 'Get In Touch' :
             'Свяжитесь с нами'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {language === 'kg' ? 'Суроолоруңуз барбы? Бизге жазыңыз, биз жардам беребиз!' :
             language === 'en' ? 'Have questions? Write to us, we will help!' :
             'Есть вопросы? Напишите нам, мы поможем!'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FaMapPin className="text-orange-500 text-2xl" />
              {language === 'kg' ? 'Байланыш маалыматы' :
               language === 'en' ? 'Contact Information' :
               'Контактная информация'}
            </h3>

            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              const content = (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Icon className="text-2xl text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
                        {getTitle(info)}
                      </h4>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {info.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );

              return info.link ? (
                <a key={index} href={info.link} target="_blank" rel="noopener noreferrer">
                  {content}
                </a>
              ) : (
                content
              );
            })}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {language === 'kg' ? '✉️ Бизге жазыңыз' :
               language === 'en' ? '✉️ Send Us a Message' :
               '✉️ Отправьте нам сообщение'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'kg' ? 'Аты-жөнүңүз *' :
                   language === 'en' ? 'Your Name *' :
                   'Ваше имя *'}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-orange-500 focus:outline-none transition-colors"
                  placeholder={language === 'kg' ? 'Айбек Мамедов' : 'John Doe'}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'kg' ? 'Телефон *' :
                   language === 'en' ? 'Phone *' :
                   'Телефон *'}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-orange-500 focus:outline-none transition-colors"
                  placeholder="+996 555 123 456"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-orange-500 focus:outline-none transition-colors"
                  placeholder="example@mail.com"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'kg' ? 'Билдирүү *' :
                   language === 'en' ? 'Message *' :
                   'Сообщение *'}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-orange-500 focus:outline-none transition-colors resize-none"
                  placeholder={language === 'kg' ? 'Сиздин билдирүүңүз...' : 
                               language === 'en' ? 'Your message...' : 
                               'Ваше сообщение...'}
                ></textarea>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    {language === 'kg' ? 'Жөнөтүлүүдө...' : 
                     language === 'en' ? 'Sending...' : 
                     'Отправляется...'}
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    {language === 'kg' ? 'Жөнөтүү' : 
                     language === 'en' ? 'Send Message' : 
                     'Отправить'}
                  </>
                )}
              </motion.button>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-xl text-center font-semibold"
                >
                  ✅ {language === 'kg' ? 'Билдирүү ийгиликтүү жөнөтүлдү!' :
                       language === 'en' ? 'Message sent successfully!' :
                       'Сообщение успешно отправлено!'}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
