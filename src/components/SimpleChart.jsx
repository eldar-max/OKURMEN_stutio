import { motion } from 'framer-motion';

function SimpleChart({ data, title, color = 'orange' }) {
  const max = Math.max(...data.map(d => d.value));
  
  const colorClasses = {
    orange: 'bg-orange-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{title}</h3>
      
      <div className="flex items-end justify-between h-64 gap-2">
        {data.map((item, index) => {
          const height = (item.value / max) * 100;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
                className={`w-full ${colorClasses[color]} rounded-t-lg relative group cursor-pointer hover:opacity-80 transition-opacity`}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.value}
                </div>
              </motion.div>
              
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium text-center">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SimpleChart;
