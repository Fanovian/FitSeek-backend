const TrainLibrary = require('../models/TrainLibrary');
const { Types } = require('mongoose');

// 添加训练
exports.addTrain = async (req, res) => {
    const { name, category, note } = req.body;

    if (!name || !category) {
        return res.status(400).json({ success: false, message: '缺少必要参数' });
    }

    try {
        const train = new TrainLibrary({
            train_id: new Types.ObjectId().toString(),
            name,
            category,
            note: note || ''
        });
        await train.save();
        res.json({ success: true, train });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};

// 获取所有训练
exports.getAllTrain = async (req, res) => {
    try {
        const trains = await TrainLibrary.find({});
        res.json({ success: true, trains });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};

// 修改训练
exports.updateTrain = async (req, res) => {
    const { train_id, name, category, note } = req.body;

    if (!train_id) {
        return res.status(400).json({ success: false, message: '缺少 train_id' });
    }
    console.log("Updating train:", train_id, name, category, note);
    try {
        const train = await TrainLibrary.findOne({ train_id });
        if (!train) {
            return res.status(404).json({ success: false, message: '训练未找到' });
        }
        if (name !== undefined) train.name = name;
        if (category !== undefined) train.category = category;
        if (note !== undefined) train.note = note;
        await train.save();
        res.json({ success: true, train });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};

// 删除训练
exports.deleteTrain = async (req, res) => {
    const { train_id } = req.body;

    if (!train_id) {
        return res.status(400).json({ success: false, message: '缺少 train_id' });
    }

    try {
        const result = await TrainLibrary.deleteOne({ train_id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: '训练未找到' });
        }
        res.json({ success: true, message: '训练已删除' });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};