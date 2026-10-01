import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { 
  FaBuilding, FaLaptop, FaGlobe, FaRocket, 
  FaLaptopCode, FaPaintBrush, FaCode, FaMoneyBillWave
} from 'react-icons/fa';
import BookingModal from './BookingModal';

function Graduates() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const companies = [
    { name: 'Бишкек Мэриясы', icon: FaBuilding, employees: 15 },
    { name: 'IT Компании (KG)', icon: FaLaptop, employees: 50 },
    { name: 'IT Компании (KZ)', icon: FaGlobe, employees: 30 },
    { name: 'Куликовский', icon: FaBuilding, employees: 10 },
    { name: 'Фриланс', icon: FaLaptopCode, employees: 100 },
    { name: 'Стартапы', icon: FaRocket, employees: 25 },
  ];

  const graduates = [
    {
      name: 'Айбек М.',
      role: 'Frontend Developer',
      company: 'IT Company KZ',
      icon: FaLaptopCode,
      year: '2023',
      salary: '$800',
    },
    {
      name: 'Нурбек К.',
      role: 'Backend Developer',
      company: 'Бишкек Мэриясы',
      icon: FaCode,
      year: '2024',
      salary: '45000 сом',
    },
    {
      name: 'Асель Б.',
      role: 'Freelance Developer',
      company: 'Самозанятая',
      icon: FaGlobe,
      year: '2024',
      salary: '$500-1000',
    },
  ];

  return (
    <section id="graduates" className="py-20 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
              Наши выпускники
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Они уже работают в ведущих компаниях и зарабатывают
          </p>
        </motion.div>

        {/* Companies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Где работают наши выпускники</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {companies.map((company, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 rounded-2xl p-6 text-center shadow-lg"
              >
                <company.icon className="text-5xl text-orange-600 mb-3 mx-auto" />
                <div className="font-semibold text-sm mb-2 text-gray-800 dark:text-white">{company.name}</div>
                <div className="text-2xl font-bold text-orange-600">{company.employees}+</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Graduate Stories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-center mb-8">Истории успеха</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {graduates.map((graduate, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-800 border-2 border-orange-100 dark:border-gray-700 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all"
              >
                <graduate.icon className="text-6xl text-orange-600 mb-3 mx-auto" />
                <h4 className="text-xl font-bold mb-1 text-gray-800 dark:text-white">{graduate.name}</h4>
                <p className="text-orange-600 font-semibold mb-2">{graduate.role}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{graduate.company}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 px-3 py-1 rounded-full font-semibold">
                    {graduate.year}
                  </span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                    <FaMoneyBillWave />
                    {graduate.salary}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 rounded-3xl p-12 text-white text-center"
        >
          <h3 className="text-4xl font-bold mb-4">Стань следующим успешным выпускником!</h3>
          <p className="text-xl mb-8 opacity-90">
            Присоединяйся к 3000+ студентам, которые уже меняют свою жизнь
          </p>
          <motion.button
            onClick={() => setBookingModalOpen(true)}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 255, 255, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-white text-orange-600 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group"
          >
            <span className="relative z-10">Записаться на курс</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-orange-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </motion.button>
        </motion.div>
      </div>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </section>
  );
}

export default Graduates;
