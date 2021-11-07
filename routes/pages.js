const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  console.log('Request for home recieved');
  var template = require('../database/Models/template_own')

  var data = { name : "Julien\'s", age : 32 }
  
  res.render('index' , {template : template } );
});

module.exports = router;