// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // 移除 useNewUrlParser 和 useUnifiedTopology
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;