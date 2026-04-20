// backend/src/routes/goals.js
const express = require('express');
const { query } = require('../db');
const { authenticateToken } = require('../middleware/auth');
const { addUserPoints } = require('../services/points');

const router = express.Router();

// LISTAR metas do usuário logado
router.get('/', authenticateToken, async (req, res) => {
  try {
    const r = await query(
      'SELECT * FROM goals WHERE user_id = $1 ORDER BY id ASC',
      [req.user.id]
    );
    res.json(r.rows);
  } catch (err) {
    console.error('Erro ao listar metas:', err);
    res.status(500).json({ message: 'Erro ao listar metas' });
  }
});

// CRIAR meta
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, target_amount, due_date } = req.body;

    const r = await query(
      `INSERT INTO goals (user_id, title, target_amount, due_date)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [req.user.id, title, target_amount, due_date || null]
    );

    await addUserPoints(req.user.id, 5);
    res.status(201).json(r.rows[0]);
  } catch (err) {
    console.error('Erro ao criar meta:', err);
    res.status(500).json({ message: 'Erro ao criar meta' });
  }
});

// ATUALIZAR meta (título, valor, status, current_amount, due_date)
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, target_amount, due_date, status, current_amount } = req.body;

  try {
    const r = await query(
      `
      UPDATE goals
         SET
           title = COALESCE($1, title),
           target_amount = COALESCE($2, target_amount),
           due_date = COALESCE($3, due_date),
           status = COALESCE($4, status),
           current_amount = COALESCE($5, current_amount)
       WHERE id = $6
         AND user_id = $7
       RETURNING *;
      `,
      [
        title ?? null,
        target_amount ?? null,
        due_date ?? null,
        status ?? null,
        current_amount ?? null,
        id,
        req.user.id,
      ]
    );

    if (r.rowCount === 0) {
      return res.status(404).json({ message: 'Meta não encontrada' });
    }

    const updated = r.rows[0];

    // se a meta acabou de ser marcada como 'completed', dá pontos
    if (status === 'completed') {
      await addUserPoints(req.user.id, 50);
    }

    return res.json(updated);
  } catch (err) {
    console.error('Erro ao atualizar meta:', err);
    return res.status(500).json({ message: 'Erro ao atualizar meta' });
  }
});


router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const r = await query(
      'DELETE FROM goals WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.id]
    );

    if (r.rowCount === 0) {
      return res.status(404).json({ message: 'Meta não encontrada' });
    }

    return res.json({ message: 'Meta excluída com sucesso' });
  } catch (err) {
    console.error('Erro ao excluir meta:', err);
    return res.status(500).json({ message: 'Erro ao excluir meta' });
  }
});



module.exports = router;
