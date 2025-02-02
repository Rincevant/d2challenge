const Sequelize = require('sequelize');
const UniqueItem = require('./uniques_items.js')
const Runeword = require('./runewords.js')
const Set = require('./set_items')
//requiring path and fs modules
const path = require('path');
const fs = require('fs');
const db = require('./connexion')

// Connect to databse
db.authenticate().then(async () => {
    console.log('Connection established successfully!!!!');
    eraseDataTable()
    createDatabaseUnique()
    createDatabaseRuneword()
    createDatabaseSet()
}).catch(err => {
    console.error('Unable to connect to the database:', err);
})

async function eraseDataTable() {
    await UniqueItem.sync({ force: true });
    await Runeword.sync({ force: true });
    await Set.sync({ force: true });
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
        image : objet.image
    }
    //console.log(newObjet)
    try {
        let result = await UniqueItem.create(newObjet)
        return result 
    } catch (error) {
        console.log(error)
    }
    
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
        let result = await Runeword.create(newObj)        
        return result
    } catch (error) {
        console.log(error)
    }
    
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
        let result = await Set.create(newObj)  
        return result      
    } catch (error) {
        console.log(error)
    }
    
}