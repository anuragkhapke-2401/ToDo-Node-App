// app.js
require('dotenv').config(); // 👈 load .env first

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const todoRoutes = require('./routes/todoRoutes');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Use routes
app.use('/', todoRoutes);

// Use port from env or fallback to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

