const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    art_id: {
        type: String,
        required: true,
        unique: true
    },
    publisher_name: {
        type: String,
        required: true
    },
    content: {
        type: String, // Markdown 格式
        required: true
    },
    publish_time: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Article', articleSchema);