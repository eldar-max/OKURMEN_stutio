import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { getTeamByCategory } from '../data/teamData';
import { getTeamPortraits, cacheImage, getCachedImage } from '../services/unsplashService';
import { TeamCardSkeleton, GridSkeleton } from './SkeletonLoader';

function Team() {
  const { t, language } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeTab, setActiveTab] = useState('founders');
  const [selectedMember, setSelectedMember] = useState(null);
  const [teamPhotos, setTeamPhotos] = useState({});
  const [loading, setLoading] = useState(true);
  const teams = getTeamByCategory();

  // Загрузка профессиональных фотографий команды
  useEffect(() => {
    const loadTeamPhotos = async () => {
      setLoading(true);
      // Проверяем кэш
      const cachedPhotos = getCachedImage('team_portraits_all');
      if (cachedPhotos) {
        setTeamPhotos(JSON.parse(cachedPhotos));
        setLoading(false);
        return;
      }

      try {
        // Получаем 21 профессиональное фото
        const photos = await getTeamPortraits(21);
        const photosMap = {};
        
        // Распределяем фото по членам команды
        let photoIndex = 0;
        Object.values(teams).forEach(teamCategory => {
          teamCategory.forEach(member => {
            if (photos[photoIndex]) {
              photosMap[member.id] = photos[photoIndex];
              photoIndex++;
            }
          });
        });

        setTeamPhotos(photosMap);
        cacheImage('team_portraits_all', JSON.stringify(photosMap));
      } catch (error) {
        console.error('Failed to load team photos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTeamPhotos();
  }, []);

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
    <section id="team" className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900 transition-colors relative overflow-hidden">
      {/* Large Geometric Shapes Background - Similar to Reference */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-80">
        {/* Large Red Parallelogram - Left */}
        <div 
          className="absolute -left-32 top-1/4 w-[500px] h-[600px] bg-red-600 dark:bg-red-700"
          style={{ transform: 'skewX(-20deg)' }}
        ></div>
        
        {/* Large Orange Parallelogram - Center */}
        <div 
          className="absolute left-1/4 top-1/3 w-[400px] h-[550px] bg-orange-500 dark:bg-orange-600"
          style={{ transform: 'skewX(-20deg)' }}
        ></div>
        
        {/* Medium Red Parallelogram - Right Center */}
        <div 
          className="absolute right-1/4 top-1/4 w-[450px] h-[580px] bg-red-500 dark:bg-red-600"
          style={{ transform: 'skewX(-20deg)' }}
        ></div>
        
        {/* Large Orange Parallelogram - Right */}
        <div 
          className="absolute right-0 top-1/3 w-[420px] h-[600px] bg-orange-400 dark:bg-orange-500"
          style={{ transform: 'skewX(-20deg) translateX(100px)' }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
            {t('teamTitle')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4 leading-relaxed">
            {t('teamSubtitle')}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-2">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-xl'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-lg border-2 border-gray-200 dark:border-gray-700'
              }`}
            >
              {getTabLabel(tab)}
            </motion.button>
          ))}
        </div>

        {/* Team Members Grid */}
        {loading ? (
          <GridSkeleton count={8} SkeletonComponent={TeamCardSkeleton} />
        ) : (
          <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Team Members as Grayscale Photos with Geometric Background */}
          <div className="flex flex-wrap justify-center items-end gap-4 sm:gap-6 lg:gap-8 min-h-[400px] sm:min-h-[500px]">
            {getCurrentTeam().slice(0, 4).map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="relative group cursor-pointer"
                onClick={() => setSelectedMember(member)}
                style={{ 
                  zIndex: 10 + index,
                  marginBottom: index % 2 === 0 ? '0' : '40px'
                }}
              >
                {/* Team Member Photo */}
                <div className="relative w-48 h-64 sm:w-56 sm:h-80 md:w-64 md:h-96 overflow-hidden">
                  {teamPhotos[member.id] ? (
                    <img
                      src={teamPhotos[member.id]}
                      alt={getName(member)}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center grayscale">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-32 h-32 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <div className="text-center text-white px-4">
                      <p className="text-sm font-bold mb-1">{getName(member)}</p>
                      <p className="text-xs opacity-90">{getRole(member)}</p>
                    </div>
                  </div>
                </div>

                {/* Info Below Photo */}
                <div className="mt-4 text-center">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {getName(member)}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {getRole(member)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Show More Members Button if there are more than 4 */}
          {getCurrentTeam().length > 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-12"
            >
              <button
                onClick={() => setSelectedMember(getCurrentTeam()[0])}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-lg hover:scale-105 transition-transform shadow-xl"
              >
                <span>{language === 'ru' ? 'Показать всех' : language === 'en' ? 'View All' : 'Баарын көрүү'}</span>
                <FaArrowRight />
              </button>
            </motion.div>
          )}
        </motion.div>
        )}

        {/* Modal for All Team Members */}
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:scale-110 flex items-center justify-center transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>

              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {language === 'ru' ? 'Вся команда' : language === 'en' ? 'Full Team' : 'Бүтүндөй команда'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {getTabLabel(tabs.find(t => t.id === activeTab))}
                  </p>
                </div>

                {/* Grid of All Team Members */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {getCurrentTeam().map((member) => (
                    <div key={member.id} className="text-center group">
                      <div className="relative w-full aspect-[3/4] mb-3 overflow-hidden rounded-lg">
                        {teamPhotos[member.id] ? (
                          <img
                            src={teamPhotos[member.id]}
                            alt={getName(member)}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16 text-gray-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                        {getName(member)}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {getRole(member)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Team;
