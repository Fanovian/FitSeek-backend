const express = require('express');
const router = express.Router();
const { getAllArticles, publishArticle, deleteArticle } = require('../controllers/articleController');

// 获取所有文章
router.get('/get', getAllArticles);
// 发布文章
router.post('/publish', publishArticle);
// 删除文章
router.post('/delete', deleteArticle);

module.exports = router;