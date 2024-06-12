CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  total_spends INTEGER,
  max_visits INTEGER,
  last_visited DATE
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  order_value INTEGER,
  order_date DATE
);

CREATE TABLE communications_log (
  id SERIAL PRIMARY KEY,
  audience JSON,
  status VARCHAR(50)
);
