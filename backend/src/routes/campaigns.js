const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'crmapp',
    password: 'Aditya@1002',
    port: 5432,
});
// router.get('/', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM communications_log ORDER BY created_at DESC');
//     res.status(200).json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
router.post('/send', async (req, res) => {
  const { audience_id, message } = req.body;
  try {
    const audienceResult = await pool.query('SELECT * FROM communications_log WHERE id = $1', [audience_id]);
    const audience = audienceResult.rows[0].audience;

    // Simulate sending messages to customers
    for (const customer of audience) {
      const personalizedMessage = message.replace('{name}', customer.name);
      await axios.post('http://localhost:3000/api/vendor/send', {
        customer_id: customer.id,
        message: personalizedMessage,
        communication_log_id: audience_id,
      });
    }
    res.status(200).json({ message: 'Campaign sent' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/pending', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM communications_log WHERE status = $1 ORDER BY created_at DESC', ['PENDING']);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to fetch past campaigns
router.get('/past', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM communications_log WHERE status IN ($1, $2) ORDER BY created_at DESC', ['SENT', 'FAILED']);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
