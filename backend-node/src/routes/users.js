// backend/src/routes/users.js
const express = require('express');
const { query } = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

/**
 * GET /api/users/me
 * Retorna o perfil completo do usuário logado
 */
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const r = await query(
      `
      SELECT
        id,
        email,
        name,
        full_name,
        profile_type,
        monthly_budget,
        total_points,
        current_level
      FROM users
      WHERE id = $1
      `,
      [req.user.id]
    );

    if (r.rowCount === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.json(r.rows[0]);
  } catch (err) {
    console.error('Erro ao buscar perfil:', err);
    return res.status(500).json({ message: 'Erro ao buscar perfil' });
  }
});

/**
 * PUT /api/users/me
 * Atualiza dados do perfil: full_name, profile_type, monthly_budget
 */
router.put('/me', authenticateToken, async (req, res) => {
  const { full_name, profile_type, monthly_budget } = req.body;

  const fields = [];
  const values = [];
  let idx = 1;

  if (full_name !== undefined) {
    fields.push(`full_name = $${idx++}`);
    values.push(full_name);
  }

  if (profile_type !== undefined) {
    fields.push(`profile_type = $${idx++}`);
    values.push(profile_type);
  }

  if (monthly_budget !== undefined) {
    fields.push(`monthly_budget = $${idx++}`);
    values.push(monthly_budget);
  }

  if (fields.length === 0) {
    return res.status(400).json({ message: 'Nenhum campo para atualizar' });
  }

  values.push(req.user.id);

  const sql = `
    UPDATE users
       SET ${fields.join(', ')}
     WHERE id = $${idx}
     RETURNING
       id,
       email,
       name,
       full_name,
       profile_type,
       monthly_budget,
       total_points,
       current_level
  `;

  try {
    const r = await query(sql, values);

    if (r.rowCount === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.json(r.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar perfil:', err);
    return res.status(500).json({ message: 'Erro ao atualizar perfil' });
  }
});

module.exports = router;
