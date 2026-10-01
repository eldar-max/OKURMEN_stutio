import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

function StatCard({ icon: Icon, title, value, suffix = '', trend, trendValue, color = 'blue', delay = 0 }) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    purple: 'from-purple-500 to-purple-600',
    pink: 'from-pink-500 to-pink-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center shadow-lg`}>
          <Icon className="text-2xl text-white" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            <span>{trend === 'up' ? '↑' : '↓'}</span>
            <span>{trendValue}%</span>
          </div>
        )}
      </div>
      
      <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">{title}</h3>
      <div className="text-3xl font-bold text-gray-900 dark:text-white">
        <AnimatedCounter end={value} suffix={suffix} duration={1500} />
      </div>
    </motion.div>
  );
}

export default StatCard;
