var scraper = require('table-scraper');
// file system module to perform file operations
const fs = require('fs');

var index = 1

var indexValueItem = 0
var valueItem = [ 'normal' , 'exceptional', 'elite' ]
var itemValue = [    'Normal Unique Armor',    'Exceptionnal Unique Armor',    'Elite Unique Armor' ]

var urlsArmor = [
    'http://classic.battle.net/diablo2exp/items/'+valueItem[indexValueItem]+'/uhelms.shtml',
    'http://classic.battle.net/diablo2exp/items/'+valueItem[indexValueItem]+'/uarmor.shtml',
    'http://classic.battle.net/diablo2exp/items/'+valueItem[indexValueItem]+'/ushields.shtml',
    'http://classic.battle.net/diablo2exp/items/'+valueItem[indexValueItem]+'/ugloves.shtml',
    'http://classic.battle.net/diablo2exp/items/'+valueItem[indexValueItem]+'/uboots.shtml',
    'http://classic.battle.net/diablo2exp/items/'+valueItem[indexValueItem]+'/ubelts.shtml'
]

var urlWeapon = [
    'http://classic.battle.net/diablo2exp/items/'+valueItem[indexValueItem]+'/uaxes.shtml',
    'http://classic.battle.net/diablo2exp/items/'+valueItem[indexValueItem]+'/ubows.shtml',
    'http://classic.battle.net/diablo2exp/items/'+valueItem[indexValueItem]+'/ucrossbows.shtml',
    'http://classic.battle.net/diablo2exp/items/'+valueItem[indexValueItem]+'/udaggers.shtml',
    'http://classic.battle.net/diablo2exp/items/'+valueItem[indexValueItem]+'/umaces.shtml',
    'http://classic.battle.net/diablo2exp/items/'+valueItem[indexValueItem]+'/upolearms.shtml',
    'http://classic.battle.net/diablo2exp/items/'+valueItem[indexValueItem]+'/uscepters.shtml',
    'http://classic.battle.net/diablo2exp/items/'+valueItem[indexValueItem]+'/uspears.shtml',
    'http://classic.battle.net/diablo2exp/items/'+valueItem[indexValueItem]+'/ustaves.shtml',
    'http://classic.battle.net/diablo2exp/items/'+valueItem[indexValueItem]+'/uswords.shtml',
    'http://classic.battle.net/diablo2exp/items/'+valueItem[indexValueItem]+'/uthrowing.shtml',
    'http://classic.battle.net/diablo2exp/items/'+valueItem[indexValueItem]+'/uwands.shtml'
]

var urlUniqueClass = [
    'http://classic.battle.net/diablo2exp/items/normal/uamazon.shtml',
    'http://classic.battle.net/diablo2exp/items/normal/uassassin.shtml',
    'http://classic.battle.net/diablo2exp/items/normal/unecromancer.shtml',
    'http://classic.battle.net/diablo2exp/items/normal/ubarbarian.shtml',
    'http://classic.battle.net/diablo2exp/items/normal/usorceress.shtml',
    'http://classic.battle.net/diablo2exp/items/normal/udruid.shtml',
    'http://classic.battle.net/diablo2exp/items/normal/upaladin.shtml'
]

var urlOther = [
    'http://classic.battle.net/diablo2exp/items/normal/urings.shtml',
    'http://classic.battle.net/diablo2exp/items/normal/uamulets.shtml',
    'http://classic.battle.net/diablo2exp/items/normal/ucharms.shtml',
    'http://classic.battle.net/diablo2exp/items/normal/ujewels.shtml',
    'http://classic.battle.net/diablo2exp/items/normal/ucirclets.shtml'
]

var nameFile = [    'uhelms_'+valueItem[indexValueItem]+'.json',    'uarmor_'+valueItem[indexValueItem]+'.json',    'ushields_'+valueItem[indexValueItem]+'.json',    'ugloves_'+valueItem[indexValueItem]+'.json',    'uboots_'+valueItem[indexValueItem]+'.json',    'ubelts_'+valueItem[indexValueItem]+'.json'  ]

var kind = [    'Armor',    'Weapon',    'Ring',    'Amulet',    'Charm',    'Jewel',    'Circlet' ]
var part = [    'Helms',    'Armor',    'Shields',    'Gloves',    'Boots',    'Belts' ]

scrapper()
function scrapper() {
    
    
    scraper.get(urlsArmor[index]).then(function(tableData) {    

        console.log(tableData)
        var objects = tableData[11]
    
        var listObjects = []
    
        objects.forEach(element => {
            // Create JSON
            
            var objet = {} 
            
            objet.kind = kind[0]
    
            objet.part = part[index]
        
            objet.value = itemValue[indexValueItem]
            
            objet.name = element['0'].split('\n')[0]
        
            objet.type = element['0'].split('\n')[1]
        
            objet.properties = element['1']
    
            objet.item = 'Unique'    
        
            listObjects.push(objet)
        });          
    
        writeFrile(listObjects)
        
    });   
   
}

function writeFrile(listObjects) {
    // stringify JSON Object
    var jsonContent = JSON.stringify(listObjects);
    fs.writeFile(nameFile[index], jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        } 
        console.log("JSON file has been saved. ", index);
        index++        
    });
}
