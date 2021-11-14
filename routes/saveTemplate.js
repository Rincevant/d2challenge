const express = require('express');
const router = express.Router();
const services = require('../services/services')  
const Users = require('../database/users_repository')
const HolyGrail = require('../database/holygrail_repository')

router.post('/', services.authentificateToken, async (req, res) => {
    var user = await Users.getUserByName(req.user.username)
    var result = await HolyGrail.editHolyGrail(req.body, user.id)

    
    res.status(200).render('index')
  });

module.exports = router;