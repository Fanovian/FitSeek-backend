// 健康记录相关路由
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getFitnessRecord, createFitnessRecord, updateFitnessRecord, deleteFitnessRecord } = require('../controllers/fitnessController');

// 获取当前用户所有健康记录
router.get('/get', authMiddleware, getFitnessRecord);
// 添加健康记录
router.post('/add', authMiddleware, createFitnessRecord);
// 修改健康记录
router.post('/modify', authMiddleware, updateFitnessRecord);
// 删除健康记录
router.post('/delete', authMiddleware, deleteFitnessRecord);

module.exports = router; // 导出路由