var template = localStorage.getItem("holygrail")

function obtain(id, kind, part, value, name, item) {
    if (id != null) {
        $.ajax({
            url: 'http://localhost:8080/holygrail/update/' + id,
            dataType: 'json',            
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ item: item }),
            success: function( response ){
                setDateAndObtainItem(id, kind, part, value, name, item)
            },
            error: function( jqXhr, textStatus, errorThrown ){
            }
        });
    }
}

function setDateAndObtainItem(id, kind, part, value, name, item) {
    var d = new Date();
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());
    var objet = document.getElementById("item_" + id)
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