import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { FaQuoteLeft, FaStar, FaUser, FaUserTie } from 'react-icons/fa';
import BookingModal from './BookingModal';

function Testimonials() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeTab, setActiveTab] = useState('students');

  const studentTestimonials = [
    {
      name: 'Айбек Осмонов',
      role: 'Frontend Developer',
      company: 'IT Company',
      rating: 5,
      text: 'ОКУРМЭН мага кесипти өздөштүрүүгө жардам берди. Азыр иштеп жатам жана киреше табам!',
      course: 'Frontend Development',
    },
    {
      name: 'Гүлнара Сатыбалдиева',
      role: 'UX/UI Designer',
      company: 'Startup',
      rating: 5,
      text: 'Гибриддик формат абдан ыңгайлуу болду. Үйдөн окуп, ментор менен иштедим.',
      course: 'UX/UI Design',
    },
    {
      name: 'Нурбек Касымов',
      role: 'Backend Developer',
      company: 'Бишкек Мэриясы',
      rating: 5,
      text: 'Мугалимдердин деңгээли өтө жогору. Америкалык тажрыйбаны бөлүшүшөт.',
      course: 'Backend Development',
    },
    {
      name: 'Асель Бекмурзаева',
      role: 'Freelancer',
      company: 'Самозанятая',
      rating: 5,
      text: 'Окуп жатып эле фрилансте иштей баштадым. Мыкты билим беришет!',
      course: 'Frontend Development',
    },
  ];

  const parentTestimonials = [
    {
      name: 'Жамила апа',
      relation: 'Мать студента',
      student: 'Баласы: Азамат',
      rating: 5,
      text: 'Уулумдун өзгөрүшүн көрүп жатам. Окууга кызыгып, максаты пайда болду.',
    },
    {
      name: 'Асан ага',
      relation: 'Отец студентки',
      student: 'Кызы: Айгүл',
      rating: 5,
      text: 'ОКУРМЭНге чоң ыраазымын. Кызым азыр өзү киреше таба баштады.',
    },
    {
      name: 'Бүбүсара эже',
      relation: 'Мать студента',
      student: 'Баласы: Эрлан',
      rating: 5,
      text: 'Балам үчүн мыкты мүмкүнчүлүк. Тренерлер абдан жакшы сабак беришет.',
    },
  ];

  const activeTestimonials = activeTab === 'students' ? studentTestimonials : parentTestimonials;

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
              Отзывы
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Что говорят наши студенты и их родители
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('students')}
            className={`px-8 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'students'
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:shadow-md'
            }`}
          >
            <FaUser />
            Студенты
          </button>
          <button
            onClick={() => setActiveTab('parents')}
            className={`px-8 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'parents'
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:shadow-md'
            }`}
          >
            <FaUserTie />
            Родители
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {activeTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all"
            >
              <FaQuoteLeft className="text-4xl text-orange-200 mb-4" />
              
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xl" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white">{testimonial.name}</h4>
                    {activeTab === 'students' ? (
                      <>
                        <p className="text-orange-600 text-sm font-semibold">{testimonial.role}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.company}</p>
                        <p className="text-orange-600 text-xs mt-1">{testimonial.course}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.relation}</p>
                        <p className="text-orange-600 text-sm">{testimonial.student}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-2xl text-gray-700 dark:text-gray-300 mb-6">
            Присоединяйтесь к тысячам успешных студентов!
          </p>
          <motion.button
            onClick={() => setBookingModalOpen(true)}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(249, 115, 22, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group"
          >
            <span className="relative z-10">Записаться на курс</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
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

export default Testimonials;
