const Sequelize = require('sequelize');
const UniqueItem = require('./uniques_items.js')
const Runeword = require('./runewords.js')
const Set = require('./set_items')
//requiring path and fs modules
const path = require('path');
const fs = require('fs');
var total = 0

// CHANGE HERE AND IN REPO ACCESS DB

var dbname = "d2challenge"
var username = "postgres"
var password = "08082014"

/*
var dbname = "d79a8drjd5q1g6"
var username = "yqvqwpuzkjkrek"
var password = "ad26e538911aff6febc1c7068c64382666c956dd7872a3a954ebb03e245899b6"
*/

var sequelize = new Sequelize(dbname, username, password, {
    host: 'localhost',
    //host : 'ec2-63-34-223-144.eu-west-1.compute.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
    /*dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }*/
});

// Connect to databse
sequelize.authenticate().then(() => {
    console.log('Connection established successfully!!!!');
    createDatabaseUnique()
    createDatabaseRuneword()
    createDatabaseSet()
}).catch(err => {
    console.error('Unable to connect to the database:', err);
})

function createDatabaseSet() {
    const directorySetNormal = path.join(__dirname, 'set/normal');
    readAndWrite(directorySetNormal, 'set/normal', 'set')
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