const express = require('express')
const router = express.Router()
const User = require('../database/users_repository');
const Token = require('../database/token_repository')

  
router.get('/', (req, res) => {
    console.log('Request for register page recieved');
    res.render('register');
});
  
router.post('/', (req, res) => {
    console.log(req.body)
    console.log('register new user');
    res.render('index');
});

module.exports = router