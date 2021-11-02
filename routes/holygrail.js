const express = require('express')
const router = express.Router()
const UniqueItems = require('../database/unique_items._repository');

// Holy Grail Total recap
router.get('/total', async (req, res) => {
  console.log('Request for holygrail total');
    res.render('holytotal');
});

// Holy Grail Uniques Armors
router.get('/u_armors', async (req, res) => {
  console.log('Request for holygrail uniques armors');
  var objets = await UniqueItems.getAllUniqueArmors()
  res.render('u_armors_holy', {objets:objets});
});

// Holy Grail Uniques Weapons
router.get('/u_weapons', async (req, res) => {
  console.log('Request for holygrail uniques');
  var objets = await UniqueItems.getAllUniqueWeapons()
  res.render('u_weapons_holy', {objets:objets});
});

router.get('/u_others', async (req, res) => {
  console.log('Request for holygrail uniques');
  res.render('holyuniques');
});

router.get('/set', async (req, res) => {
  console.log('Request for holygrail page set');
  res.render('holyset');
});

router.get('/runewords', async (req, res) => {
  console.log('Request for holygrail page runwords');
  res.render('holyrunewords');
});

router.get('/', async (req, res) => {
  console.log('Request for holygrail page recieved');  
  var objets = await UniqueItems.getAllUnique()
  res.render('holygrail', {objets:objets});
});

module.exports = router