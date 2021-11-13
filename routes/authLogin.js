const express = require('express')
const router = express.Router()
const User = require('../database/users_repository');
const Token = require('../database/token_repository')
const Holygrail = require('../database/holygrail_repository')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

var response = { text : "", kind : ""}
var token = null
var holygrail = null

router.get('/', (req, res) => {
    console.log('Request for login page recieved');
    res.render('login', {message : null, token : null, holygrail : null});
});  

router.post('/', async (req, res) => {
    console.log("Asking for connection to d2challenge...")

    //Check if email or username exist    
    const user = await User.getUniqueUser(req.body.loginid, req.body.loginid)
    response.kind = "error"
    response.text = "Wrong Username or password"  
    if (user.length == 0) return res.status(400).render('login', {message : response, token : token, holygrail : holygrail})    
    
    //Check if Password is valid
    const validPassword = await bcrypt.compare(req.body.password, user[0].password)
    response.kind = "error"
    response.text = "Wrong Username or password"
    if (!validPassword) return res.status(400).render('login', {message : response, token : token, holygrail : holygrail})    

    //Create token and sent it back
    token = jwt.sign( {username : user[0].username, avatar : user[0].avatar}, 'blablasecret', {expiresIn: '1h'})
    await Token.addTokenToUser(user[0].id, token)

    // Get the user holygrail
    holygrail = await Holygrail.getTemplateByIdUser(user[0].id)

    response.kind = 'valid'
    response.text = "Login sucessfull"
    res.status(200).header('auth_token', token).render('login', {message : response, token : token, holygrail : holygrail.holygrail})
});  

module.exports = router