import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { getTeamByCategory } from '../data/teamData';

function Team() {
  const { t, language } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeTab, setActiveTab] = useState('founders');
  const [selectedMember, setSelectedMember] = useState(null);
  const teams = getTeamByCategory();

  // Получить имя в зависимости от языка
  const getName = (member) => {
    if (language === 'ru') return member.nameRu;
    if (language === 'en') return member.nameEn;
    return member.name;
  };

  // Получить роль в зависимости от языка
  const getRole = (member) => {
    if (language === 'ru') return member.roleRu;
    if (language === 'en') return member.roleEn;
    return member.role;
  };

  // Табы
  const tabs = [
    { id: 'founders', labelKg: 'Негиздөөчүлөр', labelRu: 'Основатели', labelEn: 'Founders' },
    { id: 'mentors', labelKg: 'Менторлор', labelRu: 'Менторы', labelEn: 'Mentors' },
    { id: 'trainers', labelKg: 'Тренерлер', labelRu: 'Тренеры', labelEn: 'Trainers' },
    { id: 'sales', labelKg: 'Сатуу бөлүмү', labelRu: 'Отдел продаж', labelEn: 'Sales Team' },
    { id: 'management', labelKg: 'Башкаруу', labelRu: 'Руководство', labelEn: 'Management' },
  ];

  const getTabLabel = (tab) => {
    if (language === 'ru') return tab.labelRu;
    if (language === 'en') return tab.labelEn;
    return tab.labelKg;
  };

  // Получить текущую команду
  const getCurrentTeam = () => {
    switch (activeTab) {
      case 'founders': return teams.founders;
      case 'mentors': return teams.mentors;
      case 'trainers': return teams.trainers;
      case 'sales': return teams.sales;
      case 'management': return teams.management;
      default: return teams.founders;
    }
  };

  const getDetailsLabel = () => {
    if (language === 'ru') return 'Подробнее';
    if (language === 'en') return 'More details';
    return 'Толугураак';
  };

  return (
    <section id="team" className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
            {t('teamTitle')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
            {t('teamSubtitle')}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12 px-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {getTabLabel(tab)}
            </button>
          ))}
        </div>

        {/* Team Members Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {getCurrentTeam().map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Image Container */}
              <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
                <img
                  src={member.photo}
                  alt={getName(member)}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center text-6xl text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-32 h-32">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                      </div>
                    `;
                  }}
                />
              </div>

              {/* Info Container with Blue Gradient */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <h3 className="text-lg font-bold mb-2">
                  {getName(member)}
                </h3>
                <p className="text-sm opacity-90 mb-4">
                  {getRole(member)}
                  {member.specialty && ` • ${member.specialty}`}
                </p>

                {/* Details Button */}
                <button
                  onClick={() => setSelectedMember(member)}
                  className="flex items-center justify-between w-full text-left text-sm font-semibold hover:translate-x-1 transition-transform duration-200 border-t border-white/30 pt-4"
                >
                  <span>{getDetailsLabel()}</span>
                  <FaArrowRight className="text-lg" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal for Details */}
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-6 mb-6">
                <img
                  src={selectedMember.photo}
                  alt={getName(selectedMember)}
                  className="w-32 h-32 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {getName(selectedMember)}
                  </h3>
                  <p className="text-lg text-blue-600 dark:text-blue-400 mb-2">
                    {getRole(selectedMember)}
                  </p>
                  {selectedMember.specialty && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Адистиги: {selectedMember.specialty}
                    </p>
                  )}
                </div>
              </div>

              {selectedMember.bio && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Биография
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedMember.bio}
                  </p>
                </div>
              )}

              <button
                onClick={() => setSelectedMember(null)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                {language === 'ru' ? 'Закрыть' : language === 'en' ? 'Close' : 'Жабуу'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Team;
        >
          {getCurrentTeam().map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
            >
              {/* Photo */}
              <div className="relative aspect-square bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800 overflow-hidden">
                {member.image ? (
                  <img
                    src={`/src/assets/team/${member.image}`}
                    alt={getName(member)}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback если фото не найдено
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="flex items-center justify-center h-full">
                          <svg class="w-32 h-32 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                          </svg>
                        </div>
                      `;
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <FaUserTie className="text-6xl sm:text-7xl text-orange-600" />
                  </div>
                )}
                
                {/* Badge */}
                {member.category === 'founder' && (
                  <div className="absolute top-3 right-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ⭐ {language === 'kg' ? 'Негиздөөчү' : language === 'en' ? 'Founder' : 'Основатель'}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 dark:text-white line-clamp-2">
                  {getName(member)}
                </h3>
                <p className="text-orange-600 dark:text-orange-400 font-semibold mb-2 text-sm sm:text-base line-clamp-2">
                  {getRole(member)}
                </p>
                
                {member.experience && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {language === 'kg' ? '⏱️ Тажрыйба: ' : language === 'en' ? '⏱️ Experience: ' : '⏱️ Опыт: '}
                      <span className="font-semibold">{member.experience}</span>
                    </p>
                  </div>
                )}

                {member.sector && (
                  <div className="mt-2">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {language === 'kg' ? '🏢 Сектор: ' : language === 'en' ? '🏢 Sector: ' : '🏢 Сектор: '}
                      <span className="font-semibold text-orange-600">{member.sector}</span>
                    </p>
                  </div>
                )}

                {member.startDate && (
                  <div className="mt-2">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {language === 'kg' ? '📅 Башталган күн: ' : language === 'en' ? '📅 Start Date: ' : '📅 Дата начала: '}
                      <span className="font-semibold">{member.startDate}</span>
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {getCurrentTeam().length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {language === 'kg' ? 'Бул бөлүмдө маалымат жок' : language === 'en' ? 'No data in this section' : 'Нет данных в этом разделе'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Team;
