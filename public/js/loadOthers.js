// Si template present chargement des donnees
if (window.holy != "null") {
    loadOthers(window.holy)    
}

function loadOthers(parseTemplate) {
    let holygrail = JSON.parse(parseTemplate)    

    let uniqueitems = holygrail.Unique

    // Loop through each item in the Unique object
    for (let id in uniqueitems) {
        if (uniqueitems.hasOwnProperty(id)) {
            let item = uniqueitems[id]; // Access the item by ID
            if(item.owned) {                
                var objet = document.getElementById("item_" + id)
                if(objet != null) {
                    objet.getElementsByClassName('tooltip')[0].getElementsByClassName('obj_date')[0].innerHTML = item.date
                    objet.classList.remove('objet')
                    objet.classList.add('objetOwned')
                }                
            }
        }
    }
}