const express = require('express');
const app = express();
const { Pool } = require('pg');
const cors = require('cors');
app.use(express.json());
app.use(cors());


// PostgreSQL database configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'crmapp',
  password: 'Aditya@1002',
  port: 5432,
});

// Route imports
const customers = require('./routes/customers');
const orders = require('./routes/orders');
const audiences = require('./routes/audiences');
const campaigns = require('./routes/campaigns');
const vendor = require('./routes/vendor');
const deliveryReceipt = require('./routes/deliveryReceipt');

// Route usage
app.use('/api/customers', customers);
app.use('/api/orders', orders);
app.use('/api/audiences', audiences);
app.use('/api/campaigns', campaigns);
app.use('/api/vendor', vendor);
app.use('/api/delivery_receipt', deliveryReceipt);
app.get('/status', (req, res) => {
    res.send('Server is running');
  });
  

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
