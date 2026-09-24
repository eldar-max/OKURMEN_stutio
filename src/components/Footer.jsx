import { motion } from 'framer-motion';
import { 
  FaFacebook, FaInstagram, FaYoutube, FaTelegram, FaWhatsapp,
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock 
} from 'react-icons/fa';

function Footer() {
  const socialLinks = [
    { icon: FaFacebook, url: '#', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: FaInstagram, url: '#', label: 'Instagram', color: 'hover:text-pink-600' },
    { icon: FaYoutube, url: '#', label: 'YouTube', color: 'hover:text-red-600' },
    { icon: FaTelegram, url: '#', label: 'Telegram', color: 'hover:text-blue-500' },
    { icon: FaWhatsapp, url: '#', label: 'WhatsApp', color: 'hover:text-green-600' },
  ];

  const quickLinks = [
    { name: 'О нас', href: '#about' },
    { name: 'Курсы', href: '#courses' },
    { name: 'Команда', href: '#team' },
    { name: 'Студенты', href: '#students' },
    { name: 'Отзывы', href: '#testimonials' },
  ];

  const courses = [
    { name: 'Frontend Development', href: '#courses' },
    { name: 'Backend Development', href: '#courses' },
    { name: 'UX/UI Design', href: '#courses' },
    { name: 'Англис тили', href: '#courses' },
    { name: 'Оратордук', href: '#courses' },
  ];

  return (
    <footer id="contact" className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">О</span>
                </div>
                <span className="text-2xl font-bold">ОКУРМЭН</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Билимден мүмкүнчүлүккө карай. Заманбап технологияларды үйрөнүп, келечегиңди түз!
              </p>
            </motion.div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  whileHover={{ scale: 1.2, y: -5 }}
                  className={`text-gray-400 ${social.color} transition-colors`}
                  aria-label={social.label}
                >
                  <social.icon className="text-2xl" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Быстрые ссылки</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors hover:translate-x-2 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-xl font-bold mb-6">Курсы</h3>
            <ul className="space-y-3">
              {courses.map((course, index) => (
                <li key={index}>
                  <a
                    href={course.href}
                    className="text-gray-400 hover:text-white transition-colors hover:translate-x-2 inline-block"
                  >
                    {course.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Контакты</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">г. Бишкек, Кыргызстан</p>
                  <p className="text-sm text-gray-500">Наш адрес</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <FaPhone className="text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <a href="tel:+996" className="text-gray-400 hover:text-white">
                    +996 XXX XXX XXX
                  </a>
                  <p className="text-sm text-gray-500">Позвоните нам</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <FaEnvelope className="text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <a href="mailto:info@okurmen.kg" className="text-gray-400 hover:text-white">
                    info@okurmen.kg
                  </a>
                  <p className="text-sm text-gray-500">Напишите нам</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <FaClock className="text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">Пн-Пт: 9:00 - 18:00</p>
                  <p className="text-sm text-gray-500">Время работы</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 ОКУРМЭН. Все права защищены.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Условия использования
              </a>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Основано в 2022 году • Санжарбек Мадумар & Улукбек Бакыбек уулу
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
