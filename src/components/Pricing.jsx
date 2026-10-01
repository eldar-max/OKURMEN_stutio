import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FaCheck, FaStar, FaFire, FaCrown } from 'react-icons/fa';

function Pricing() {
  const { t, language } = useLanguage();

  const pricingPlans = [
    {
      id: 'basic',
      name: { kg: 'Стандарт', ru: 'Стандарт', en: 'Standard' },
      price: '3,000',
      duration: { kg: 'айына', ru: 'в месяц', en: 'per month' },
      icon: FaStar,
      color: 'blue',
      popular: false,
      features: [
        { kg: 'Frontend Development', ru: 'Frontend разработка', en: 'Frontend Development' },
        { kg: 'Backend Development', ru: 'Backend разработка', en: 'Backend Development' },
        { kg: '6 ай окуу', ru: '6 месяцев обучения', en: '6 months training' },
        { kg: 'Онлайн сабактар', ru: 'Онлайн уроки', en: 'Online lessons' },
        { kg: 'Сертификат', ru: 'Сертификат', en: 'Certificate' },
      ]
    },
    {
      id: 'premium',
      name: { kg: 'Премиум', ru: 'Премиум', en: 'Premium' },
      price: '5,000',
      duration: { kg: 'айына', ru: 'в месяц', en: 'per month' },
      icon: FaFire,
      color: 'orange',
      popular: true,
      features: [
        { kg: 'Стандарттын баары + дагы', ru: 'Все из Стандарт + еще', en: 'All Standard + more' },
        { kg: '1:1 ментор колдоосу', ru: '1:1 поддержка ментора', en: '1:1 mentor support' },
        { kg: 'Долбоор портфолиосу', ru: 'Портфолио проектов', en: 'Project portfolio' },
        { kg: 'Иш табууга жардам', ru: 'Помощь с трудоустройством', en: 'Job placement help' },
        { kg: 'AI жана бонус сабактар', ru: 'AI и бонусные уроки', en: 'AI & bonus lessons' },
      ]
    },
    {
      id: 'vip',
      name: { kg: 'VIP', ru: 'VIP', en: 'VIP' },
      price: '8,000',
      duration: { kg: 'айына', ru: 'в месяц', en: 'per month' },
      icon: FaCrown,
      color: 'purple',
      popular: false,
      features: [
        { kg: 'Премиумдун баары + дагы', ru: 'Все из Премиум + еще', en: 'All Premium + more' },
        { kg: 'Жеке ментор (24/7)', ru: 'Личный ментор (24/7)', en: 'Personal mentor (24/7)' },
        { kg: 'Америкалык тренерлер', ru: 'Американские тренеры', en: 'US trainers' },
        { kg: 'Чыныгы компания долбоорлору', ru: 'Реальные проекты компаний', en: 'Real company projects' },
        { kg: 'Гарантияланган иш орду', ru: 'Гарантированное трудоустройство', en: 'Guaranteed job placement' },
      ]
    }
  ];

  const getName = (plan) => {
    if (language === 'ru') return plan.name.ru;
    if (language === 'en') return plan.name.en;
    return plan.name.kg;
  };

  const getDuration = (plan) => {
    if (language === 'ru') return plan.duration.ru;
    if (language === 'en') return plan.duration.en;
    return plan.duration.kg;
  };

  const getFeature = (feature) => {
    if (language === 'ru') return feature.ru;
    if (language === 'en') return feature.en;
    return feature.kg;
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        gradient: 'from-blue-500 to-blue-600',
        text: 'text-blue-600',
        border: 'border-blue-500',
        bg: 'bg-blue-50 dark:bg-blue-900/20'
      },
      orange: {
        gradient: 'from-orange-500 to-orange-600',
        text: 'text-orange-600',
        border: 'border-orange-500',
        bg: 'bg-orange-50 dark:bg-orange-900/20'
      },
      purple: {
        gradient: 'from-purple-500 to-purple-600',
        text: 'text-purple-600',
        border: 'border-purple-500',
        bg: 'bg-purple-50 dark:bg-purple-900/20'
      }
    };
    return colors[color];
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
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
              {language === 'kg' ? '💰 Баалар' : language === 'en' ? '💰 Pricing' : '💰 Цены'}
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'kg' ? 'Өзүңүзгө ылайыктуусун тандаңыз' :
             language === 'en' ? 'Choose Your Perfect Plan' :
             'Выберите подходящий план'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {language === 'kg' ? 'Биздин баалар жеңил жана ар бир окуучу үчүн жеткиликтүү' :
             language === 'en' ? 'Our prices are affordable and accessible for every student' :
             'Наши цены доступны и выгодны для каждого студента'}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => {
            const Icon = plan.icon;
            const colors = getColorClasses(plan.color);
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden ${
                  plan.popular ? 'ring-4 ring-orange-500 transform scale-105' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-bl-3xl font-bold text-sm">
                    {language === 'kg' ? '⭐ Популярдуу' : language === 'en' ? '⭐ Popular' : '⭐ Популярный'}
                  </div>
                )}

                <div className="p-8">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.gradient} mb-6`}>
                    <Icon className="text-3xl text-white" />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {getName(plan)}
                  </h3>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className={`text-5xl font-bold ${colors.text} dark:text-white`}>
                        {plan.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">
                        сом
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      {getDuration(plan)}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + idx * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center mt-0.5`}>
                          <FaCheck className="text-white text-xs" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {getFeature(feature)}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r ${colors.gradient} shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    {language === 'kg' ? 'Тандоо' : language === 'en' ? 'Choose Plan' : 'Выбрать план'}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'kg' ? '💡 Суроолоруңуз барбы? Биз менен байланышыңыз!' :
             language === 'en' ? '💡 Have questions? Contact us!' :
             '💡 Есть вопросы? Свяжитесь с нами!'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            {language === 'kg' ? '* Баалар өзгөрүшү мүмкүн' :
             language === 'en' ? '* Prices may vary' :
             '* Цены могут меняться'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Pricing;
