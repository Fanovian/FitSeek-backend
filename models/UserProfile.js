const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true, // 每个用户只有一个 profile
        ref: 'User'
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
    },
    height: {
        type: Number, // 单位：cm
        required: true,
    },
    weight_goal: {
        type: Number, // 单位：kg
        required: true,
    }
});

module.exports = mongoose.model('UserProfile', userProfileSchema);