const admin = require('firebase-admin');
const db = admin.firestore();

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const paymentsSnapshot = await db.collection('payments')
      .orderBy('date', 'desc')
      .get();
    
    const payments = [];
    paymentsSnapshot.forEach(doc => {
      payments.push({ id: doc.id, ...doc.data() });
    });
    
    res.json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    console.error('Error getting payments:', error);
    res.status(500).json({
      success: false,
      message: 'Төлөмдөрдү алууда ката',
      error: error.message
    });
  }
};

// Get payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const paymentDoc = await db.collection('payments').doc(id).get();
    
    if (!paymentDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Төлөм табылган жок'
      });
    }
    
    res.json({
      success: true,
      data: { id: paymentDoc.id, ...paymentDoc.data() }
    });
  } catch (error) {
    console.error('Error getting payment:', error);
    res.status(500).json({
      success: false,
      message: 'Төлөмдү алууда ката',
      error: error.message
    });
  }
};

// Create new payment
exports.createPayment = async (req, res) => {
  try {
    const {
      userId, studentName, courseId, courseName,
      amount, method, receipt, notes
    } = req.body;
    
    // Validation
    if (!userId || !courseId || !amount || !method) {
      return res.status(400).json({
        success: false,
        message: 'Колдонуучу, курс, сумма жана төлөө ыкмасы милдеттүү'
      });
    }
    
    const transactionId = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;
    
    const paymentData = {
      userId,
      studentName: studentName || '',
      courseId,
      courseName: courseName || '',
      amount: parseFloat(amount),
      method,
      status: 'pending',
      transactionId,
      receipt: receipt || '',
      notes: notes || '',
      confirmedBy: null,
      confirmedAt: null,
      date: admin.firestore.FieldValue.serverTimestamp(),
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    const paymentRef = await db.collection('payments').add(paymentData);
    
    // Add payment to user
    const userDoc = await db.collection('users').doc(userId).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      const userPayments = userData.payments || [];
      userPayments.push(paymentRef.id);
      await db.collection('users').doc(userId).update({ payments: userPayments });
    }
    
    res.status(201).json({
      success: true,
      message: 'Төлөм ийгиликтүү түзүлдү',
      data: { id: paymentRef.id, ...paymentData }
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({
      success: false,
      message: 'Төлөмдү түзүүдө ката',
      error: error.message
    });
  }
};

// Confirm payment (Admin)
exports.confirmPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminId } = req.body;
    
    if (!adminId) {
      return res.status(400).json({
        success: false,
        message: 'Admin ID керек'
      });
    }
    
    await db.collection('payments').doc(id).update({
      status: 'completed',
      confirmedBy: adminId,
      confirmedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    res.json({
      success: true,
      message: 'Төлөм тастыкталды'
    });
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({
      success: false,
      message: 'Төлөмдү тастыктоодо ката',
      error: error.message
    });
  }
};

// Reject payment (Admin)
exports.rejectPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminId, reason } = req.body;
    
    if (!adminId) {
      return res.status(400).json({
        success: false,
        message: 'Admin ID керек'
      });
    }
    
    await db.collection('payments').doc(id).update({
      status: 'rejected',
      confirmedBy: adminId,
      confirmedAt: admin.firestore.FieldValue.serverTimestamp(),
      notes: reason || 'Четке кагылды'
    });
    
    res.json({
      success: true,
      message: 'Төлөм четке кагылды'
    });
  } catch (error) {
    console.error('Error rejecting payment:', error);
    res.status(500).json({
      success: false,
      message: 'Төлөмдү четке кагууда ката',
      error: error.message
    });
  }
};

// Get payments by user
exports.getPaymentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const paymentsSnapshot = await db.collection('payments')
      .where('userId', '==', userId)
      .orderBy('date', 'desc')
      .get();
    
    const payments = [];
    paymentsSnapshot.forEach(doc => {
      payments.push({ id: doc.id, ...doc.data() });
    });
    
    res.json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    console.error('Error getting user payments:', error);
    res.status(500).json({
      success: false,
      message: 'Төлөмдөрдү алууда ката',
      error: error.message
    });
  }
};

// Get payments by status
exports.getPaymentsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    
    const paymentsSnapshot = await db.collection('payments')
      .where('status', '==', status)
      .orderBy('date', 'desc')
      .get();
    
    const payments = [];
    paymentsSnapshot.forEach(doc => {
      payments.push({ id: doc.id, ...doc.data() });
    });
    
    res.json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    console.error('Error getting payments by status:', error);
    res.status(500).json({
      success: false,
      message: 'Төлөмдөрдү алууда ката',
      error: error.message
    });
  }
};

// Get payment statistics
exports.getPaymentStats = async (req, res) => {
  try {
    const paymentsSnapshot = await db.collection('payments').get();
    
    let totalRevenue = 0;
    let pendingCount = 0;
    let completedCount = 0;
    let rejectedCount = 0;
    
    paymentsSnapshot.forEach(doc => {
      const payment = doc.data();
      if (payment.status === 'completed') {
        totalRevenue += payment.amount;
        completedCount++;
      } else if (payment.status === 'pending') {
        pendingCount++;
      } else if (payment.status === 'rejected') {
        rejectedCount++;
      }
    });
    
    res.json({
      success: true,
      data: {
        totalRevenue,
        totalPayments: paymentsSnapshot.size,
        pending: pendingCount,
        completed: completedCount,
        rejected: rejectedCount
      }
    });
  } catch (error) {
    console.error('Error getting payment stats:', error);
    res.status(500).json({
      success: false,
      message: 'Статистиканы алууда ката',
      error: error.message
    });
  }
};
