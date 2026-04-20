// backend/src/services/points.js
const { query } = require('../db');

async function addUserPoints(userId, points) {
  if (!points || points === 0) return null;

  // 1) pega os pontos atuais
  const currentRes = await query(
    'SELECT total_points, current_level FROM users WHERE id = $1',
    [userId]
  );

  const current = currentRes.rows[0]?.total_points || 0;

  // 2) calcula novos valores em JavaScript
  const newTotal = current + points;
  const newLevel = Math.floor(newTotal / 100) + 1;

  // 3) salva no banco
  const updateRes = await query(
    `
      UPDATE users
         SET total_points = $1,
             current_level = $2
       WHERE id = $3
       RETURNING id, total_points, current_level;
    `,
    [newTotal, newLevel, userId]
  );

  return updateRes.rows[0];
}

module.exports = { addUserPoints };
