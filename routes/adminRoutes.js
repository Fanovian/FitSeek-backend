const express = require('express');
const router = express.Router();
const { adminRegister, adminLogin } = require('../controllers/authController');
const { getAllUsers, deleteUser } = require('../controllers/adminController');

router.post('/register', adminRegister);
router.post('/login', adminLogin);
router.get('/user/get', getAllUsers);
router.post('/user/delete', deleteUser);

module.exports = router;
