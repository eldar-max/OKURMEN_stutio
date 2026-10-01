import { motion } from 'framer-motion';
import logo from '../assets/5309874850258165398_121.jpg';

function WinkingLogo({ isWinking, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      className="cursor-pointer relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={isWinking ? {
        scale: [1, 0.95, 1],
      } : {}}
      transition={{ duration: 0.4 }}
    >
      <img 
        src={logo} 
        alt="OKURMEN Logo" 
        className="h-12 w-12 rounded-full object-cover"
      />
    </motion.div>
  );
}

export default WinkingLogo;
