const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/send', async (req, res) => {
  const { customer_id, message, communication_log_id } = req.body;
  const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';
  await axios.post('http://localhost:3000/api/delivery_receipt', {
    communication_log_id,
    status,
  });
  res.status(200).json({ status });
});

module.exports = router;
