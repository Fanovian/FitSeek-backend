const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const profileController = require('../controllers/profileController');

// 需要登录才能访问
router.get('/get', authMiddleware, profileController.getProfile);
router.post('/update', authMiddleware, profileController.updateProfile);

module.exports = router;