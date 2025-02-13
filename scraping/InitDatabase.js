const db = require('./connexion')
const UniqueItem = require('./uniques_items.js')
const Runeword = require('./runewords.js')
const Set = require('./set_items')
const path = require('path');
const fs = require('fs');

async function main() {
    try {
        await db.authenticate();
        console.log('Connection established successfully!!!!');

        const args = process.argv.slice(2);

        await eraseDataTable(); // Ensure this completes before proceeding
        
        await createDatabaseUnique();
        await createDatabaseRuneword();
        await createDatabaseSet();
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
}

// Call the main function
main();

async function eraseDataTable() {
    console.log('----------------- ERASE DATABASE ------------------');
    // Drop tables explicitly before syncing
    await db.query('DROP TABLE IF EXISTS "UniqueItems" CASCADE');
    await db.query('DROP TABLE IF EXISTS "Runewords" CASCADE');
    await db.query('DROP TABLE IF EXISTS "Sets" CASCADE');

    await UniqueItem.sync({ force: true });
    await Runeword.sync({ force: true });
    await Set.sync({ force: true });
    console.log('----------------- ERASE DATABASE END ------------------');
}

async function createDatabaseUnique() {
    console.log('----------------- INSERT UNIQUE ITEMS START ------------------');
    const directoryPathArmor = path.join(__dirname, 'armors');    
    const directoryPathWeapon = path.join(__dirname, 'weapons');
    const directoryPathOthers = path.join(__dirname, 'others');
    const directoryPathClasses = path.join(__dirname, 'classes');

    await readAndWrite(directoryPathArmor, 'armors', 'unique');
    await readAndWrite(directoryPathWeapon, 'weapons', 'unique');
    await readAndWrite(directoryPathOthers, 'others','unique');
    await readAndWrite(directoryPathClasses, 'classes','unique');    
    console.log('----------------- INSERT UNIQUE ITEMS END ------------------');
}

async function createDatabaseSet() {
    const directorySetNormal = path.join(__dirname, 'set/normal');
    const directorySetLod = path.join(__dirname, 'set/lod');
    await readAndWrite(directorySetNormal, 'set/normal', 'set');
    await readAndWrite(directorySetLod, 'set/lod', 'set');
}


async function createDatabaseRuneword() {
    const directoryRunewords = path.join(__dirname, 'runewords');
    await readAndWrite(directoryRunewords, 'runewords', 'runeword');    
}

async function readAndWrite(path, nameDirectory, kind) {
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
                        var res = await addUniqueToDB(element);
                    } else if (kind == 'runeword') {
                        var res = await addRunewordToDB(element);
                    } else if (kind == 'set') {
                        var res = await addSetObjToDB(element);
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
