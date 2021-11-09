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
    

    if (item == "Unique"){
        obtainUniqueItem(kind, part, value, name, date)
    } else if (item == "Set") {
        obtainSetItem()
    }

  
}

function obtainUniqueItem(kind, part, value, name, date) {
    var templateJSON = JSON.parse(localStorage.getItem("data")) 
    console.log(kind, part, value, name, date)
    
    var obtainValue = templateJSON[item][kind][part][value][name].owned

    if (obtainValue) {
        templateJSON[item][kind][part][value][name].owned = false
        templateJSON[item][kind][part][value][name].date = null
    } else {
        templateJSON[item][kind][part][value][name].owned = true
        templateJSON[item][kind][part][value][name].date = date
    }

    localStorage.setItem("data", JSON.stringify(templateJSON))  
}


function obtainSetItem() {
    console.log("Obtain Sets")
}