const express = require('express');
const router = express.Router();
const { adminLogin, traineeLogin, getMe } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');

router.post('/admin/login', adminLogin);
router.post('/trainee/login', traineeLogin);
router.get('/me', authMiddleware, getMe);

module.exports = router;
