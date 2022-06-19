const Sequelize = require('sequelize');
const UniqueItem = require('./uniques_items.js')
const Runeword = require('./runewords.js')
const Set = require('./set_items')
//requiring path and fs modules
const path = require('path');
const fs = require('fs');
const db = require('./connexion')

// Connect to databse
db.authenticate().then(() => {
    console.log('Connection established successfully!!!!');
    eraseDataTable()
    createDatabaseUnique()
    createDatabaseRuneword()
    createDatabaseSet()
}).catch(err => {
    console.error('Unable to connect to the database:', err);
})

function eraseDataTable() {
    UniqueItem.destroy({ where : {}, truncate : true });
    Runeword.destroy({ where : {}, truncate : true });
    Set.destroy({ where : {}, truncate : true });
}

function createDatabaseSet() {
    const directorySetNormal = path.join(__dirname, 'set/normal');
    const directorySetLod = path.join(__dirname, 'set/lod');
    readAndWrite(directorySetNormal, 'set/normal', 'set')
    readAndWrite(directorySetLod, 'set/lod', 'set')
}


function createDatabaseRuneword() {
    const directoryRunewords = path.join(__dirname, 'runewords');
    readAndWrite(directoryRunewords, 'runewords', 'runeword')
    
}

function createDatabaseUnique() {
    const directoryPathArmor = path.join(__dirname, 'armors');    
    const directoryPathWeapon = path.join(__dirname, 'weapons');
    const directoryPathOthers = path.join(__dirname, 'others');
    const directoryPathClasses = path.join(__dirname, 'classes');

    readAndWrite(directoryPathArmor, 'armors', 'unique')
    readAndWrite(directoryPathWeapon, 'weapons', 'unique')
    readAndWrite(directoryPathOthers, 'others','unique')
    readAndWrite(directoryPathClasses, 'classes','unique')
    
}

function readAndWrite(path, nameDirectory, kind) {
    fs.readdir(path, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        
        files.forEach(function (file) {            
            fs.readFile(__dirname + '/'+nameDirectory+'/'+ file, 'utf8' , (err, data) => {
                if (err) {
                console.error(err)
                return
                }
                var elements = JSON.parse(data)
                elements.forEach(async element => {
                    if (kind == 'unique') {
                        var res = await addUniqueToDB(element)
                    } else if (kind == 'runeword') {
                        var res = await addRunewordToDB(element)
                    } else if (kind == 'set') {
                        var res = await addSetObjToDB(element)
                    }
                });
            })

        });
    });
}



async function addUniqueToDB(objet) {
    var newObjet = {
        kind : objet.kind,
        part : objet.part,
        value : objet.value,
        name : objet.name,
        type : objet.type,
        properties : objet.properties,
        item : objet.item,
        image : objet.image,
        nameFR : objet.nameFR,
        propertiesFR : objet.propertiesFR
    }
    //console.log(newObjet)
    try {
        result = await UniqueItem.create(newObjet)        
    } catch (error) {
        
    }
    return result
}

async function addRunewordToDB(objet) {
    var newObj = {
        item : objet.item,
        originalRuneWords : objet.originalRuneWords,
        allowedItems : objet.allowedItems,
        runeOrder : objet.runeOrder,
        completedStats : objet.completedStats,
        image : objet.image       
    }
    try {
        result = await Runeword.create(newObj)        
    } catch (error) {
        
    }
    return result
}

async function addSetObjToDB(objet) {
    var newObj = {
        setName : objet.setName,
        name : objet.name,
        part : objet.part,
        type : objet.type,
        kind : objet.kind,
        item : objet.item,
        image : objet.image, 
        properties : objet.properties        
    }
    try {
        result = await Set.create(newObj)        
    } catch (error) {
        
    }
    return result
}