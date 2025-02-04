const express = require('express')
const router = express.Router()
const UniqueItems = require('../database/unique_items._repository');
const Runewords = require('../database/runewords_repository')
const SetItems = require('../database/set_items_repository')

// Holy Grail Total recap
router.get('/', async (req, res) => {
  console.log('Request for holygrail total');
  const objects = [
    { id: 1, name: "Pomme" },
    { id: 2, name: "Banane" },
    { id: 3, name: "Orange" },
    { id: 4, name: "Poire" }
  ];
    res.render('holygrail', { objects });
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

// Holy Grail Uniques Others
router.get('/u_others', async (req, res) => {
  console.log('Request for holygrail uniques');
  var objets = await UniqueItems.getAllUniqueOthers()
  res.render('u_others_holy', {objets:objets});
});

// Holy Grail Runewords
router.get('/runewords', async (req, res) => {
  console.log('Request for holygrail page runwords');
  var objets = await Runewords.getAllRunewords()
  res.render('holyrunewords', {objets:objets});
});

// Holy Grail Set
router.get('/set', async (req, res) => {
  console.log('Request for holygrail page set');
  var objets = await SetItems.getAllSet()
  var setName = require("../database/Models/setsList")
  res.render('holyset', {objets:objets, setName:setName});
});

module.exports = router