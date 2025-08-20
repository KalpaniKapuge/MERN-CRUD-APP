import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ 
        message: 'Username & password required' 
      });
    }

    const existing = await User.findOne({ username });
    if (existing) 
      return res.status(400).json({ 
        message: 'Username already exists' 
      });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashed });

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) 
      return res.status(400).json({
       message: 'Invalid credentials' 
      });

    const match = await bcrypt.compare(password, user.password);
    if (!match) 
      return res.status(400).json({ 
        message: 'Invalid credentials' 
      });

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ 
      message: err.message 
    });
  }
};
