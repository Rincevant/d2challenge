// Si template present chargement des donnees
if (template != null) { 
    var parseTemplate = JSON.parse(template)    
    loadOthers(parseTemplate)    
}

function loadOthers(parseTemplate) {
    Object.keys(parseTemplate["Unique"]["Other"]).forEach(function(part) {        
        Object.keys(parseTemplate["Unique"]["Other"][part]).forEach(function(value) {
            Object.keys(parseTemplate["Unique"]["Other"][part][value]).forEach(function(name) {
                if (parseTemplate["Unique"]["Other"][part][value][name].owned == true) {
                    var date = parseTemplate["Unique"]["Other"][part][value][name].date
                    var objet = document.getElementById(name.toLowerCase().replace(/\s/g, "_"))
                    objet.getElementsByClassName('tooltip')[0].getElementsByClassName('obj_date')[0].innerHTML = date
                    objet.classList.remove('objet')
                    objet.classList.add('objetOwned')
                }
            });
        });        
    });
}