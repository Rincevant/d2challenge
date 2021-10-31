const express = require('express')
const router = express.Router()
const UniqueItems = require('../database/unique_items._repository');

router.get('/', async (req, res) => {
    console.log('Request for holygrail page recieved');
    
    var objets = await UniqueItems.getAllUnique()

    res.render('holygrail', {objets:objets});
  });

module.exports = router