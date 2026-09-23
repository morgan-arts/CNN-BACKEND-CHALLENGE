const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Ensure models/user.js exists

// 1. REGISTER ROUTE
router.post('/register', async (req, res) => {
try {
const { username, email, password } = req.body;

if (!username || !email || !password) {
return res.status(400).json({ message: 'All fields are required' });
}

let user = await User.findOne({ email });
if (user) {
return res.status(400).json({ message: 'User already exists' });
}

const hashedPassword = await bcrypt.hash(password, 10);
user = new User({ username, email, password: hashedPassword });
await user.save();

res.status(201).json({ message: 'User registered successfully' });
} catch (err) {
console.error('Registration Error:', err.message);
res.status(500).json({ error: err.message });
}
});

// 2. LOGIN ROUTE
router.post('/login', async (req, res) => {
try {
const { email, password } = req.body;

const user = await User.findOne({ email });
if (!user) {
return res.status(400).json({ message: 'Invalid credentials' });
}

const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
return res.status(400).json({ message: 'Invalid credentials' });
}

const token = jwt.sign(
{ userId: user._id },
process.env.JWT_SECRET || 'fallback_secret',
{ expiresIn: '1h' }
);

res.json({ token });
} catch (err) {
console.error('Login Error:', err.message);
res.status(500).json({ error: err.message });
}
});

module.exports = router;
