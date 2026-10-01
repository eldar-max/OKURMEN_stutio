import { motion } from 'framer-motion';

function SimpleChart({ data = [], title, color = 'orange' }) {
  // Safety check for empty data
  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{title}</h3>
        <div className="flex items-center justify-center h-64 text-gray-400">
          Маалыматтар жок
        </div>
      </div>
    );
  }

  const max = Math.max(...data.map(d => d.value || 0));
  
  const colorClasses = {
    orange: 'bg-orange-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{title}</h3>
      
      <div className="space-y-4">
        {/* Chart container with fixed height */}
        <div className="h-64 flex items-end justify-between gap-2">
          {data.map((item, index) => {
            const height = max > 0 ? (item.value / max) * 100 : 0;
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
                  className={`w-full ${colorClasses[color]} rounded-t-lg relative group cursor-pointer hover:opacity-80 transition-opacity min-h-[4px]`}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {item.value}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
        
        {/* Labels row */}
        <div className="flex justify-between gap-2">
          {data.map((item, index) => (
            <div key={index} className="flex-1 text-center">
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SimpleChart;
