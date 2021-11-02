const Sequelize = require('sequelize');
const UniqueItem = require('./uniques_items.js')
//requiring path and fs modules
const path = require('path');
const fs = require('fs');

/*
var dbname = "d2challenge"
var username = "postgres"
var password = "08082014"
*/

var dbname = "d768vnt54nig6m"
var username = "wybwxpqnembvdd"
var password = "2ea95e4213fc19a9cd18ad97ae7be6f1f15435fcefb0c734e806fc3c687642a3"


var sequelize = new Sequelize(dbname, username, password, {
    //host: 'localhost',
    host : 'ec2-18-202-1-222.eu-west-1.compute.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

// Connect to databse
sequelize.authenticate().then(() => {
    console.log('Connection established successfully!!!!');
    createDatabase()
}).catch(err => {
    console.error('Unable to connect to the database:', err);
})

function createDatabase() {
    const directoryPathArmor = path.join(__dirname, 'armors');    
    const directoryPathWeapon = path.join(__dirname, 'weapons');
    const directoryPathOthers = path.join(__dirname, 'others');
    const directoryPathClasses = path.join(__dirname, 'classes');

    readAndWrite(directoryPathArmor, 'armors')
    readAndWrite(directoryPathWeapon, 'weapons')
    readAndWrite(directoryPathOthers, 'others')
    readAndWrite(directoryPathClasses, 'classes')
    
}

function readAndWrite(path, nameDirectory) {
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
                    var res = await addUniqueToDB(element)
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