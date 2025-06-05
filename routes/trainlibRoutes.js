// 训练库相关路由
const express = require('express');
const router = express.Router();
const { addTrain, getAllTrain, updateTrain, deleteTrain } = require('../controllers/trainlibController');

// 添加训练
router.post('/add', addTrain);
// 获取所有训练
router.get('/get', getAllTrain);
// 修改训练
router.post('/modify', updateTrain);
// 删除训练
router.post('/delete', deleteTrain);

module.exports = router; // 导出路由