var template = localStorage.getItem("holygrail")
var dirty = localStorage.getItem("isDirty")

// Si changement alors afficher le bouton save
if (dirty != null) {
   if (dirty == "true") {
       var saveBtn = document.getElementById("btnSave")
       saveBtn.style.display = "block"
    }
}

function obtain(id, kind, part, value, name, item) {
    // If template and token are present
    var token = localStorage.getItem("token")
    var holyGrail = localStorage.getItem("holygrail")
    if (token != null && holyGrail != null) {        
        setDateAndObtainItem(id, kind, part, value, name, item)
    }
}

function setDateAndObtainItem(id, kind, part, value, name, item) {
    var d = new Date();
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());
    var objet = document.getElementById(name.toLowerCase().replace(/\s/g, "_"))
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
    displaySaveButton()

    // Set dirty
    var dirty = localStorage.getItem("isDirty")
    if (dirty != null ) {        
        localStorage.setItem("isDirty", true)
    }
}

function findItemAndSet(kind, part, value, name, item, date) {
    
    if (item == "Unique"){
        obtainUniqueItem(kind, part, value, name, date, item)
    } else if (item == "Set") {
        obtainSetItem(item, value, name, date)
    } else {
        obtainRunewords(name, date)
    }  
}

function obtainUniqueItem(kind, part, value, name, date, item) {
    var templateJSON = JSON.parse(localStorage.getItem("holygrail"))
    
    var obtainValue = templateJSON[item][kind][part][value][name].owned   

    if (obtainValue == true) {
        templateJSON[item][kind][part][value][name].owned = false
        templateJSON[item][kind][part][value][name].date = null
    } else {
        templateJSON[item][kind][part][value][name].owned = true
        templateJSON[item][kind][part][value][name].date = date
    }

    localStorage.setItem("holygrail", JSON.stringify(templateJSON))  
}


function obtainSetItem(item, value, name, date) {
    var templateJSON = JSON.parse(localStorage.getItem("holygrail"))
    
    var obtainValue = templateJSON[item][value][name].owned

    if (obtainValue == true) {
        templateJSON[item][value][name].owned = false
        templateJSON[item][value][name].date = null
    } else {
        templateJSON[item][value][name].owned = true
        templateJSON[item][value][name].date = date
    }

    localStorage.setItem("holygrail", JSON.stringify(templateJSON)) 
}

function obtainRunewords(name, date) {
    var templateJSON = JSON.parse(localStorage.getItem("holygrail"))
    
    var obtainValue = templateJSON["Runeword"][name].owned

    if (obtainValue == true) {
        templateJSON["Runeword"][name].owned = false
        templateJSON["Runeword"][name].date = null
    } else {
        templateJSON["Runeword"][name].owned = true
        templateJSON["Runeword"][name].date = date
    }

    localStorage.setItem("holygrail", JSON.stringify(templateJSON)) 
}

function displaySaveButton() {
    var saveBtn = document.getElementById("btnSave")
    saveBtn.style.display = "block"
}