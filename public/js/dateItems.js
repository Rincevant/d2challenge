function obtain(id, kind, part, value, name, item) {
    var d = new Date();
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());
    var objet = document.getElementById(id)
    if (objet.className == 'objet') {
        objet.getElementsByClassName('tooltip')[0].getElementsByClassName('obj_date')[0].innerHTML = month+"/"+day+"/"+year
        objet.classList.remove('objet')
        objet.classList.add('objetOwned')
    } else {
        objet.getElementsByClassName('tooltip')[0].getElementsByClassName('obj_date')[0].innerHTML = ""
        objet.classList.add('objet')
        objet.classList.remove('objetOwned')
    }
    findItemAndSet(kind, part, value, name, item, (month+"/"+day+"/"+year))
}

function findItemAndSet(kind, part, value, name, item, date) {
    var templateJSON = JSON.parse(localStorage.getItem("data"))
    //console.log(kind, part, value, name, item)

    if (item == "Unique") {
        if (kind == "Armor") {
            Object.keys(templateJSON.uniques.armor).forEach(function(keyPart){
                if (keyPart == part.toLowerCase()) {
                    //console.log(key + ' - ' + JSON.stringify(templateJSON.uniques.armor[key]));
                    Object.keys(templateJSON.uniques.armor[keyPart]).forEach(function(keyValue, v){
                        if (value.includes(keyValue)) {
                            Object.keys(templateJSON.uniques.armor[keyPart][keyValue]).forEach(function(keyName, v){
                                if (name == keyName ) {
                                    //console.log(keyName, JSON.stringify(templateJSON.uniques.armor[keyPart][keyValue][keyName]));
                                }
                            });
                        }
                    });
                }

            });
        }
    }
    var item = "uniques"
    var kind = "armor"
    var part = "chests"
    var value = "Normal"
    
    console.log(templateJSON[item][kind][part][value][name])
    //templateJSON.uniques.armor.chests.normal[name].owned = true


    templateJSON[item][kind][part][value][name].owned = true

    localStorage.setItem("data", JSON.stringify(templateJSON))

    
    /*
    Object.keys(templateJSON).forEach(function(key) {
        if (key == name) {            
            console.log('Key : ' + key + ', Value owned: ' + templateData[key].owned)
            templateData[key].owned = true
            console.log('Key : ' + key + ', Value owned: ' + templateData[key].owned)
            localStorage.setItem("data", JSON.stringify(templateData))
        } 

        if (!!templateData[key] && typeof(templateData[key == "object"])) {            
            traverse(templateData[key], name)
        }
    })
*/
    
}