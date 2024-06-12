const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'crmapp',
    password: 'Aditya@1002',
    port: 5432,
});

router.post('/', async (req, res) => {
  const { name, email, total_spends, max_visits, last_visited } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO customers (name, email, total_spends, max_visits, last_visited) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, total_spends, max_visits, last_visited]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
