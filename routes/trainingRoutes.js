const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getTrainingRecord, createTrainingRecord, updateTrainingRecord, deleteTrainingRecord } = require('../controllers/trainingController');

// 需要登录才能访问
router.get('/get', authMiddleware, getTrainingRecord);
router.post('/add', authMiddleware, createTrainingRecord);
router.post('/modify', authMiddleware, updateTrainingRecord);
router.post('/delete', authMiddleware, deleteTrainingRecord);

module.exports = router;