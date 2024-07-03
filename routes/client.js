// routes/client.js

const express = require('express');
const router = express.Router();

router.get('/home', (req, res, next) => {
  res.render('client/client', { title: 'Admin Dashboard' });
});

module.exports = router;
