const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const mongoose = require('mongoose');

// 注册
exports.register = async (req, res) => {
  const { name, password, tel } = req.body;

  try {
    // 检查是否已存在用户名或手机号
    const existingUser = await User.findOne({ $or: [{ name }, { tel }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: '用户名或手机号已存在' });
    }

    // 加密密码
    const passwordHash = bcrypt.hashSync(password, 10);

    // 创建新用户（默认 type 为 'user'）
    const newUser = new User({
      user_id: new mongoose.Types.ObjectId().toString(), // 生成字符串类型的 user_id
      name,
      password_hash: passwordHash,
      tel,
      type: 'user',
    });

    await newUser.save();

    // 生成 JWT Token
    const token = jwt.sign(
      { userId: newUser.user_id, username: newUser.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        user_id: newUser.user_id,
        name: newUser.name,
        tel: newUser.tel,
        type: newUser.type,
        created_at: newUser.created_at
      }
    });

  } catch (error) {
    console.error('注册失败:', error);
    res.status(500).json({ success: false, message: '服务器错误', error });
  }
};

// 登录
exports.login = async (req, res) => {
  const { name, password } = req.body;

  try {
    // 查询用户是否存在
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(401).json({ success: false, message: '用户不存在' });
    }

    // 验证密码
    const isValidPassword = bcrypt.compareSync(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: '密码错误' });
    }

    // 生成 Token
    const token = jwt.sign(
      { userId: user.user_id, username: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        user_id: user.user_id,
        name: user.name,
        tel: user.tel,
        type: user.type,
        created_at: user.created_at
      }
    });

  } catch (error) {
    console.error('登录失败:', error);
    res.status(500).json({ success: false, message: '服务器错误', error });
  }
};