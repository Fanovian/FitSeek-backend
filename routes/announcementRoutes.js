const express = require('express');
const router = express.Router();
const { getAllAnnouncements, publishAnnouncement, deleteAnnouncement } = require('../controllers/announcementController');

// 获取所有公告
router.get('/get', getAllAnnouncements);
// 发布公告
router.post('/publish', publishAnnouncement);
// 删除公告
router.post('/delete', deleteAnnouncement);


module.exports = router;
