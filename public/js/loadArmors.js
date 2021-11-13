// Si template present chargement des donnees
if (template != null) { 
    var parseTemplate = JSON.parse(template)    
    loadArmors(parseTemplate)    
}

function loadArmors(parseTemplate) {
    Object.keys(parseTemplate["Unique"]["Armor"]).forEach(function(part) {        
        Object.keys(parseTemplate["Unique"]["Armor"][part]).forEach(function(value) {
            Object.keys(parseTemplate["Unique"]["Armor"][part][value]).forEach(function(name) {
                if (parseTemplate["Unique"]["Armor"][part][value][name].owned == true) {
                    var date = parseTemplate["Unique"]["Armor"][part][value][name].date
                    var objet = document.getElementById(name.toLowerCase().replace(/\s/g, "_"))
                    objet.getElementsByClassName('tooltip')[0].getElementsByClassName('obj_date')[0].innerHTML = date
                    objet.classList.remove('objet')
                    objet.classList.add('objetOwned')
                }
            });
        });        
    });
}