// backend/scripts/runMigrations.js
const fs = require('fs');
const path = require('path');
const { pool } = require('../src/db');

async function run() {
  try {
    const sql = fs.readFileSync(path.join(__dirname, '../migrations/001_init.sql')).toString();
    await pool.query(sql);
    console.log('Migrations applied');
    await pool.end();
  } catch (err) {
    console.error('Migration error', err);
    process.exit(1);
  }
}

run();
