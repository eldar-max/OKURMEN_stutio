// Unsplash API Service для получения профессиональных изображений
// Бесплатный доступ: https://unsplash.com/developers

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || 'demo_key';
const UNSPLASH_API = 'https://api.unsplash.com';

/**
 * Получить случайное изображение по запросу
 * @param {string} query - поисковый запрос (например, "education", "classroom", "students")
 * @param {object} options - дополнительные параметры
 * @returns {Promise<string>} URL изображения
 */
export const getRandomImage = async (query, options = {}) => {
  try {
    const {
      width = 1200,
      height = 800,
      orientation = 'landscape'
    } = options;

    // Если API ключ не настроен, используем Unsplash Source (без аналитики)
    if (UNSPLASH_ACCESS_KEY === 'demo_key') {
      return `https://source.unsplash.com/${width}x${height}/?${query}`;
    }

    const response = await fetch(
      `${UNSPLASH_API}/photos/random?query=${encodeURIComponent(query)}&orientation=${orientation}&client_id=${UNSPLASH_ACCESS_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }

    const data = await response.json();
    return data.urls.regular;
  } catch (error) {
    console.warn('Unsplash API error, using fallback:', error);
    // Fallback на Unsplash Source
    return `https://source.unsplash.com/${options.width || 1200}x${options.height || 800}/?${query}`;
  }
};

/**
 * Получить коллекцию изображений по запросу
 * @param {string} query - поисковый запрос
 * @param {number} count - количество изображений
 * @param {object} options - дополнительные параметры
 * @returns {Promise<Array<string>>} Массив URL изображений
 */
export const getImageCollection = async (query, count = 10, options = {}) => {
  try {
    const {
      width = 800,
      height = 600,
      orientation = 'landscape'
    } = options;

    // Если API ключ не настроен, генерируем fallback URL'ы
    if (UNSPLASH_ACCESS_KEY === 'demo_key') {
      return Array.from({ length: count }, (_, i) => 
        `https://source.unsplash.com/${width}x${height}/?${query}&sig=${i}`
      );
    }

    const response = await fetch(
      `${UNSPLASH_API}/photos/random?query=${encodeURIComponent(query)}&count=${count}&orientation=${orientation}&client_id=${UNSPLASH_ACCESS_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }

    const data = await response.json();
    return data.map(photo => photo.urls.regular);
  } catch (error) {
    console.warn('Unsplash API error, using fallback:', error);
    // Fallback на Unsplash Source с разными sig параметрами
    return Array.from({ length: count }, (_, i) => 
      `https://source.unsplash.com/${width}x${height}/?${query}&sig=${i}`
    );
  }
};

/**
 * Предопределенные категории изображений для OKURMEN
 */
export const unsplashCategories = {
  hero: {
    education: 'education,learning,students,university',
    technology: 'technology,coding,programming,computer',
    success: 'success,achievement,graduation,celebration'
  },
  team: {
    portraits: 'professional,portrait,business,person',
    teacher: 'teacher,instructor,mentor,professional',
    developer: 'developer,programmer,tech,professional'
  },
  classroom: {
    modern: 'modern,classroom,office,workspace',
    technology: 'computer,lab,tech,office',
    coworking: 'coworking,workspace,office,modern'
  },
  students: {
    learning: 'students,learning,studying,education',
    coding: 'coding,programming,developer,laptop',
    group: 'team,collaboration,group,working'
  }
};

/**
 * Получить изображение для конкретной секции сайта
 * @param {string} section - название секции (hero, team, classroom и т.д.)
 * @param {string} type - тип изображения внутри секции
 * @param {object} options - дополнительные параметры
 * @returns {Promise<string>} URL изображения
 */
export const getSectionImage = async (section, type, options = {}) => {
  const category = unsplashCategories[section]?.[type];
  if (!category) {
    console.warn(`Unknown section/type: ${section}/${type}`);
    return getRandomImage('education', options);
  }
  return getRandomImage(category, options);
};

/**
 * Получить коллекцию портретов для команды
 * @param {number} count - количество изображений
 * @returns {Promise<Array<string>>} Массив URL портретов
 */
export const getTeamPortraits = async (count = 21) => {
  return getImageCollection('professional,portrait,business', count, {
    width: 600,
    height: 600,
    orientation: 'squarish'
  });
};

/**
 * Получить изображения классов
 * @param {number} count - количество изображений
 * @returns {Promise<Array<string>>} Массив URL изображений классов
 */
export const getClassroomImages = async (count = 4) => {
  return getImageCollection('modern,classroom,office,tech', count, {
    width: 1200,
    height: 800,
    orientation: 'landscape'
  });
};

/**
 * Кэширование изображений в localStorage для оффлайн доступа
 */
export const cacheImage = (key, url) => {
  try {
    const cache = JSON.parse(localStorage.getItem('unsplash_cache') || '{}');
    cache[key] = {
      url,
      timestamp: Date.now()
    };
    localStorage.setItem('unsplash_cache', JSON.stringify(cache));
  } catch (error) {
    console.warn('Failed to cache image:', error);
  }
};

export const getCachedImage = (key, maxAge = 24 * 60 * 60 * 1000) => {
  try {
    const cache = JSON.parse(localStorage.getItem('unsplash_cache') || '{}');
    const cached = cache[key];
    
    if (cached && (Date.now() - cached.timestamp) < maxAge) {
      return cached.url;
    }
    return null;
  } catch (error) {
    console.warn('Failed to get cached image:', error);
    return null;
  }
};

export default {
  getRandomImage,
  getImageCollection,
  getSectionImage,
  getTeamPortraits,
  getClassroomImages,
  cacheImage,
  getCachedImage,
  categories: unsplashCategories
};
