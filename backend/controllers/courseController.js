const admin = require('firebase-admin');
const db = admin.firestore();

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const coursesSnapshot = await db.collection('courses').get();
    const courses = [];
    
    coursesSnapshot.forEach(doc => {
      courses.push({ id: doc.id, ...doc.data() });
    });
    
    res.json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    console.error('Error getting courses:', error);
    res.status(500).json({
      success: false,
      message: 'Курстарды алууда ката',
      error: error.message
    });
  }
};

// Get course by ID
exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDoc = await db.collection('courses').doc(id).get();
    
    if (!courseDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Курс табылган жок'
      });
    }
    
    res.json({
      success: true,
      data: { id: courseDoc.id, ...courseDoc.data() }
    });
  } catch (error) {
    console.error('Error getting course:', error);
    res.status(500).json({
      success: false,
      message: 'Курсту алууда ката',
      error: error.message
    });
  }
};

// Create new course
exports.createCourse = async (req, res) => {
  try {
    const {
      name, nameKg, nameRu, nameEn,
      description, descriptionKg, descriptionRu, descriptionEn,
      duration, price, teacherId, teacherName,
      category, level, maxStudents, startDate, endDate,
      schedule, image
    } = req.body;
    
    // Validation
    if (!name || !price || !teacherId) {
      return res.status(400).json({
        success: false,
        message: 'Аталышы, баасы жана мугалим милдеттүү'
      });
    }
    
    const courseData = {
      name,
      nameKg: nameKg || name,
      nameRu: nameRu || name,
      nameEn: nameEn || name,
      description: description || '',
      descriptionKg: descriptionKg || description || '',
      descriptionRu: descriptionRu || description || '',
      descriptionEn: descriptionEn || description || '',
      duration: duration || '6 месяцев',
      price: parseFloat(price),
      teacherId,
      teacherName: teacherName || '',
      category: category || 'IT',
      level: level || 'Начальный',
      students: [],
      maxStudents: maxStudents || 30,
      startDate: startDate || '',
      endDate: endDate || '',
      schedule: schedule || { days: [], time: '' },
      image: image || '',
      status: 'active',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    const courseRef = await db.collection('courses').add(courseData);
    
    res.status(201).json({
      success: true,
      message: 'Курс ийгиликтүү түзүлдү',
      data: { id: courseRef.id, ...courseData }
    });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({
      success: false,
      message: 'Курсту түзүүдө ката',
      error: error.message
    });
  }
};

// Update course
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Remove fields that shouldn't be updated
    delete updates.id;
    delete updates.createdAt;
    delete updates.students; // Students updated separately
    
    updates.updatedAt = admin.firestore.FieldValue.serverTimestamp();
    
    await db.collection('courses').doc(id).update(updates);
    
    const updatedCourse = await db.collection('courses').doc(id).get();
    
    res.json({
      success: true,
      message: 'Курс ийгиликтүү жаңыланды',
      data: { id: updatedCourse.id, ...updatedCourse.data() }
    });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({
      success: false,
      message: 'Курсту жаңылоодо ката',
      error: error.message
    });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.collection('courses').doc(id).delete();
    
    res.json({
      success: true,
      message: 'Курс ийгиликтүү өчүрүлдү'
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({
      success: false,
      message: 'Курсту өчүрүүдө ката',
      error: error.message
    });
  }
};

// Enroll student in course
exports.enrollStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'Колдонуучунун ID керек'
      });
    }
    
    const courseDoc = await db.collection('courses').doc(id).get();
    
    if (!courseDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Курс табылган жок'
      });
    }
    
    const courseData = courseDoc.data();
    const students = courseData.students || [];
    
    // Check if already enrolled
    if (students.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Окуучу буга чейин жазылган'
      });
    }
    
    // Check max students
    if (students.length >= courseData.maxStudents) {
      return res.status(400).json({
        success: false,
        message: 'Курс толду'
      });
    }
    
    // Add student to course
    students.push(userId);
    await db.collection('courses').doc(id).update({ students });
    
    // Add course to user
    const userDoc = await db.collection('users').doc(userId).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      const userCourses = userData.courses || [];
      if (!userCourses.includes(id)) {
        userCourses.push(id);
        await db.collection('users').doc(userId).update({ courses: userCourses });
      }
    }
    
    res.json({
      success: true,
      message: 'Окуучу ийгиликтүү жазылды'
    });
  } catch (error) {
    console.error('Error enrolling student:', error);
    res.status(500).json({
      success: false,
      message: 'Жазылууда ката',
      error: error.message
    });
  }
};

// Get courses by category
exports.getCoursesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const coursesSnapshot = await db.collection('courses')
      .where('category', '==', category)
      .get();
    
    const courses = [];
    coursesSnapshot.forEach(doc => {
      courses.push({ id: doc.id, ...doc.data() });
    });
    
    res.json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    console.error('Error getting courses by category:', error);
    res.status(500).json({
      success: false,
      message: 'Курстарды алууда ката',
      error: error.message
    });
  }
};

// Get courses by teacher
exports.getCoursesByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    
    const coursesSnapshot = await db.collection('courses')
      .where('teacherId', '==', teacherId)
      .get();
    
    const courses = [];
    coursesSnapshot.forEach(doc => {
      courses.push({ id: doc.id, ...doc.data() });
    });
    
    res.json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    console.error('Error getting courses by teacher:', error);
    res.status(500).json({
      success: false,
      message: 'Курстарды алууда ката',
      error: error.message
    });
  }
};
