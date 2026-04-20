// backend/src/routes/categories.js
const express = require('express');
const { query } = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Lista categorias do usuário logado
router.get('/', authenticateToken, async (req, res) => {
  try {
    const r = await query(
      'SELECT * FROM categories WHERE user_id = $1 ORDER BY id ASC',
      [req.user.id]
    );
    res.json(r.rows);
  } catch (err) {
    console.error('Erro ao listar categorias:', err);
    res.status(500).json({ message: 'Erro ao listar categorias' });
  }
});

// Cria nova categoria
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, type, color, icon } = req.body;

    const r = await query(
      `INSERT INTO categories (user_id, name, type, color, icon)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [req.user.id, name, type || 'expense', color || null, icon || null]
    );

    res.status(201).json(r.rows[0]);
  } catch (err) {
    console.error('Erro ao criar categoria:', err);
    res.status(500).json({ message: 'Erro ao criar categoria' });
  }
});

module.exports = router;
