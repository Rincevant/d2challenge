const express = require('express')
const router = express.Router()
const User = require('../database/users_repository');
const Token = require('../database/token_repository')

router.get('/login', (req, res) => {
    console.log('Request for login page recieved');
    res.render('login');
});
  
router.get('/register', (req, res) => {
    console.log('Request for register page recieved');
    res.render('register');
});
  
router.post('/register', (req, res) => {
    console.log(req.body)
    console.log('register new user');
    res.render('index');
});

module.exports = router