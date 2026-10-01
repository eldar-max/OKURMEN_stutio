import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Loader.css';
import logo from '../assets/5309874850258165398_121.jpg';

function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ждем пока страница полностью загрузится
    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false);
      }, 500); // Небольшая задержка для плавности
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-700 flex items-center justify-center z-[9999]"
        >
          <div className="text-center">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl overflow-hidden">
                <img src={logo} alt="OKURMEN" className="w-full h-full object-cover" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                ОКУРМЭН
              </h1>
              <p className="text-lg sm:text-xl text-orange-100">
                Билимден мүмкүнчүлүккө карай
              </p>
            </motion.div>

            {/* Loader */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center"
            >
              <span 
                className="loader" 
                style={{ 
                  '--color-1': '#fff',
                  '--color-2': '#93c5fd',
                  '--size': '2px'
                }}
              ></span>
            </motion.div>

            {/* Loading Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-white text-base sm:text-lg font-medium"
            >
              Загрузка платформы...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PageLoader;
