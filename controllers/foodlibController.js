const FoodLibrary = require('../models/FoodLibrary');
const { Types } = require('mongoose');

// 添加食物
exports.addFood = async (req, res) => {
    const { name, calories, category, note } = req.body;

    if (!name || calories === undefined || !category) {
        return res.status(400).json({ success: false, message: '缺少必要参数' });
    }

    try {
        const food = new FoodLibrary({
            food_id: new Types.ObjectId().toString(),
            name,
            calories,
            category,
            note: note || ''
        });
        await food.save();
        res.json({ success: true, food });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};

// 获取所有食物
exports.getAllFood = async (req, res) => {
    try {
        const foods = await FoodLibrary.find({});
        res.json({ success: true, foods });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};

// 修改食物
exports.updateFood = async (req, res) => {
    const { food_id, name, calories, category, note } = req.body;

    if (!food_id) {
        return res.status(400).json({ success: false, message: '缺少 food_id' });
    }

    try {
        const food = await FoodLibrary.findOne({ food_id });
        if (!food) {
            return res.status(404).json({ success: false, message: '食物未找到' });
        }
        if (name !== undefined) food.name = name;
        if (calories !== undefined) food.calories = calories;
        if (category !== undefined) food.category = category;
        if (note !== undefined) food.note = note;
        await food.save();
        res.json({ success: true, food });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};

// 删除食物
exports.deleteFood = async (req, res) => {
    const { food_id } = req.body;

    if (!food_id) {
        return res.status(400).json({ success: false, message: '缺少 food_id' });
    }

    try {
        const result = await FoodLibrary.deleteOne({ food_id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: '食物未找到' });
        }
        res.json({ success: true, message: '食物已删除' });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};