// 食物库相关路由
const express = require('express');
const router = express.Router();
const { addFood, getAllFood, updateFood, deleteFood } = require('../controllers/foodlibController');

// 添加食物
router.post('/add', addFood);
// 获取所有食物
router.get('/get', getAllFood);
// 修改食物
router.post('/modify', updateFood); // 需要实现 modifyFood 函数
// 删除食物
router.post('/delete', deleteFood); // 需要实现 deleteFood 函数

module.exports = router; // 导出路由
