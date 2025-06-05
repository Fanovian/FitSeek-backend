const Announcement = require('../models/Announcement');
const { Types } = require('mongoose');

// 获取所有公告，按发布时间倒序排列
exports.getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find({}).sort({ publish_time: -1 });
        res.json({ success: true, announcements });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};

// 发布公告
exports.publishAnnouncement = async (req, res) => {
    const { publisher_name, content } = req.body;
    if (!publisher_name || !content) {
        return res.status(400).json({ success: false, message: '缺少必要参数' });
    }
    try {
        const announcement = new Announcement({
            ann_id: new Types.ObjectId().toString(),
            publisher_name,
            content,
            publish_time: Date.now()
        });
        await announcement.save();
        res.json({ success: true, announcement });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};

// 删除公告
exports.deleteAnnouncement = async (req, res) => {
    const { ann_id } = req.body;
    if (!ann_id) {
        return res.status(400).json({ success: false, message: '缺少 ann_id' });
    }
    try {
        const result = await Announcement.deleteOne({ ann_id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: '公告未找到' });
        }
        res.json({ success: true, message: '公告已删除' });
    } catch (error) {
        res.status(500).json({ success: false, message: '服务器错误', error });
    }
};