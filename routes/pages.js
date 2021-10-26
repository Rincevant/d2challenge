const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('Request for home recieved');
  res.render('index');
});

router.get('/login', (req, res) => {
  console.log('Request for login page recieved');
  res.render('login');
});

router.get('/register', (req, res) => {
    console.log('Request for register page recieved');
    res.render('register');
  });

router.get('/holygrail', (req, res) => {
  console.log('Request for holygrail page recieved');
  //res.render('contact');
});

module.exports = router;