const Article = require('../models/Article');
const { Types } = require('mongoose');

// 获取所有文章，按发布时间倒序排列
exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find({}).sort({ publish_time: -1 });
        res.json({ success: true, articles });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};

// 发布新文章
exports.publishArticle = async (req, res) => {
    const { publisher_name, content } = req.body;
    if (!publisher_name || !content) {
        return res.status(400).json({ success: false, message: '缺少必要参数' });
    }
    try {
        const article = new Article({
            art_id: new Types.ObjectId().toString(),
            publisher_name,
            content,
            publish_time: Date.now()
        });
        await article.save();
        res.json({ success: true, article });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};

// 删除文章
exports.deleteArticle = async (req, res) => {
    const { art_id } = req.body;
    if (!art_id) {
        return res.status(400).json({ success: false, message: '缺少 art_id' });
    }
    try {
        const result = await Article.deleteOne({ art_id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: '文章未找到' });
        }
        res.json({ success: true, message: '文章已删除' });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};