var scraper = require('table-scraper');
// file system module to perform file operations
const fs = require('fs');

var urls = [
    'http://classic.battle.net/diablo2exp/items/normal/uhelms.shtml',
    'http://classic.battle.net/diablo2exp/items/normal/uarmor.shtml',
    'http://classic.battle.net/diablo2exp/items/normal/ushields.shtml',
    'http://classic.battle.net/diablo2exp/items/normal/ugloves.shtml',
    'http://classic.battle.net/diablo2exp/items/normal/uboots.shtml',
    'http://classic.battle.net/diablo2exp/items/normal/ubelts.shtml'
]

var itemValue = [    'Normal Unique Armor',    'Exceptionnal Unique Armor',    'Elite Unique Armor' ]

var nameFile = [    'uhelms.json',    'uarmor.json',    'ushields.json',    'ugloves.json',    'uboots.json',    'ubelts.json'  ]

var kind = [    'Armor',    'Weapon',    'Ring',    'Amulet',    'Charm',    'Jewel',    'Circlet' ]

var part = [    'Helms',    'Armor',    'Shields',    'Gloves',    'Boots',    'Belts' ]

var index = 5
scrapper()
function scrapper() {
    
    
    scraper.get(urls[index]).then(function(tableData) {    

        var objects = tableData[11]
    
        var listObjects = []
    
        objects.forEach(element => {
            // Create JSON
            
            var objet = {} 
            
            objet.kind = kind[0]
    
            objet.part = part[index]
        
            objet.value = itemValue[0]
            
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



