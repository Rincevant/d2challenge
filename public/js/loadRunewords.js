// Si template present chargement des donnees
if (template != null) { 
    var parseTemplate = JSON.parse(template)    
    loadRunewords(parseTemplate)    
}

function loadRunewords(parseTemplate) {
    Object.keys(parseTemplate["Runeword"]).forEach(function(runeName) {        
             
        if (parseTemplate["Runeword"][runeName].owned == true) {
            var date = parseTemplate["Runeword"][runeName].date
            var objet = document.getElementById(runeName.toLowerCase().replace(/\s/g, "_"))
            objet.getElementsByClassName('tooltip')[0].getElementsByClassName('obj_date')[0].innerHTML = date
            objet.classList.remove('objet')
            objet.classList.add('objetOwned')
        }            
               
    });
}