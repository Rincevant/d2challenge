// Si template present chargement des donnees
if (template != null) { 
    var parseTemplate = JSON.parse(template)    
    loadSet(parseTemplate)    
}

function loadSet(parseTemplate) {
    Object.keys(parseTemplate["Set"]).forEach(function(setName) {        
        Object.keys(parseTemplate["Set"][setName]).forEach(function(itemName) {         
            if (parseTemplate["Set"][setName][itemName].owned == true) {
                var date = parseTemplate["Set"][setName][itemName].date
                var objet = document.getElementById(itemName.toLowerCase().replace(/\s/g, "_"))
                objet.getElementsByClassName('tooltip')[0].getElementsByClassName('obj_date')[0].innerHTML = date
                objet.classList.remove('objet')
                objet.classList.add('objetOwned')
            }            
        });        
    });
}