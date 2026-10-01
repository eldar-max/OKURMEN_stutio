import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaLinkedin, FaInstagram, FaTelegram, FaQuoteLeft } from 'react-icons/fa';

function Founders() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const founders = [
    {
      name: 'Санжарбек Мадумар',
      role: 'Со-основатель и CEO',
      image: 'https://ui-avatars.com/api/?name=Санжарбек+Мадумар&size=400&background=3b82f6&color=fff&bold=true',
      bio: 'Опыт в IT более 10 лет. Работал в крупных международных компаниях. Основал ОКУРМЭН с целью дать качественное IT-образование молодежи Кыргызстана.',
      quote: 'Образование - это ключ к успеху. Наша миссия - открыть эту дверь для каждого.',
      social: {
        linkedin: '#',
        instagram: '#',
        telegram: '#',
      },
      achievements: [
        'Более 500 выпускников',
        'Партнерство с 20+ IT-компаниями',
        'Автор образовательных программ',
      ],
    },
    {
      name: 'Улукбек Бакыбек уулу',
      role: 'Со-основатель и CTO',
      image: 'https://ui-avatars.com/api/?name=Улукбек+Бакыбек&size=400&background=8b5cf6&color=fff&bold=true',
      bio: 'Senior разработчик с 12-летним опытом. Специалист в области веб-разработки и архитектуры приложений. Преподает уже 5 лет.',
      quote: 'Лучший способ учиться - это делать. Мы учим через практику и реальные проекты.',
      social: {
        linkedin: '#',
        instagram: '#',
        telegram: '#',
      },
      achievements: [
        'Опыт в Google и Yandex',
        '50+ успешных проектов',
        'Ментор для 200+ студентов',
      ],
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
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
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Наши основатели
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Люди, которые создали ОКУРМЭН и меняют жизни студентов каждый день
          </p>
        </motion.div>

        {/* Founders */}
        <div className="space-y-16">
          {founders.map((founder, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.3, duration: 0.8 }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 items-center`}
            >
              {/* Image */}
              <div className="lg:w-1/2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl transform rotate-6 group-hover:rotate-12 transition-transform"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl p-2">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full aspect-square object-cover rounded-2xl"
                    />
                  </div>
                  {/* Social Links */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
                    <a
                      href={founder.social.linkedin}
                      className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-blue-600 hover:bg-white transition-colors"
                    >
                      <FaLinkedin className="text-xl" />
                    </a>
                    <a
                      href={founder.social.instagram}
                      className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-pink-600 hover:bg-white transition-colors"
                    >
                      <FaInstagram className="text-xl" />
                    </a>
                    <a
                      href={founder.social.telegram}
                      className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-blue-500 hover:bg-white transition-colors"
                    >
                      <FaTelegram className="text-xl" />
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Content */}
              <div className="lg:w-1/2 space-y-6">
                <div>
                  <h3 className="text-4xl font-bold mb-2">{founder.name}</h3>
                  <p className="text-xl text-blue-300 font-semibold">{founder.role}</p>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed">
                  {founder.bio}
                </p>

                {/* Quote */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <FaQuoteLeft className="text-3xl text-blue-400 mb-3" />
                  <p className="text-white italic text-lg">
                    "{founder.quote}"
                  </p>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="text-xl font-bold mb-4 text-blue-300">Достижения:</h4>
                  <ul className="space-y-2">
                    {founder.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg
                          className="w-6 h-6 text-green-400 mr-3 flex-shrink-0 mt-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-300">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <h3 className="text-3xl font-bold mb-6">Наша команда</h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Вместе с нашими основателями работает команда из 12+ опытных преподавателей, менторов и менеджеров, которые делают обучение эффективным и комфортным.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/5 rounded-2xl p-6">
                <div className="text-4xl font-bold text-blue-400 mb-2">12+</div>
                <div className="text-gray-300">Преподавателей</div>
              </div>
              <div className="bg-white/5 rounded-2xl p-6">
                <div className="text-4xl font-bold text-purple-400 mb-2">5+</div>
                <div className="text-gray-300">Менеджеров</div>
              </div>
              <div className="bg-white/5 rounded-2xl p-6">
                <div className="text-4xl font-bold text-green-400 mb-2">3+</div>
                <div className="text-gray-300">Маркетологов</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Founders;
