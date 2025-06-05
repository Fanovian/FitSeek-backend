// 管理员相关路由
const express = require('express');
const router = express.Router();
// 引入管理员注册、登录控制器
const { adminRegister, adminLogin } = require('../controllers/authController');
// 引入获取/删除用户控制器
const { getAllUsers, deleteUser } = require('../controllers/adminController');

// 管理员注册
router.post('/register', adminRegister);
// 管理员登录
router.post('/login', adminLogin);
// 获取所有用户列表
router.get('/user/get', getAllUsers);
// 删除用户
router.post('/user/delete', deleteUser);

module.exports = router; // 导出路由
