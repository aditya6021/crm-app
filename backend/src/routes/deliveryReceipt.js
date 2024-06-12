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
  const { communication_log_id, status } = req.body;
  try {
    await pool.query('UPDATE communications_log SET status = $1 WHERE id = $2', [status, communication_log_id]);
    res.status(200).json({ message: 'Status updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
