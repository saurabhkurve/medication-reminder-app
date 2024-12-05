const express = require('express');
const medicineController = require('../controllers/medicineController');
const verifyTokenAndRole = require('../middlewares/authMiddleware');
const router = express.Router();

// Routes for users
router.post('/medicine', verifyTokenAndRole('user'), medicineController.createMedicine);
router.get('/medicines', verifyTokenAndRole('user'), medicineController.getMedicines);
router.post('/acknowledge', verifyTokenAndRole('user'), medicineController.acknowledgeMedicine);

// Routes for admins
router.get('/admin/acknowledgments', verifyTokenAndRole('admin'), medicineController.getAcknowledgments);
router.delete('/admin/acknowledgments/:id', verifyTokenAndRole('admin'), medicineController.deleteAcknowledgment);

module.exports = router;