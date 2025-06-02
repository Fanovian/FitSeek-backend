const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getFitnessRecord, createFitnessRecord, updateFitnessRecord, deleteFitnessRecord } = require('../controllers/fitnessController');

// 需要登录才能访问
router.get('/get', authMiddleware, getFitnessRecord);
router.post('/add', authMiddleware, createFitnessRecord);
router.post('/modify', authMiddleware, updateFitnessRecord);
router.post('/delete', authMiddleware, deleteFitnessRecord);

module.exports = router;