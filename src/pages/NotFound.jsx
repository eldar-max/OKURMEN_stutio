import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome } from 'react-icons/fa';

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-white"
      >
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="text-9xl font-bold mb-4"
        >
          404
        </motion.h1>
        <h2 className="text-3xl font-bold mb-4">Страница не найдена</h2>
        <p className="text-xl mb-8 text-blue-100">
          К сожалению, запрашиваемая страница не существует
        </p>
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-shadow inline-flex items-center space-x-2"
          >
            <FaHome />
            <span>Вернуться на главную</span>
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFound;
