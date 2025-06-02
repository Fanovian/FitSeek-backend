const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const profileRoutes = require('./routes/profileRoutes');
const fitnessRoutes = require('./routes/fitnessRoutes');
const dietRoutes = require('./routes/dietRoutes');
const trainingRoutes = require('./routes/trainingRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/fitness', fitnessRoutes);
app.use('/api/diet', dietRoutes);
app.use('/api/training', trainingRoutes);

// 错误处理中间件（可选）
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: '服务器内部错误' });
});

module.exports = app;