// 训练记录相关路由
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getTrainingRecord, createTrainingRecord, updateTrainingRecord, deleteTrainingRecord } = require('../controllers/trainingController');

// 获取当前用户所有训练记录
router.get('/get', authMiddleware, getTrainingRecord);
// 添加训练记录
router.post('/add', authMiddleware, createTrainingRecord);
// 修改训练记录
router.post('/modify', authMiddleware, updateTrainingRecord);
// 删除训练记录
router.post('/delete', authMiddleware, deleteTrainingRecord);

module.exports = router; // 导出路由