let data = {
    "Unique": {},
    "Set": {},
    "Runeword": {}
};

// Function to populate unique items
function createUniqueItems(data, startId, endId) {
    for (let id = startId; id <= endId; id++) {
        data.Unique[id] = {
            "owned": false,
            "date": null
        };
    }
}

function createRunewordItems(data, startId, endId) {
    for (let id = startId; id <= endId; id++) {
        data.Runeword[id] = {
            "owned": false,
            "date": null
        };
    }
}

function createSetItems(data, startId, endId) {
    for (let id = startId; id <= endId; id++) {
        data.Set[id] = {
            "owned": false,
            "date": null
        };
    }
}

// Create unique items with IDs from 1 to 378
createUniqueItems(data, 1, 379);
createRunewordItems(data, 1, 55);
createSetItems(data, 1, 127);

const fs = require('fs');

// Sauvegarde dans un fichier JSON
fs.writeFile('template_grail.js', JSON.stringify(data, null, 4), (err) => {
    if (err) {
        console.error('Erreur lors de la sauvegarde du fichier:', err);
    } else {
        console.log('Fichier sauvegardé avec succès sous le nom "unique_items.json".');
    }
});
