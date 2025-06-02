const mongoose = require('mongoose');

const trainingRecordSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    ref: 'User'
  },
  record_id: {
    type: String,
    required: true,
    unique: true // 每条记录唯一
  },
  time: {
    type: Date,
    required: true,
    default: Date.now
  },
  train_type: {
    type: String,
    enum: ['aerobic', 'anaerobic', 'streching', 'other'], // 训练类型
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  note: {
    type: String,
    default: ''
  },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('TrainingRecord', trainingRecordSchema);