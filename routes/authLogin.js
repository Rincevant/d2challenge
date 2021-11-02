const express = require('express')
const router = express.Router()
const User = require('../database/users_repository');
const Token = require('../database/token_repository')

router.get('/', (req, res) => {
    console.log('Request for login page recieved');
    res.render('login');
});  

module.exports = router