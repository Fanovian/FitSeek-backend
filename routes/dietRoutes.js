const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getDietRecord, createDietRecord, updateDietRecord, deleteDietRecord } = require('../controllers/dietController');

// 需要登录才能访问
router.get('/get', authMiddleware, getDietRecord);
router.post('/add', authMiddleware, createDietRecord);
router.post('/modify', authMiddleware, updateDietRecord);
router.post('/delete', authMiddleware, deleteDietRecord);

module.exports = router;