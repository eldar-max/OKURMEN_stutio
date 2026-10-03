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
    <section id="team" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors relative overflow-hidden">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Orange Circle - Top Right */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-full blur-3xl"></div>
        
        {/* Medium Red Circle - Bottom Left */}
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-gradient-to-tr from-red-400/15 to-pink-500/15 rounded-full blur-2xl"></div>
        
        {/* Small Blue Circle - Top Left */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-blue-400/10 to-indigo-500/10 rounded-full blur-xl"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-20 right-1/4 w-32 h-32 border-4 border-orange-300/20 dark:border-orange-500/10 rotate-45"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 border-4 border-red-300/20 dark:border-red-500/10 rounded-full"></div>
        <div className="absolute top-1/2 left-12 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-lg rotate-12"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 dark:from-orange-500/20 dark:to-red-500/20 rounded-full text-orange-600 dark:text-orange-400 font-semibold text-sm border border-orange-200/50 dark:border-orange-500/20">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
              {language === 'ru' ? 'Наша Команда' : language === 'en' ? 'Our Team' : 'Биздин Команда'}
            </span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-400 dark:to-white bg-clip-text text-transparent">
              {t('teamTitle')}
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4 leading-relaxed">
            {t('teamSubtitle')}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-2">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 overflow-hidden group ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl shadow-orange-500/30'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-lg border border-gray-200 dark:border-gray-700'
              }`}
            >
              {/* Animated Background for Active Tab */}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              {/* Hover Effect for Inactive Tabs */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <span className="relative z-10">{getTabLabel(tab)}</span>
            </motion.button>
          ))}
        </div>

        {/* Team Members Grid */}
        {loading ? (
          <GridSkeleton count={8} SkeletonComponent={TeamCardSkeleton} />
        ) : (
          <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
        >
          {getCurrentTeam().map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              {/* Decorative Corner Elements */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-l-4 border-t-4 border-orange-400 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-tl-lg"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-4 border-b-4 border-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-br-lg"></div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 h-full">
                {/* Image Container with Gradient Overlay */}
                <div className="relative h-72 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
                  {teamPhotos[member.id] ? (
                    <>
                      <img
                        src={teamPhotos[member.id]}
                        alt={getName(member)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                        loading="lazy"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-32 h-32">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Floating Badge */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                      <span className="text-xs font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        {activeTab === 'founders' ? '★ Founder' : activeTab === 'mentors' ? '◆ Mentor' : '● Expert'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info Container with Modern Gradient */}
                <div className="relative overflow-hidden">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  </div>
                  
                  <div className="relative bg-gradient-to-br from-orange-500 via-red-500 to-red-600 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2 drop-shadow-lg">
                      {getName(member)}
                    </h3>
                    <p className="text-sm opacity-95 mb-4 font-medium">
                      {getRole(member)}
                      {member.specialty && (
                        <span className="block mt-1 text-xs opacity-80">
                          {member.specialty}
                        </span>
                      )}
                    </p>

                    {/* Modern Details Button */}
                    <button
                      onClick={() => setSelectedMember(member)}
                      className="flex items-center justify-between w-full text-left text-sm font-bold hover:translate-x-2 transition-all duration-300 border-t border-white/30 pt-4 group/btn"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        {getDetailsLabel()}
                      </span>
                      <FaArrowRight className="text-lg group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        )}

        {/* Modal for Details */}
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative Header Background */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-orange-500 via-red-500 to-red-600 opacity-10 rounded-t-3xl"></div>
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-all group"
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>

              <div className="p-6 sm:p-8 relative">
                <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
                  {/* Photo with Badge */}
                  <div className="relative">
                    {teamPhotos[selectedMember.id] ? (
                      <div className="relative">
                        <img
                          src={teamPhotos[selectedMember.id]}
                          alt={getName(selectedMember)}
                          className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover shadow-xl ring-4 ring-white dark:ring-gray-700"
                        />
                        <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          ★ VIP
                        </div>
                      </div>
                    ) : (
                      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900 flex items-center justify-center shadow-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-20 h-20 text-gray-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                      {getName(selectedMember)}
                    </h3>
                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl mb-3 shadow-lg">
                      <p className="text-base font-bold">
                        {getRole(selectedMember)}
                      </p>
                    </div>
                    {selectedMember.specialty && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 px-4 py-2 rounded-lg mt-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <span className="font-semibold">Адистиги:</span> {selectedMember.specialty}
                      </div>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mb-6"></div>

                {selectedMember.bio && (
                  <div className="mb-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-700/30 dark:to-gray-800/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                      </svg>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                        {language === 'ru' ? 'Биография' : language === 'en' ? 'Biography' : 'Биография'}
                      </h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {selectedMember.bio}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    {language === 'ru' ? 'Закрыть' : language === 'en' ? 'Close' : 'Жабуу'}
                  </button>
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
