const FitnessRecord = require('../models/FitnessRecord');
const { Types } = require('mongoose');

// 查询当前用户的所有健康记录
exports.getFitnessRecord = async (req, res) => {
    const userId = req.user.userId;
    try {
        const records = await FitnessRecord.find({ user_id: userId });
        res.json({ success: true, records });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};

// 添加一条健康记录（record_id 自动生成）
exports.createFitnessRecord = async (req, res) => {
    const userId = req.user.userId;
    const { type, value, note, time } = req.body;

    if (!type || value === undefined) {
        return res.status(400).json({ success: false, message: '缺少必要参数' });
    }

    try {
        const record = new FitnessRecord({
            user_id: userId,
            record_id: new Types.ObjectId().toString(),
            type,
            value,
            note: note || '',
            time: time || Date.now()
        });
        await record.save();
        res.json({ success: true, record });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};

// 更新一条健康记录（根据 record_id）
exports.updateFitnessRecord = async (req, res) => {
    const userId = req.user.userId;
    const { record_id, type, value, note, time } = req.body;

    if (!record_id || !type || value === undefined) {
        return res.status(400).json({ success: false, message: '缺少必要参数' });
    }

    try {
        let record = await FitnessRecord.findOne({ user_id: userId, record_id });
        if (!record) {
            return res.status(404).json({ success: false, message: '记录未找到' });
        }
        // 更新
        record.type = type;
        record.value = value;
        record.note = note || '';
        if (time) record.time = time;
        await record.save();
        res.json({ success: true, record });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};

// 删除一条健康记录
exports.deleteFitnessRecord = async (req, res) => {
    const userId = req.user.userId;
    const { record_id } = req.body;

    if (!record_id) {
        return res.status(400).json({ success: false, message: '缺少 record_id' });
    }

    try {
        const result = await FitnessRecord.deleteOne({ user_id: userId, record_id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: '记录未找到' });
        }
        res.json({ success: true, message: '记录已删除' });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};