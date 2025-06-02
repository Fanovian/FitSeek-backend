const mongoose = require('mongoose');

const fitnessRecordSchema = new mongoose.Schema({
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
  type: {
    type: String,
    enum: ['weight', 'body_fat', 'heart_rate', 'blood_oxygen'],
    required: true
  },
  value: {
    type: Number,
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

module.exports = mongoose.model('FitnessRecord', fitnessRecordSchema);