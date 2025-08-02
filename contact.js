const express = require('express');
const router = express.Router();
const db = require('../db'); // db should export a MySQL connection

router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = 'INSERT INTO users (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error('DB Error:', err);
      return res.status(500).json({ error: 'Database insert failed' });
    }
    res.status(200).json({ message: 'Message sent successfully!' });
  });
});

module.exports = router;



