// routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM todos ORDER BY created_at DESC', (err, results) => {
    if (err) throw err;
    res.render('index', { todos: results });
  });
});

router.post('/add', (req, res) => {
  const { title } = req.body;
  if (title) {
    db.query('INSERT INTO todos (title) VALUES (?)', [title], (err) => {
      if (err) throw err;
      res.redirect('/');
    });
  }
});

router.post('/complete/:id', (req, res) => {
  const id = req.params.id;
  db.query('UPDATE todos SET completed = true WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

router.post('/delete/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM todos WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

module.exports = router;

