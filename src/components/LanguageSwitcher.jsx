import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FiGlobe } from 'react-icons/fi';
import { useState } from 'react';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'kg', name: 'Кыргызча', flag: '🇰🇬' }
  ];

  const currentLang = languages.find(lang => lang.code === language);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-50 hover:bg-orange-100 transition-all duration-300 text-orange-600 border border-orange-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiGlobe size={18} />
        <span className="font-medium text-sm">{currentLang.flag} {currentLang.code.toUpperCase()}</span>
      </motion.button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl overflow-hidden z-50 border border-gray-100"
          >
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => {
                  changeLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-orange-50 transition-colors ${
                  language === lang.code ? 'bg-orange-100 text-orange-600' : 'text-gray-700'
                }`}
                whileHover={{ x: 5 }}
              >
                <span className="text-2xl">{lang.flag}</span>
                <div className="flex-1 text-left">
                  <p className="font-medium">{lang.name}</p>
                  <p className="text-xs opacity-60">{lang.code.toUpperCase()}</p>
                </div>
                {language === lang.code && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-orange-500 rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
