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
  const { customer_id, order_value, order_date } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO orders (customer_id, order_value, order_date) VALUES ($1, $2, $3) RETURNING *',
      [customer_id, order_value, order_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
