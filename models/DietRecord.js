const mongoose = require('mongoose');

const dietRecordSchema = new mongoose.Schema({
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
  meal_type: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  food_name: {
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

module.exports = mongoose.model('DietRecord', dietRecordSchema);