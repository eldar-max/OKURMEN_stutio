import axios from 'axios';

// API Base URL - партнёруңуз backend URL'ди бул жерге коёт
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor - add auth token if exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear auth and redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('isAuthenticated');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== COURSES ====================

export const coursesAPI = {
  // Get all courses
  getAll: () => api.get('/courses'),

  // Get course by ID
  getById: (id) => api.get(`/courses/${id}`),

  // Create new course
  create: (courseData) => api.post('/courses', courseData),

  // Update course
  update: (id, courseData) => api.put(`/courses/${id}`, courseData),

  // Delete course
  delete: (id) => api.delete(`/courses/${id}`),

  // Get course statistics
  getStats: (id) => api.get(`/courses/${id}/stats`),
};

// ==================== STUDENTS ====================

export const studentsAPI = {
  // Get all students
  getAll: (params) => api.get('/students', { params }),

  // Get student by ID
  getById: (id) => api.get(`/students/${id}`),

  // Create new student
  create: (studentData) => api.post('/students', studentData),

  // Update student
  update: (id, studentData) => api.put(`/students/${id}`, studentData),

  // Delete student
  delete: (id) => api.delete(`/students/${id}`),

  // Enroll student to course
  enroll: (studentId, courseId) => api.post(`/students/${studentId}/enroll`, { courseId }),
};

// ==================== BOOKINGS ====================

export const bookingsAPI = {
  // Create booking (записаться на курс)
  create: (bookingData) => api.post('/bookings', bookingData),

  // Get all bookings
  getAll: (params) => api.get('/bookings', { params }),

  // Get booking by ID
  getById: (id) => api.get(`/bookings/${id}`),

  // Update booking status
  updateStatus: (id, status) => api.patch(`/bookings/${id}/status`, { status }),

  // Cancel booking
  cancel: (id) => api.delete(`/bookings/${id}`),
};

// ==================== PAYMENTS ====================

export const paymentsAPI = {
  // Create payment
  create: (paymentData) => api.post('/payments', paymentData),

  // Get all payments
  getAll: (params) => api.get('/payments', { params }),

  // Get payment by ID
  getById: (id) => api.get(`/payments/${id}`),

  // Verify payment
  verify: (id, verificationData) => api.post(`/payments/${id}/verify`, verificationData),

  // Get payment statistics
  getStats: (params) => api.get('/payments/stats', { params }),
};

// ==================== TELEGRAM ====================

export const telegramAPI = {
  // Send notification to Telegram bot
  sendNotification: (data) => api.post('/telegram/notify', data),

  // Send booking notification
  sendBooking: (bookingData) => {
    const message = `
🎓 *Новая заявка на курс*

👤 Студент: ${bookingData.firstName} ${bookingData.lastName}
📧 Email: ${bookingData.email}
📱 Телефон: ${bookingData.phone}

📚 Курс: ${bookingData.courseName}
📅 Дата начала: ${bookingData.startDate}
🎯 Формат: ${bookingData.format === 'hybrid' ? 'Гибридный' : 'Офлайн'}

${bookingData.message ? `💬 Сообщение: ${bookingData.message}` : ''}
    `;

    return api.post('/telegram/notify', {
      type: 'booking',
      message,
      data: bookingData,
    });
  },

  // Send payment notification
  sendPayment: (paymentData) => {
    const message = `
💰 *Новый платеж*

👤 Студент: ${paymentData.studentName}
📚 Курс: ${paymentData.courseName}
💵 Сумма: ${paymentData.amount} сом
💳 Метод: ${paymentData.method}
✅ Статус: ${paymentData.status}

📅 Дата: ${new Date().toLocaleString('ru-RU')}
    `;

    return api.post('/telegram/notify', {
      type: 'payment',
      message,
      data: paymentData,
    });
  },
};

// ==================== AUTH ====================

export const authAPI = {
  // Login
  login: (credentials) => api.post('/auth/login', credentials),

  // Logout
  logout: () => api.post('/auth/logout'),

  // Verify token
  verify: () => api.get('/auth/verify'),

  // Refresh token
  refresh: () => api.post('/auth/refresh'),
};

// ==================== DASHBOARD ====================

export const dashboardAPI = {
  // Get dashboard stats
  getStats: () => api.get('/dashboard/stats'),

  // Get recent enrollments
  getRecentEnrollments: (limit = 5) => api.get('/dashboard/enrollments/recent', { params: { limit } }),

  // Get revenue chart data
  getRevenueChart: (period = '30d') => api.get('/dashboard/revenue', { params: { period } }),
};

export default api;
