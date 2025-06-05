// 用户资料相关路由
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const profileController = require('../controllers/profileController');

// 获取用户资料
router.get('/get', authMiddleware, profileController.getProfile);
// 修改或新建用户资料
router.post('/update', authMiddleware, profileController.updateProfile);
// 修改用户名
router.post('/updateUsername', authMiddleware, profileController.updateUsername);
// 修改密码
router.post('/updatePassword', authMiddleware, profileController.updatePassword);
// 获取当前用户的基本信息
router.get('/getBasicInfo', authMiddleware, profileController.getCurrentUserInfo);

module.exports = router; // 导出路由