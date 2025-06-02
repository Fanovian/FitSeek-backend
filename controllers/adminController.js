const bcrypt = require('bcryptjs');
const User = require('../models/User');
const mongoose = require('mongoose');

// 获取所有用户列表
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'user_id name tel type created_at');
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};

// 删除用户
exports.deleteUser = async (req, res) => {
    const { user_id } = req.body;
    if (!user_id) {
        return res.status(400).json({ success: false, message: '缺少 user_id' });
    }
    try {
        const result = await User.deleteOne({ user_id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: '用户未找到' });
        }
        res.json({ success: true, message: '用户已删除' });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};