const UserProfile = require('../models/UserProfile');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// 获取用户资料
exports.getProfile = async (req, res) => {
    const userId = req.user.userId; // 需配合 authMiddleware 使用

    try {
        const profile = await UserProfile.findOne({ user_id: userId });
        if (!profile) {
            return res.status(404).json({ success: false, message: '用户资料未找到' });
        }
        res.json({ success: true, profile });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};

// 修改或新建用户资料
exports.updateProfile = async (req, res) => {
    const userId = req.user.userId; // 需配合 authMiddleware 使用
    const { age, gender, height, weight_goal } = req.body;

    try {
        let profile = await UserProfile.findOne({ user_id: userId });
        if (profile) {
            // 更新资料
            profile.age = age;
            profile.gender = gender;
            profile.height = height;
            profile.weight_goal = weight_goal;
            await profile.save();
        } else {
            // 新建资料
            profile = new UserProfile({
                user_id: userId,
                age,
                gender,
                height,
                weight_goal
            });
            await profile.save();
        }
        res.json({ success: true, profile });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};

// 修改用户名
exports.updateUsername = async (req, res) => {
    const userId = req.user.userId; // 需配合 authMiddleware 使用
    const { newName } = req.body;

    try {
        const user = await User.findOne({ user_id: userId });
        if (!user) {
            return res.status(404).json({ success: false, message: '用户未找到' });
        }
        // 检查新用户名是否已存在
        const existingUser = await User.findOne({ name: newName });
        if (existingUser) {
            return res.status(400).json({ success: false, message: '用户名已存在' });
        }
        // 更新用户名
        user.name = newName;
        await user.save();
        res.json({ success: true, message: '用户名更新成功', user: { user_id: user.user_id, name: user.name } });
    }
    catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
}

// 修改密码
exports.updatePassword = async (req, res) => {
    const userId = req.user.userId; // 需配合 authMiddleware 使用
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await User.findOne({ user_id: userId });
        if (!user) {
            return res.status(404).json({ success: false, message: '用户未找到' });
        }
        // 验证旧密码
        const isMatch = bcrypt.compareSync(oldPassword, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: '旧密码不正确' });
        }
        // 更新密码
        user.password_hash = bcrypt.hashSync(newPassword, 10);
        await user.save();
        res.json({ success: true, message: '密码更新成功' });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};

// 获取当前用户的基本信息
exports.getCurrentUserInfo = async (req, res) => {
    const userId = req.user.userId; // 需配合 authMiddleware 使用

    try {
        const user = await User.findOne({ user_id: userId });
        if (!user) {
            return res.status(404).json({ success: false, message: '用户未找到' });
        }
        res.json({
            success: true,
            user: {
                user_id: user.user_id,
                name: user.name,
                tel: user.tel,
                type: user.type,
                created_at: user.created_at
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};