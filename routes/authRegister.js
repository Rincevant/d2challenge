const express = require('express')
const router = express.Router()
const User = require('../database/users_repository');
const Holygrail = require('../database/holygrail_repository');
const bcrypt = require('bcryptjs')
const services = require('../services/services')  

var response = { text : "", kind : ""}

router.get('/', async (req, res) => {
    res.render('register', {message : null});
});
  
router.post('/', async (req, res) => {

    try {
        if (services.validateUser(req.body)) {   
          console.log("userName & email & password OK...")
      
          // Check if user is unique
          oneUser = await User.getUniqueUser(req.body.username, req.body.email)
          response.kind = "error"
          response.text = "Username or email already exist"          
          if (oneUser.length != 0) return res.status(400).render('register', {message : response})
          // Create hash password from user password
          var salt = bcrypt.genSaltSync(8);
          var hashPassword = bcrypt.hashSync(req.body.password, salt);
      
          // Add user to database
          resultAdded = await User.addUserToDatabase(req.body.username, hashPassword, req.body.email, req.body.class, req.body.gamemode, req.body.platform, req.body.region)
          
          // Create entry for holygrail
          await Holygrail.addHolyGrailToDatabase(resultAdded.id)
    
          if (resultAdded != null)  {
            response.kind = "valid"
            response.text = "Register successfull"
            return res.status(200).render('register', {message : response})
          }
          else {
            response.kind = "error"
            response.text = "Error on server try later"
            return res.status(500).render('register')
          }
    
        } else {
          response.text = "Username or password invalid"
          response.kind = "error"
          res.status(400).render('register', {message : response})
        }    
    } catch (error) {
        console.log(error)
        res.status(400).render('index')
    }
});

module.exports = router