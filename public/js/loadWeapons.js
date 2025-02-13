// Si template present chargement des donnees
if (window.holy != "null") {
    loadWeapons(window.holy)    
}

function loadWeapons(parseTemplate) {
    let holygrail = JSON.parse(parseTemplate)

    let uniqueitems = JSON.parse(holygrail).Unique

    // Loop through each item in the Unique object
    for (let id in uniqueitems) {
        if (uniqueitems.hasOwnProperty(id)) {
            let item = uniqueitems[id]; // Access the item by ID
            if(item.owned) {
                var objet = document.getElementById("item_" + id)
                objet.getElementsByClassName('tooltip')[0].getElementsByClassName('obj_date')[0].innerHTML = item.date
                objet.classList.remove('objet')
                objet.classList.add('objetOwned')
            }
        }
    }
}