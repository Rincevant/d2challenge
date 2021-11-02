// Permettant de switch l'obtention de l'objet
function obtain(id, name) {
    var d = new Date();
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());
    var objet = document.getElementById(id)
    console.log(id, name )
    if (objet.className == 'objet') {
        objet.getElementsByClassName('tooltip')[0].getElementsByClassName('obj_date')[0].innerHTML = month+"/"+day+"/"+year
        objet.classList.remove('objet')
        objet.classList.add('objetOwned')
    } else {
        objet.getElementsByClassName('tooltip')[0].getElementsByClassName('obj_date')[0].innerHTML = ""
        objet.classList.add('objet')
        objet.classList.remove('objetOwned')
    }
}