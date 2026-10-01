import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { FaUserTie, FaChalkboardTeacher, FaUserGraduate, FaUsers, FaPhone, FaBullhorn } from 'react-icons/fa';

function Team() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeTab, setActiveTab] = useState('founders');

  const founders = [
    {
      name: 'Санжарбек Мадумар',
      role: 'Со-основатель',
      icon: FaUserTie,
      description: 'Визионер и лидер проекта',
    },
    {
      name: 'Улукбек Бакыбек уулу',
      role: 'Со-основатель',
      icon: FaUserTie,
      description: 'Эксперт в образовании',
    },
  ];

  const trainers = [
    {
      name: 'Айзада Акылбекова',
      role: 'Главный тренер по Frontend',
      icon: FaChalkboardTeacher,
      description: 'Работает в США, эксперт с многолетним опытом',
      expertise: ['React', 'TypeScript', 'Next.js'],
      experience: [
        { company: 'Google', position: 'Senior Frontend Developer', logo: '🔵' },
        { company: 'Microsoft', position: 'UI/UX Engineer', logo: '🟦' },
      ],
      years: '8 лет опыта',
    },
    {
      name: 'Азамат Токтосунов',
      role: 'Backend тренер',
      icon: FaChalkboardTeacher,
      description: 'Специалист по серверным технологиям',
      expertise: ['Node.js', 'Python', 'PostgreSQL'],
      experience: [
        { company: 'Yandex', position: 'Backend Developer', logo: '🔴' },
        { company: 'Amazon', position: 'Cloud Engineer', logo: '🟠' },
      ],
      years: '7 лет опыта',
    },
    {
      name: 'Динара Исакова',
      role: 'UX/UI Design Lead',
      icon: FaChalkboardTeacher,
      description: 'Эксперт в дизайне интерфейсов',
      expertise: ['Figma', 'Adobe XD', 'UI/UX'],
      experience: [
        { company: 'Apple', position: 'UI Designer', logo: '⚫' },
        { company: 'Airbnb', position: 'Product Designer', logo: '🔴' },
      ],
      years: '6 лет опыта',
    },
    {
      name: 'Бакыт Асанов',
      role: 'Mobile Development',
      icon: FaChalkboardTeacher,
      description: 'Специалист по мобильной разработке',
      expertise: ['React Native', 'Flutter', 'iOS/Android'],
      experience: [
        { company: 'Spotify', position: 'Mobile Developer', logo: '🟢' },
        { company: 'Uber', position: 'iOS Engineer', logo: '⚫' },
      ],
      years: '5 лет опыта',
    },
  ];

  const mentors = [
    {
      name: 'Ментор 1',
      role: 'Frontend ментор',
      icon: FaUserGraduate,
      students: 50,
    },
    {
      name: 'Ментор 2',
      role: 'Backend ментор',
      icon: FaUserGraduate,
      students: 45,
    },
    {
      name: 'Ментор 3',
      role: 'Design ментор',
      icon: FaUserGraduate,
      students: 40,
    },
  ];

  const staff = [
    { role: 'Менеджеры', icon: FaUsers, count: 5 },
    { role: 'Отдел продаж', icon: FaPhone, count: 8 },
    { role: 'Маркетинг', icon: FaBullhorn, count: 4 },
  ];

  return (
    <section id="team" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
              Наша команда
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
            Профессионалы, которые помогут вам достичь успеха
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12 px-2">
          {[
            { id: 'founders', label: 'Основатели' },
            { id: 'trainers', label: 'Тренеры' },
            { id: 'mentors', label: 'Менторы' },
            { id: 'staff', label: 'Персонал' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full font-semibold text-sm sm:text-base transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Founders */}
        {activeTab === 'founders' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto"
          >
            {founders.map((founder, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center shadow-lg"
              >
                <founder.icon className="text-6xl sm:text-7xl md:text-8xl text-orange-600 mb-3 sm:mb-4 mx-auto" />
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800 dark:text-white">{founder.name}</h3>
                <p className="text-orange-600 font-semibold mb-2 text-sm sm:text-base">{founder.role}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{founder.description}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Trainers */}
        {activeTab === 'trainers' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          >
            {trainers.map((trainer, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-orange-100 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-500 transition-all"
              >
                <div className="text-center mb-4 sm:mb-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <trainer.icon className="text-4xl sm:text-5xl text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800 dark:text-white">{trainer.name}</h3>
                  <p className="text-orange-600 font-semibold mb-2 text-sm sm:text-base">{trainer.role}</p>
                  <span className="inline-block px-3 sm:px-4 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 rounded-full text-xs sm:text-sm font-semibold">
                    {trainer.years}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 text-center text-sm sm:text-base">{trainer.description}</p>

                {/* Experience */}
                <div className="mb-3 sm:mb-4">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3 text-center">Опыт работы:</h4>
                  <div className="space-y-2">
                    {trainer.experience.map((exp, idx) => (
                      <div key={idx} className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 rounded-lg p-2 sm:p-3 flex items-center space-x-2 sm:space-x-3">
                        <span className="text-2xl sm:text-3xl flex-shrink-0">{exp.logo}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-800 dark:text-white text-sm sm:text-base truncate">{exp.company}</p>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">{exp.position}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expertise */}
                {trainer.expertise && (
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 text-center">Технологии:</h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
                      {trainer.expertise.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 sm:px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-xs sm:text-sm font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Mentors */}
        {activeTab === 'mentors' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {mentors.map((mentor, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 text-center shadow-lg"
              >
                <mentor.icon className="text-5xl sm:text-6xl md:text-7xl text-orange-600 mb-2 sm:mb-3 mx-auto" />
                <h3 className="text-lg sm:text-xl font-bold mb-1 text-gray-800 dark:text-white">{mentor.name}</h3>
                <p className="text-orange-600 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">{mentor.role}</p>
                <div className="bg-white dark:bg-gray-800 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 inline-block">
                  <span className="font-bold text-orange-600 text-sm sm:text-base">{mentor.students}+</span>
                  <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm ml-1">студентов</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Staff */}
        {activeTab === 'staff' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto"
          >
            {staff.map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center text-white shadow-xl"
              >
                <member.icon className="text-5xl sm:text-6xl mb-2 sm:mb-3 mx-auto" />
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{member.role}</h3>
                <div className="text-3xl sm:text-4xl font-bold">{member.count}</div>
                <p className="text-orange-100 text-sm sm:text-base">специалистов</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Team;
