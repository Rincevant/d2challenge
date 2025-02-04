const express = require('express');
const router = express.Router();
const services = require('../services/services') 

router.get('/', async (req, res) => {
  res.render('index');
});

router.get('/profile', services.isUserConnected,  async (req, res) => {
  res.render('profile');
});

module.exports = router;