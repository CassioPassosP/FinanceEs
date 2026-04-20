// backend/src/routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { query } = require('../db');

require('dotenv').config();
const router = express.Router();


router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'missing fields' });

    // checar se já existe
    const exists = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (exists.rows.length) return res.status(400).json({ message: 'email already used' });

    const hashed = await bcrypt.hash(password, 10);
    const insert = await query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1,$2,$3) RETURNING id, name, email',
      [name, email, hashed]
    );
    res.status(201).json(insert.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRes = await query('SELECT id, name, email, password_hash FROM users WHERE email = $1', [email]);
    const user = userRes.rows[0];
    if (!user) return res.status(400).json({ message: 'invalid credentials' });
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(400).json({ message: 'invalid credentials' });
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
});

module.exports = router;
