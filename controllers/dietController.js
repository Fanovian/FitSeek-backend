const DietRecord = require('../models/DietRecord');
const { Types } = require('mongoose');

// 查询当前用户的所有饮食记录
exports.getDietRecord = async (req, res) => {
    const userId = req.user.userId;
    try {
        const records = await DietRecord.find({ user_id: userId });
        res.json({ success: true, records });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};

// 添加一条饮食记录（record_id 自动生成）
exports.createDietRecord = async (req, res) => {
    const userId = req.user.userId;
    const { meal_type, calories, food_name, note, time } = req.body;

    if (!meal_type || calories === undefined || !food_name) {
        return res.status(400).json({ success: false, message: '缺少必要参数' });
    }

    try {
        const record = new DietRecord({
            user_id: userId,
            record_id: new Types.ObjectId().toString(),
            meal_type,
            calories,
            food_name,
            note: note || '',
            time: time || Date.now()
        });
        await record.save();
        res.json({ success: true, record });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};

// 更新一条饮食记录（根据 record_id）
exports.updateDietRecord = async (req, res) => {
    const userId = req.user.userId;
    const { record_id, meal_type, calories, food_name, note, time } = req.body;

    if (!record_id || !meal_type || calories === undefined || !food_name) {
        return res.status(400).json({ success: false, message: '缺少必要参数' });
    }

    try {
        let record = await DietRecord.findOne({ user_id: userId, record_id });
        if (!record) {
            return res.status(404).json({ success: false, message: '记录未找到' });
        }
        // 更新
        record.meal_type = meal_type;
        record.calories = calories;
        record.food_name = food_name;
        record.note = note || '';
        if (time) record.time = time;
        await record.save();
        res.json({ success: true, record });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};

// 删除一条饮食记录
exports.deleteDietRecord = async (req, res) => {
    const userId = req.user.userId;
    const { record_id } = req.body;

    if (!record_id) {
        return res.status(400).json({ success: false, message: '缺少 record_id' });
    }

    try {
        const result = await DietRecord.deleteOne({ user_id: userId, record_id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: '记录未找到' });
        }
        res.json({ success: true, message: '记录已删除' });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};