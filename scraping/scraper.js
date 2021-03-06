var scraper = require('table-scraper');
// file system module to perform file operations
const fs = require('fs');

var index = 4

var indexValueItem = false
var valueItem = [ 'normal' , 'exceptional', 'elite' ]
var itemValue = [    'normal',    'exceptional',    'elite' ]

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
    'http://classic.battle.net/diablo2exp/items/'+valueItem[indexValueItem]+'/ujavelins.shtml',
    'http://classic.battle.net/diablo2exp/items/'+valueItem[indexValueItem]+'/umaces.shtml',
    'http://classic.battle.net/diablo2exp/items/'+valueItem[indexValueItem]+'/upolearms.shtml',
    'http://classic.battle.net/diablo2exp/items/'+valueItem[indexValueItem]+'/uscepters.shtml',
    'http://classic.battle.net/diablo2exp/items/'+valueItem[indexValueItem]+'/uspears.shtml',
    'http://classic.battle.net/diablo2exp/items/'+valueItem[indexValueItem]+'/ustaves.shtml',
    'http://classic.battle.net/diablo2exp/items/'+valueItem[indexValueItem]+'/uswords.shtml',
    'http://classic.battle.net/diablo2exp/items/'+valueItem[indexValueItem]+'/uthrowing.shtml',
    'http://classic.battle.net/diablo2exp/items/'+valueItem[indexValueItem]+'/uwands.shtml' //11
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

var nameFile = [    
    'uaxes_'+valueItem[indexValueItem]+'.json',    
    'ubows_'+valueItem[indexValueItem]+'.json',    
    'ucrossbows_'+valueItem[indexValueItem]+'.json',    
    'udaggers_'+valueItem[indexValueItem]+'.json',
    'ujavelins_'+valueItem[indexValueItem]+'.json',    
    'umaces_'+valueItem[indexValueItem]+'.json',    
    'upolearms_'+valueItem[indexValueItem]+'.json',
    'uscepters_'+valueItem[indexValueItem]+'.json',
    'uspears_'+valueItem[indexValueItem]+'.json',
    'ustaves_'+valueItem[indexValueItem]+'.json',
    'uswords_'+valueItem[indexValueItem]+'.json',
    'uthrowing_'+valueItem[indexValueItem]+'.json',
    'uwands_'+valueItem[indexValueItem]+'.json'
]

var classNameFile = [ 'uamazon.json', 'uassassin.json', 'unecromancer.json', 'ubarbarian.json', 'usorceress.json', 'udruid.json', 'upaladin.json']

var otherNameFile = [ 'urings.json', 'uamulets.json', 'ucharms.json', 'ujewels.json', 'ucirclets.json']

var kind = [    /*'Armor',    'Weapon',*/    'Ring',    'Amulet',    'Charm',    'Jewel',    'Circlet' ]
var part = [    'Axes',    'Bows',    'Crossbows',    'Daggers', 'Javelins',    'Maces',    'Polearms', 'Scepters', 'Spears', 'Staves', 'Swords', 'Throwing', 'Wands' ]
var classes = [ 'Amazon', 'Assassin', 'Necromancer', 'Barbarian', 'Sorceress', 'Druid', 'Paladin' ]

scrapper()
function scrapper() {
    
    
    scraper.get('https://diablo2build.fr/objets/les-casques-uniques/').then(function(tableData) {    

       
        var objects = tableData[11]
    
        var listObjects = []
    
        tableData.forEach(element => {
            // Create JSON
            
            var objet = {} 
            
           /* objet.kind = "Weapon"
    
            objet.part = "Staves"
        
            objet.value = "normal"
            
            objet.name = element['0'].split('\n')[0]
        
            objet.type = element['0'].split('\n')[1]
        
            objet.properties = element['1']
    
            objet.item = 'Unique'    */

            //objet.item = 'Rune Words'
            //objet.originalRuneWords = element['1.11 Rune Words']
            //objet.allowedItems = element['Allowed Items']
            //objet.runeOrder = element['Rune Order']
            //objet.completedStats = element['Completed Stats']

                   

            element.forEach(json => {
                if (!json['0'].includes("Niveau") && json['0'] != "") {
                    objet.nameFR = json['0']
                } else if (json['0'].includes("Niveau")) {
                    objet.propertiesFR = json['0']
                }
            });
            listObjects.push(objet)
        });          
    
        console.log(listObjects)
        writeFrile(listObjects)
        
    });   
   
}

function writeFrile(listObjects) {
    // stringify JSON Object
    var jsonContent = JSON.stringify(listObjects);
    fs.writeFile('test.json', jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        } 
        console.log("JSON file has been saved. ", index);
        index++        
    });
}
