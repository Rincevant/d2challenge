const express = require('express')
const router = express.Router()
const services = require('../services/services') 
const UniqueItems = require('../database/unique_items._repository');
const Runewords = require('../database/runewords_repository')
const SetItems = require('../database/set_items_repository');
const Holygrail = require('../database/holygrail_repository');
const User = require('../database/users_repository');

// Holy Grail Total recap
router.get('/', async (req, res) => {
  console.log('Request for holygrail search');
    res.render('holygrail', {objets: null});
});

// Holy Grail Uniques Armors
router.get('/u_armors', async (req, res) => {
  console.log('Request for holygrail uniques armors');
  var objets = await UniqueItems.getAllUniqueArmors()
  var holygrail = null;

  // Récuperer les data du grail du joueur
  if(req.session.user != null && services.userIsConnected(req.session.user.token)) {
    // Recuperer le user
    let username = req.session.user.username;
    let user = await User.getUserByName(username)
    let holygrailDTO = await Holygrail.getTemplateByIdUser(user.dataValues.id)
    holygrail = holygrailDTO.holygrail
  }

  res.render('u_armors_holy', {objets:objets, holygrail: JSON.stringify(holygrail)});
});

// Holy Grail Uniques Weapons
router.get('/u_weapons', async (req, res) => {
  console.log('Request for holygrail uniques');
  var objets = await UniqueItems.getAllUniqueWeapons()
  var holygrail = null;
  
  // Récuperer les data du grail du joueur
  if(req.session.user != null && services.userIsConnected(req.session.user.token)) {
    // Recuperer le user
    let username = req.session.user.username;
    let user = await User.getUserByName(username)
    let holygrailDTO = await Holygrail.getTemplateByIdUser(user.dataValues.id)
    holygrail = holygrailDTO.holygrail
  }

  res.render('u_weapons_holy', {objets:objets, holygrail: JSON.stringify(holygrail)});
});

// Holy Grail Uniques Others
router.get('/u_others', async (req, res) => {
  console.log('Request for holygrail uniques');
  var objets = await UniqueItems.getAllUniqueOthers()
  var holygrail = null;

  // Récuperer les data du grail du joueur
  if(req.session.user != null && services.userIsConnected(req.session.user.token)) {
    // Recuperer le user
    let username = req.session.user.username;
    let user = await User.getUserByName(username)
    let holygrailDTO = await Holygrail.getTemplateByIdUser(user.dataValues.id)
    holygrail = holygrailDTO.holygrail
  }

  res.render('u_others_holy', {objets:objets, holygrail: JSON.stringify(holygrail)});
});

// Holy Grail Runewords
router.get('/runewords', async (req, res) => {
  console.log('Request for holygrail page runewords');
  var objets = await Runewords.getAllRunewords()
  var holygrail = null;

  // Récuperer les data du grail du joueur
  if(req.session.user != null && services.userIsConnected(req.session.user.token)) {
    // Recuperer le user
    let username = req.session.user.username;
    let user = await User.getUserByName(username)
    let holygrailDTO = await Holygrail.getTemplateByIdUser(user.dataValues.id)
    holygrail = holygrailDTO.holygrail
  }

  res.render('holyrunewords', {objets:objets, holygrail: JSON.stringify(holygrail)});
});

// Holy Grail Set
router.get('/set', async (req, res) => {
  console.log('Request for holygrail page set');
  var objets = await SetItems.getAllSet()
  var setName = require("../database/Models/setsList")

  var holygrail = null;

  // Récuperer les data du grail du joueur
  if(req.session.user != null && services.userIsConnected(req.session.user.token)) {
    // Recuperer le user
    let username = req.session.user.username;
    let user = await User.getUserByName(username)
    let holygrailDTO = await Holygrail.getTemplateByIdUser(user.dataValues.id)
    holygrail = holygrailDTO.holygrail
  }

  res.render('holyset', {objets:objets, setName:setName, holygrail: JSON.stringify(holygrail)});
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
      let result = []
      if (searchValue) {
          for (let index = 0; index < objets.length; index++) {
             if(objets[index].item === "Unique" || objets[index].item === "Set") {

                if(objets[index].name.toLowerCase().includes(searchValue.toLowerCase())) result.push(objets[index])

             } else if (objets[index].item === "Rune Words") {

                //if(objets[index].originalRuneWords.includes(searchValue)) result.push(objets[index])
             }
            
          }
      }

      // Retourner le résultat en JSON
      res.json({ objets: result });

  } catch (error) {
      console.error("Erreur lors de la recherche :", error);
      res.status(500).json({ error: "Erreur lors de la récupération des objets" });
  }
});

// Route PUT pour mettre à jour un objet par son ID
router.put('/update/:id', services.authentificateToken, async (req, res) => {
  const idItem = parseInt(req.params.id);

  // Recuperer le user
  let username = req.session.user.username;
  let user = await User.getUserByName(username)

  if(user != undefined) {
    // Recuperer holygrail du user
    let holygrailDTO = await Holygrail.getTemplateByIdUser(user.dataValues.id)
    let holygrail = JSON.parse(holygrailDTO.holygrail)

    if(req.body.item == "Rune Words") req.body.item = "Runeword"

    // Modifier la valeur
    holygrail[req.body.item][idItem].owned = !holygrail[req.body.item][idItem].owned
    
    if(holygrail[req.body.item][idItem].owned) {
      holygrail[req.body.item][idItem].date = services.getDate()
    } else {
      holygrail[req.body.item][idItem].date = null
    } 

    await Holygrail.editHolyGrail(holygrail, user.dataValues.id)
  }

  res.json({ message: 'Item updated successfully' });
});

module.exports = router