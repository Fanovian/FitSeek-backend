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
      return res.status(400).json({ code: 400, success: false, message: '用户名或手机号已存在' });
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

    res.status(200).json({
      code: 200,
      success: true,
      user: {
        user_id: newUser.user_id,
        type: newUser.type,
        created_at: newUser.created_at
      }
    });

  } catch (error) {
    console.error('注册失败:', error);
    res.status(500).json({ code: 500, success: false, message: '服务器错误', error });
  }
};

// 登录
exports.login = async (req, res) => {
  const { type, value, password } = req.body;

  try {
    // type = 0，value 为电话号码；type = 1，value 为用户名
    if(type !== 0 && type !== 1) {
      return res.status(400).json({ success: false, message: '无效的登录类型' });
    } else if(type === 0) {
      // type = 0，value 为电话号码
      const user = await User.findOne({ tel: value });
      // 如果没有找到用户，返回 401 错误
      if (!user) {
        return res.status(401).json({ success: false, message: '手机号未注册' });
      }
      // 如果用户存在，检查密码
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
        code: 200,
        success: true,
        token,
        user: {
          user_id: user.user_id,
          type: user.type,
          created_at: user.created_at
        }
      });
    } else {
      // type = 1，value 为用户名
      const user = await User.findOne({ name: value });
      // 如果没有找到用户，返回 401 错误
      if (!user) {
        return res.status(401).json({ success: false, message: '用户名未注册' });
      }
      // 如果用户存在，检查密码
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
        code: 200,
        success: true,
        token,
        user: {
          user_id: user.user_id,
          type: user.type,
          created_at: user.created_at
        }
      });
    }

  } catch (error) {
    console.error('登录失败:', error);
    res.status(500).json({ success: false, message: '服务器错误', error });
  }
};

// 管理员注册
exports.adminRegister = async (req, res) => {
  const { name, password } = req.body;

  try {
    // 检查是否已存在用户名
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ code: 400, success: false, message: '用户名已存在' });
    }

    // 加密密码
    const passwordHash = bcrypt.hashSync(password, 10);

    // 创建新管理员用户
    const newAdmin = new User({
      user_id: new mongoose.Types.ObjectId().toString(),
      name,
      password_hash: passwordHash,
      type: 'admin',
    });

    await newAdmin.save();

    res.status(200).json({
      code: 200,
      success: true,
      user: {
        user_id: newAdmin.user_id,
        type: newAdmin.type,
        created_at: newAdmin.created_at
      }
    });

  } catch (error) {
    console.error('管理员注册失败:', error);
    res.status(500).json({ code: 500, success: false, message: '服务器错误', error });
  }
};

// 管理员登录
exports.adminLogin = async (req, res) => {
  const { name, password } = req.body;

  try {
    // 查找管理员
    const admin = await User.findOne({ name, type: 'admin' });
    
    // 如果没有找到管理员用户，返回 401 错误
    if (!admin) {
      return res.status(401).json({ code: 401, success: false, message: '管理员账号不存在' });
    }
    
    // 验证密码
    const isValidPassword = bcrypt.compareSync(password, admin.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ code: 401, success: false, message: '密码错误' });
    }
    
    // 生成 Token
    const token = jwt.sign(
      { userId: admin.user_id, username: admin.name, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      code: 200,
      success: true,
      token,
      user: {
        user_id: admin.user_id,
        type: admin.type,
        created_at: admin.created_at
      }
    });

  } catch (error) {
    console.error('管理员登录失败:', error);
    res.status(500).json({ code: 500, success: false, message: '服务器错误', error });
  }
};