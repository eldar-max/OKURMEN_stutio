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
      role: 'Главный тренер',
      icon: FaChalkboardTeacher,
      description: 'Работает в США, эксперт с многолетним опытом',
      expertise: ['Frontend', 'UX/UI', 'React'],
    },
    {
      name: 'Тренер 2',
      role: 'Backend тренер',
      icon: FaChalkboardTeacher,
      description: 'Специалист по серверным технологиям',
      expertise: ['Node.js', 'Python', 'Databases'],
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
    <section id="team" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Наша команда
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Профессионалы, которые помогут вам достичь успеха
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { id: 'founders', label: 'Основатели' },
            { id: 'trainers', label: 'Тренеры' },
            { id: 'mentors', label: 'Менторы' },
            { id: 'staff', label: 'Персонал' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
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
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {founders.map((founder, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 text-center shadow-lg"
              >
                <founder.icon className="text-8xl text-blue-600 mb-4 mx-auto" />
                <h3 className="text-2xl font-bold mb-2">{founder.name}</h3>
                <p className="text-blue-600 font-semibold mb-2">{founder.role}</p>
                <p className="text-gray-600">{founder.description}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Trainers */}
        {activeTab === 'trainers' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {trainers.map((trainer, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-3xl p-8 shadow-lg border-2 border-blue-100"
              >
                <trainer.icon className="text-8xl text-purple-600 mb-4 mx-auto text-center" />
                <h3 className="text-2xl font-bold mb-2 text-center">{trainer.name}</h3>
                <p className="text-purple-600 font-semibold mb-3 text-center">{trainer.role}</p>
                <p className="text-gray-600 mb-4 text-center">{trainer.description}</p>
                {trainer.expertise && (
                  <div className="flex flex-wrap gap-2 justify-center">
                    {trainer.expertise.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
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
            className="grid md:grid-cols-3 gap-8"
          >
            {mentors.map((mentor, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center shadow-lg"
              >
                <mentor.icon className="text-7xl text-purple-600 mb-3 mx-auto" />
                <h3 className="text-xl font-bold mb-1">{mentor.name}</h3>
                <p className="text-purple-600 font-semibold mb-3">{mentor.role}</p>
                <div className="bg-white rounded-full px-4 py-2 inline-block">
                  <span className="font-bold text-blue-600">{mentor.students}+</span>
                  <span className="text-gray-600 text-sm ml-1">студентов</span>
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
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {staff.map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl p-8 text-center text-white shadow-xl"
              >
                <member.icon className="text-6xl mb-3 mx-auto" />
                <h3 className="text-2xl font-bold mb-2">{member.role}</h3>
                <div className="text-4xl font-bold">{member.count}</div>
                <p className="text-blue-100">специалистов</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Team;
