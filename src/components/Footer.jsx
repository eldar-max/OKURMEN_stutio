import { motion } from 'framer-motion';
import { 
  FaFacebook, FaInstagram, FaYoutube, FaTelegram, FaWhatsapp,
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock 
} from 'react-icons/fa';
import logo from '../assets/5309874850258165398_121.jpg';
import { useLanguage } from '../context/LanguageContext';

function Footer() {
  const { t } = useLanguage();
  const socialLinks = [
    { icon: FaFacebook, url: 'https://www.facebook.com/it.stuio', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: FaInstagram, url: 'https://www.instagram.com/okurmen_studio/', label: 'Instagram', color: 'hover:text-pink-600' },
    { icon: FaYoutube, url: 'https://www.youtube.com/@Okurmen_edu', label: 'YouTube', color: 'hover:text-red-600' },
    { icon: FaTelegram, url: 'https://t.me/OKURKIDSBOT', label: 'Telegram', color: 'hover:text-blue-500' },
    { icon: FaWhatsapp, url: 'https://wa.me/996702038656', label: 'WhatsApp', color: 'hover:text-green-600' },
  ];

  const quickLinks = [
    { name: t('about'), href: '#about' },
    { name: t('courses'), href: '#courses' },
    { name: t('teamTitle'), href: '#team' },
    { name: t('graduatesTitle'), href: '#students' },
    { name: t('testimonialsTitle'), href: '#testimonials' },
  ];

  const courses = [
    { name: 'Frontend Development', href: '#courses' },
    { name: 'Backend Development', href: '#courses' },
    { name: 'UX/UI Design', href: '#courses' },
    { name: 'Оратордук', href: '#courses' },
  ];

  return (
    <footer id="contact" className="bg-gradient-to-br from-orange-900 via-orange-800 to-orange-900 dark:from-orange-950 dark:via-orange-900 dark:to-orange-950 text-white pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8 md:pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-4 sm:mb-6"
            >
              <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-black flex items-center justify-center shadow-lg">
                  <img src={logo} alt="OKURMEN" className="w-full h-full object-cover" />
                </div>
                <span className="text-xl sm:text-2xl font-bold">ОКУРМЭН</span>
              </div>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                {t('footerAboutText')}
              </p>
            </motion.div>

            {/* Social Links */}
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target={social.url !== '#' ? '_blank' : '_self'}
                  rel={social.url !== '#' ? 'noopener noreferrer' : ''}
                  whileHover={{ scale: 1.2, y: -5 }}
                  className={`text-gray-400 ${social.color} transition-colors text-orange-500 hover:text-orange-600`}
                  aria-label={social.label}
                >
                  <social.icon className="text-xl sm:text-2xl" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">{t('quickLinks')}</h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors hover:translate-x-2 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">{t('courses')}</h3>
            <ul className="space-y-2 sm:space-y-3">
              {courses.map((course, index) => (
                <li key={index}>
                  <a
                    href={course.href}
                    className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors hover:translate-x-2 inline-block"
                  >
                    {course.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">{t('contacts')}</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-blue-500 mt-1 flex-shrink-0 text-sm sm:text-base" />
                <div>
                  <p className="text-sm sm:text-base text-gray-400">г. Бишкек, Кыргызстан</p>
                  <p className="text-xs sm:text-sm text-gray-500">{t('ourAddress')}</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <FaPhone className="text-green-500 mt-1 flex-shrink-0 text-sm sm:text-base" />
                <div>
                  <a href="tel:+996" className="text-sm sm:text-base text-gray-400 hover:text-white">
                    +996 XXX XXX XXX
                  </a>
                  <p className="text-xs sm:text-sm text-gray-500">{t('callUs')}</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <FaEnvelope className="text-red-500 mt-1 flex-shrink-0 text-sm sm:text-base" />
                <div>
                  <a href="mailto:info@okurmen.kg" className="text-sm sm:text-base text-gray-400 hover:text-white break-all">
                    info@okurmen.kg
                  </a>
                  <p className="text-xs sm:text-sm text-gray-500">{t('writeUs')}</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <FaClock className="text-yellow-500 mt-1 flex-shrink-0 text-sm sm:text-base" />
                <div>
                  <p className="text-sm sm:text-base text-gray-400">{t('mondayFriday')} {t('mondayFridayTime')}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{t('workingHours')}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              © 2024 ОКУРМЭН. {t('allRightsReserved')}.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-400 text-center">
              <a href="#" className="hover:text-white transition-colors">
                {t('privacyPolicy')}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {t('termsOfUse')}
              </a>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-gray-500 text-xs sm:text-sm px-4">
              {t('foundedIn')} 2022 • Санжарбек Мадумар & Улукбек Бакыбек уулу
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
