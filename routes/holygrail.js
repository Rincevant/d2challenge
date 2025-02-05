const express = require('express')
const router = express.Router()
const UniqueItems = require('../database/unique_items._repository');
const Runewords = require('../database/runewords_repository')
const SetItems = require('../database/set_items_repository')

// Holy Grail Total recap
router.get('/', async (req, res) => {
  console.log('Request for holygrail search');
    res.render('holygrail', {objets: null});
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
  console.log('Request for holygrail page runewords');
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

// Search items
router.post('/search', async (req, res) => {
  console.log('Searching items');

  try {
      // Récupérer la valeur envoyée dans le body et la mettre en minuscule
      const searchValue = req.body.value?.toLowerCase();

      // Récupérer toutes les données en parallèle pour améliorer la performance
      const [armors, runewords, setItems, weapons] = await Promise.all([
          UniqueItems.getAllUniqueArmors(),
          Runewords.getAllRunewords(),
          SetItems.getAllSet(),
          UniqueItems.getAllUniqueWeapons()
      ]);

      // Fusionner toutes les listes d'objets en une seule
      let objets = [...armors, ...runewords, ...setItems, ...weapons];

      // Appliquer le filtre si une recherche est spécifiée
      if (searchValue) {
          objets = objets.filter(obj => obj.name.toLowerCase().includes(searchValue));
      }

      // Retourner le résultat en JSON
      res.json({ objets: objets });

  } catch (error) {
      console.error("Erreur lors de la recherche :", error);
      res.status(500).json({ error: "Erreur lors de la récupération des objets" });
  }
});



module.exports = router