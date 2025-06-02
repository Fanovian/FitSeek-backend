const TrainingRecord = require('../models/TrainingRecord');
const { Types } = require('mongoose');

// 查询当前用户的所有训练记录
exports.getTrainingRecord = async (req, res) => {
    const userId = req.user.userId;
    try {
        const records = await TrainingRecord.find({ user_id: userId });
        res.json({ success: true, records });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};

// 添加一条训练记录（record_id 自动生成）
exports.createTrainingRecord = async (req, res) => {
    const userId = req.user.userId;
    const { train_type, duration, content, note, time } = req.body;

    if (!train_type || duration === undefined || !content) {
        return res.status(400).json({ success: false, message: '缺少必要参数' });
    }

    try {
        const record = new TrainingRecord({
            user_id: userId,
            record_id: new Types.ObjectId().toString(),
            train_type,
            duration,
            content,
            note: note || '',
            time: time || Date.now()
        });
        await record.save();
        res.json({ success: true, record });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};

// 更新一条训练记录（根据 record_id）
exports.updateTrainingRecord = async (req, res) => {
    const userId = req.user.userId;
    const { record_id, train_type, duration, content, note, time } = req.body;

    if (!record_id || !train_type || duration === undefined || !content) {
        return res.status(400).json({ success: false, message: '缺少必要参数' });
    }

    try {
        let record = await TrainingRecord.findOne({ user_id: userId, record_id });
        if (!record) {
            return res.status(404).json({ success: false, message: '记录未找到' });
        }
        // 更新
        record.train_type = train_type;
        record.duration = duration;
        record.content = content;
        record.note = note || '';
        if (time) record.time = time;
        await record.save();
        res.json({ success: true, record });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};

// 删除一条训练记录
exports.deleteTrainingRecord = async (req, res) => {
    const userId = req.user.userId;
    const { record_id } = req.body;

    if (!record_id) {
        return res.status(400).json({ success: false, message: '缺少 record_id' });
    }

    try {
        const result = await TrainingRecord.deleteOne({ user_id: userId, record_id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: '记录未找到' });
        }
        res.json({ success: true, message: '记录已删除' });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};