import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { 
  FaReact, 
  FaNodeJs, 
  FaDatabase, 
  FaHtml5, 
  FaCss3Alt, 
  FaJs, 
  FaPython,
  FaGitAlt,
  FaDocker,
  FaAws
} from 'react-icons/fa';
import { 
  SiMongodb, 
  SiPostgresql, 
  SiTailwindcss, 
  SiTypescript,
  SiExpress,
  SiFirebase,
  SiVercel,
  SiVite,
  SiPrisma
} from 'react-icons/si';

function TechStack() {
  const { t } = useLanguage();

  const technologies = [
    // Frontend
    { name: 'React', icon: FaReact, color: '#61DAFB', category: 'frontend' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', category: 'frontend' },
    { name: 'JavaScript', icon: FaJs, color: '#F7DF1E', category: 'frontend' },
    { name: 'HTML5', icon: FaHtml5, color: '#E34F26', category: 'frontend' },
    { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6', category: 'frontend' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', category: 'frontend' },
    { name: 'Vite', icon: SiVite, color: '#646CFF', category: 'frontend' },
    
    // Backend
    { name: 'Node.js', icon: FaNodeJs, color: '#339933', category: 'backend' },
    { name: 'Express', icon: SiExpress, color: '#000000', category: 'backend' },
    { name: 'Python', icon: FaPython, color: '#3776AB', category: 'backend' },
    { name: 'Firebase', icon: SiFirebase, color: '#FFCA28', category: 'backend' },
    
    // Database
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248', category: 'database' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', category: 'database' },
    { name: 'Prisma', icon: SiPrisma, color: '#2D3748', category: 'database' },
    
    // Tools
    { name: 'Git', icon: FaGitAlt, color: '#F05032', category: 'tools' },
    { name: 'Docker', icon: FaDocker, color: '#2496ED', category: 'tools' },
    { name: 'AWS', icon: FaAws, color: '#FF9900', category: 'tools' },
    { name: 'Vercel', icon: SiVercel, color: '#000000', category: 'tools' },
  ];

  const categories = {
    frontend: {
      kg: 'Frontend',
      ru: 'Frontend',
      en: 'Frontend'
    },
    backend: {
      kg: 'Backend',
      ru: 'Backend',
      en: 'Backend'
    },
    database: {
      kg: 'База данных',
      ru: 'База данных',
      en: 'Database'
    },
    tools: {
      kg: 'Куралдар',
      ru: 'Инструменты',
      en: 'Tools'
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateY: -90
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
              {t('techStack.badge')}
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('techStack.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('techStack.description')}
          </p>
        </motion.div>

        {/* Technologies Grid */}
        {['frontend', 'backend', 'database', 'tools'].map((category) => (
          <div key={category} className="mb-16">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3"
            >
              <span className="h-1 w-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"></span>
              {t(`techStack.categories.${category}`)}
            </motion.h3>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
            >
              {technologies
                .filter((tech) => tech.category === category)
                .map((tech, index) => {
                  const Icon = tech.icon;
                  return (
                    <motion.div
                      key={tech.name}
                      variants={cardVariants}
                      whileHover={{ 
                        scale: 1.1,
                        rotateY: 360,
                        transition: { duration: 0.6 }
                      }}
                      className="relative group"
                      style={{ perspective: '1000px' }}
                    >
                      <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 dark:from-yellow-500 dark:to-yellow-600 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-yellow-600 hover:border-orange-500 transform-gpu">
                        {/* Glow effect */}
                        <div 
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"
                          style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }}
                        />
                        
                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center justify-center space-y-3">
                          {/* Icon with rotation animation */}
                          <motion.div
                            animate={{ 
                              rotateY: [0, 360],
                            }}
                            transition={{ 
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                            className="text-6xl drop-shadow-lg"
                            style={{ color: tech.color }}
                          >
                            <Icon />
                          </motion.div>
                          
                          {/* Name */}
                          <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 text-center">
                            {tech.name}
                          </h4>
                        </div>

                        {/* Sparkle effect on hover */}
                        <motion.div
                          className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100"
                          animate={{
                            scale: [0, 1, 0],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatDelay: 0.5
                          }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
            </motion.div>
          </div>
        ))}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '19+', label: t('techStack.stats.technologies') },
            { value: '100%', label: t('techStack.stats.modern') },
            { value: '24/7', label: t('techStack.stats.support') },
            { value: '∞', label: t('techStack.stats.updates') }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-6 text-center text-white"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl font-bold mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-sm opacity-90">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default TechStack;
