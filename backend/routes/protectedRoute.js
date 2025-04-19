// routes/protectedRoute.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Example of a protected route
router.get('/protected', auth, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
