// 饮食记录相关路由
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getDietRecord, createDietRecord, updateDietRecord, deleteDietRecord } = require('../controllers/dietController');

// 需要登录才能访问
// 获取当前用户所有饮食记录
router.get('/get', authMiddleware, getDietRecord);
// 添加饮食记录
router.post('/add', authMiddleware, createDietRecord);
// 修改饮食记录
router.post('/modify', authMiddleware, updateDietRecord);
// 删除饮食记录
router.post('/delete', authMiddleware, deleteDietRecord);

module.exports = router; // 导出路由