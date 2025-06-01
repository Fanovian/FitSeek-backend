const UserProfile = require('../models/UserProfile');

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