const express = require('express');
const adminController = require('../controllers/adminController');
const verifyToken = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/acknowledgments', verifyToken, adminController.getAcknowledgmentLogs);

module.exports = router;