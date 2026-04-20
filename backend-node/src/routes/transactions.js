const express = require('express');
const { query } = require('../db');
const { authenticateToken } = require('../middleware/auth');
const { addUserPoints } = require('../services/points');

const router = express.Router();

/**
 * Lista transações do usuário logado
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const r = await query(
      `SELECT t.*, c.name AS category_name, c.type AS category_type, c.color, c.icon
       FROM transactions t
       LEFT JOIN categories c ON t.category_id = c.id
       WHERE t.user_id = $1
       ORDER BY t.date DESC`,
      [req.user.id]
    );

    return res.json(r.rows);
  } catch (err) {
    console.error('Erro ao buscar transações:', err);
    res.status(500).json({ message: 'Erro ao buscar transações' });
  }
});

/**
 * Criar transação
 */
router.post('/', authenticateToken, async (req, res) => {
  const { type, category_id, amount, description, date } = req.body;

  try {
    const r = await query(
      `INSERT INTO transactions (user_id, type, category_id, amount, description, date)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [req.user.id, type, category_id, amount, description, date]
    );

    await addUserPoints(req.user.id, 1);
    return res.status(201).json(r.rows[0]);
  } catch (err) {
    console.error('Erro ao criar transação:', err);
    res.status(500).json({ message: 'Erro ao criar transação' });
  }
});

/**
 * Atualizar transação
 */
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { type, category_id, amount, description, date } = req.body;

  try {
    const r = await query(
      `UPDATE transactions
       SET type=$1, category_id=$2, amount=$3, description=$4, date=$5
       WHERE id=$6 AND user_id=$7
       RETURNING *`,
      [type, category_id, amount, description, date, id, req.user.id]
    );

    if (r.rowCount === 0) {
      return res.status(404).json({ message: 'Transação não encontrada' });
    }

    res.json(r.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar transação:', err);
    res.status(500).json({ message: 'Erro ao atualizar transação' });
  }
});

/**
 * Deletar transação
 */
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const r = await query(
      `DELETE FROM transactions
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [id, req.user.id]
    );

    if (r.rowCount === 0) {
      return res.status(404).json({ message: 'Transação não encontrada' });
    }

    res.json({ message: 'Transação removida com sucesso' });
  } catch (err) {
    console.error('Erro ao excluir transação:', err);
    res.status(500).json({ message: 'Erro ao excluir transação' });
  }
});

module.exports = router;
