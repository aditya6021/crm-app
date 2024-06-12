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

function generateAudienceQuery(rules) {
  let query = 'SELECT * FROM customers WHERE ';
  rules.forEach((rule, index) => {
    if (index > 0) {
      query += ` ${rule.condition} `;
    }
    if (rule.field === 'last_visited' && rule.operator === 'NOT_VISITED_LAST_3_MONTHS') {
      query += `last_visited < NOW() - INTERVAL '3 months'`;
    } else {
      query += `${rule.field} ${rule.operator} '${rule.value}'`;
    }
  });
  return query;
}

router.post('/', async (req, res) => {
  const { rules } = req.body;
  try {
    const audienceQuery = generateAudienceQuery(rules);
    const result = await pool.query(audienceQuery);
    const audience = result.rows;

    // Convert audience array to JSON string
    const audienceJSON = JSON.stringify(audience);

    // Insert the JSON string into the communications_log table
    const commLog = await pool.query('INSERT INTO communications_log (audience) VALUES ($1) RETURNING *', [audienceJSON]);
    res.status(201).json(commLog.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/check_size', async (req, res) => {
  const { rules } = req.body;
  try {
    const audienceQuery = generateAudienceQuery(rules);
    const result = await pool.query(audienceQuery);
    const size = result.rowCount;
    res.status(200).json({ size });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;