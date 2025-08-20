import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) 
        return res.status(400).json({
             msg: 'User exists' 
        });

    user = new User({ username, password: await bcrypt.hash(password, 10) });
    await user.save();
    res.json({ 
        msg: 'User registered' 
    });
  } catch (err) {
    res.status(500).json({
         msg: err.message
     });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ 
        msg: 'Invalid credentials' 
    });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ 
        msg: err.message 
    });
  }
};