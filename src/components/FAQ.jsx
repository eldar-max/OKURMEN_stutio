import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';

function FAQ() {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      questionKg: 'Курска кантип жазылсам болот?',
      questionRu: 'Как записаться на курс?',
      questionEn: 'How to enroll in a course?',
      answerKg: 'Биздин сайтта каттоодон өтүп, керектүү курсту тандап, "Жазылуу" баскычын басыңыз. Менеджер сиз менен байланышат.',
      answerRu: 'Зарегистрируйтесь на нашем сайте, выберите нужный курс и нажмите кнопку "Записаться". Менеджер свяжется с вами.',
      answerEn: 'Register on our website, choose the course you need and click the "Enroll" button. A manager will contact you.'
    },
    {
      questionKg: 'Окуу канча убакыт созулат?',
      questionRu: 'Сколько длится обучение?',
      questionEn: 'How long is the training?',
      answerKg: 'Курстун узактыгы 3 айдан 8 айга чейин. Көпчүлүк курстар 6 ай созулат.',
      answerRu: 'Длительность курса от 3 до 8 месяцев. Большинство курсов длятся 6 месяцев.',
      answerEn: 'Course duration ranges from 3 to 8 months. Most courses last 6 months.'
    },
    {
      questionKg: 'Онлайн же оффлайн окутасызбы?',
      questionRu: 'Обучение онлайн или оффлайн?',
      questionEn: 'Is training online or offline?',
      answerKg: 'Биз гибриддик форматта иштейбиз - онлайн сабактар + офлайн кеңештер жана практика.',
      answerRu: 'Мы работаем в гибридном формате - онлайн уроки + оффлайн консультации и практика.',
      answerEn: 'We work in a hybrid format - online lessons + offline consultations and practice.'
    },
    {
      questionKg: 'Сертификат беребизби?',
      questionRu: 'Выдаете ли сертификат?',
      questionEn: 'Do you provide a certificate?',
      answerKg: 'Ооба! Курсту ийгиликтүү бүтүргөндөн кийин расмий сертификат беребиз.',
      answerRu: 'Да! После успешного окончания курса мы выдаем официальный сертификат.',
      answerEn: 'Yes! We provide an official certificate upon successful course completion.'
    },
    {
      questionKg: 'Иш табууга жардам бересизби?',
      questionRu: 'Помогаете ли с трудоустройством?',
      questionEn: 'Do you help with job placement?',
      answerKg: 'Ооба! Биз студенттерге резюме түзүүгө, собеседованиеге даярдоого жана IT компанияларга жумушка орношууга жардам беребиз.',
      answerRu: 'Да! Мы помогаем студентам составить резюме, подготовиться к собеседованию и трудоустроиться в IT компании.',
      answerEn: 'Yes! We help students create resumes, prepare for interviews, and get jobs in IT companies.'
    },
    {
      questionKg: 'Төлөмдү бөлүп-бөлүп төлөсө болобу?',
      questionRu: 'Можно ли платить в рассрочку?',
      questionEn: 'Can I pay in installments?',
      answerKg: 'Ооба! Биз айлык төлөм планын сунуштайбыз. Деталдары менен менеджерден билиңиз.',
      answerRu: 'Да! Мы предлагаем помесячный план оплаты. Детали уточняйте у менеджера.',
      answerEn: 'Yes! We offer a monthly payment plan. Contact our manager for details.'
    },
    {
      questionKg: 'Алдын ала билим талап кылынабы?',
      questionRu: 'Требуется ли предварительная подготовка?',
      questionEn: 'Is prior knowledge required?',
      answerKg: 'Жок! Биз нөлдөн башталган курстарды сунуштайбыз. Эч кандай алдын ала билим керек эмес.',
      answerRu: 'Нет! Мы предлагаем курсы с нуля. Никакой предварительной подготовки не требуется.',
      answerEn: 'No! We offer courses from scratch. No prior knowledge is required.'
    },
    {
      questionKg: 'Канча жаштан кабыл аласыз?',
      questionRu: 'С какого возраста принимаете?',
      questionEn: 'From what age do you accept students?',
      answerKg: '15 жаштан 50 жашка чейинки студенттерди кабыл алабыз. Негизгиси - окууга кызыгуу!',
      answerRu: 'Принимаем студентов от 15 до 50 лет. Главное - желание учиться!',
      answerEn: 'We accept students from 15 to 50 years old. The main thing is the desire to learn!'
    }
  ];

  const getQuestion = (faq) => {
    if (language === 'ru') return faq.questionRu;
    if (language === 'en') return faq.questionEn;
    return faq.questionKg;
  };

  const getAnswer = (faq) => {
    if (language === 'ru') return faq.answerRu;
    if (language === 'en') return faq.answerEn;
    return faq.answerKg;
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
              ❓ FAQ
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'kg' ? 'Көп берилүүчү суроолор' :
             language === 'en' ? 'Frequently Asked Questions' :
             'Часто задаваемые вопросы'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {language === 'kg' ? 'Сиздин суроолоруңузга жооп' :
             language === 'en' ? 'Answers to your questions' :
             'Ответы на ваши вопросы'}
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Question */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <FaQuestionCircle className="text-white text-xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1">
                    {getQuestion(faq)}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <FaChevronDown className="text-gray-600 dark:text-gray-400 text-xl" />
                </motion.div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pl-20">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {getAnswer(faq)}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {language === 'kg' ? 'Дагы суроолоруңуз барбы?' :
             language === 'en' ? 'Still have questions?' :
             'Остались вопросы?'}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {language === 'kg' ? '💬 Биз менен байланышуу' :
             language === 'en' ? '💬 Contact Us' :
             '💬 Связаться с нами'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default FAQ;
