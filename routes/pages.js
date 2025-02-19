const express = require('express');
const router = express.Router();
const services = require('../services/services') 
const Holygrail = require('../database/holygrail_repository');
const UniqueItems = require('../database/unique_items._repository');
const SetItems = require('../database/set_items_repository');
const RunewordsItems = require('../database/runewords_repository');
const User = require('../database/users_repository');

router.get('/', async (req, res) => {
  res.render('index');
});

router.get('/profile',  async (req, res) => {

  var holygrail = null;
  
  // Récuperer les data du grail du joueur
  if(req.session.user != null && services.userIsConnected(req.session.user.token)) {
    // Recuperer le user
    let username = req.session.user.username;
    let user = await User.getUserByName(username)
    let holygrailDTO = await Holygrail.getTemplateByIdUser(user.dataValues.id)
    holygrail = JSON.parse(holygrailDTO.holygrail)
  } else {
    res.render('login', {message : null, token : null, holygrail : null});
  }

  let total = {
    "UniqueArmors" : {
      "looted" : 0,
      "remaining": 0,
      "totalitems": 0,
      "completed": 0
    },
    "UniqueWeapons" : {
      "looted" : 0,
      "remaining": 0,
      "totalitems": 0,
      "completed": 0
    },
    "UniqueOther" : {
      "looted" : 0,
      "remaining": 0,
      "totalitems": 0,
      "completed": 0
    },
    "Sets" : {
      "looted" : 0,
      "remaining": 0,
      "totalitems": 0,
      "completed": 0
    },
    "Runewords" : {
      "looted" : 0,
      "remaining": 0,
      "totalitems": 0,
      "completed": 0
    },
    "totalresult" : {
      "looted" : 0,
      "remaining": 0,
      "totalitems": 0,
      "completed": 0
    }
  }

  // Unique
  if (holygrail != null && holygrail.Unique) {
    let uniquesItems = await UniqueItems.getAllUnique();

    total.UniqueArmors.totalitems = uniquesItems.filter(item => item.kind == 'Armor').length;
    total.UniqueWeapons.totalitems = uniquesItems.filter(item => item.kind == 'Weapon').length;
    total.UniqueOther.totalitems = uniquesItems.filter(item => item.kind == 'Other').length;

    for (const itemId in holygrail.Unique) {

        if(holygrail.Unique[itemId].owned) {          
            let unique = uniquesItems.filter(item => item.id == itemId)
            if(unique[0].kind == 'Armor') {
              total.UniqueArmors.looted =  total.UniqueArmors.looted + 1
            } else if (unique[0].kind == 'Weapon') {
              total.UniqueWeapons.looted =  total.UniqueWeapons.looted + 1
            } else if (unique[0].kind == 'Other') {
              total.UniqueOther.looted =  total.UniqueOther.looted + 1
            }
        }
        
    }

    total.UniqueArmors.remaining = total.UniqueArmors.totalitems - total.UniqueArmors.looted;
    total.UniqueWeapons.remaining = total.UniqueWeapons.totalitems - total.UniqueWeapons.looted;
    total.UniqueOther.remaining = total.UniqueOther.totalitems - total.UniqueOther.looted;

    total.UniqueArmors.completed = (total.UniqueArmors.looted === total.UniqueArmors.totalitems) ? 100 : Math.floor((total.UniqueArmors.looted / total.UniqueArmors.totalitems) * 100);
    total.UniqueWeapons.completed = (total.UniqueWeapons.looted === total.UniqueWeapons.totalitems) ? 100 : Math.floor((total.UniqueWeapons.looted / total.UniqueWeapons.totalitems) * 100);
    total.UniqueOther.completed = (total.UniqueOther.looted === total.UniqueOther.totalitems) ? 100 : Math.floor((total.UniqueOther.looted / total.UniqueOther.totalitems) * 100);
  }

  // Set 
  if (holygrail != null && holygrail.Set) {
    let setItems = await SetItems.getAllSet();

    total.Sets.totalitems = setItems.length;

    for (const itemId in holygrail.Set) {
      if(holygrail.Set[itemId].owned) { 
        total.Sets.looted =  total.Sets.looted + 1
      }
    }

    total.Sets.remaining = total.Sets.totalitems - total.Sets.looted;
    total.Sets.completed = (total.Sets.looted === total.Sets.totalitems) ? 100 : Math.floor((total.Sets.looted / total.Sets.totalitems) * 100);
  }

  // Runewords 
  if (holygrail != null && holygrail.Runeword) {
    let runeItems = await RunewordsItems.getAllRunewords();

    total.Runewords.totalitems = runeItems.length;

    for (const itemId in holygrail.Runeword) {
      if(holygrail.Runeword[itemId].owned) { 
        total.Runewords.looted =  total.Runewords.looted + 1
      }
    }

    total.Runewords.remaining = total.Runewords.totalitems - total.Runewords.looted;
    total.Runewords.completed = (total.Runewords.looted === total.Runewords.totalitems) ? 100 : Math.floor((total.Runewords.looted / total.Runewords.totalitems) * 100);
  }

  // Total
  total.totalresult.looted = total.UniqueArmors.looted + total.UniqueWeapons.looted + total.UniqueOther.looted + total.Sets.looted + total.Runewords.looted
  total.totalresult.remaining = total.UniqueArmors.remaining + total.UniqueWeapons.remaining + total.UniqueOther.remaining + total.Sets.remaining + total.Runewords.remaining
  total.totalresult.totalitems = total.UniqueArmors.totalitems + total.UniqueWeapons.totalitems + total.UniqueOther.totalitems + total.Sets.totalitems + total.Runewords.totalitems
  total.totalresult.completed = (total.totalresult.looted === total.totalresult.totalitems) ? 100 : Math.floor((total.totalresult.looted / total.totalresult.totalitems) * 100);
  

  res.render('profile', {total: total});
});

module.exports = router;