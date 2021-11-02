var docs = document.getElementsByClassName('tooltiptext')
var objetNames = document.getElementsByClassName('obj_name')
var index = 0
for (let item of docs) {
    var itemText = item.innerHTML
    item.innerHTML = ""
    var res = itemText.split('\n')
    item.insertAdjacentHTML('beforeend', '<h3>'+objetNames.item(index).innerHTML+'</h3>')
    var isWhite = true
    res.forEach(element => {
        if (!element.includes(":")) {
            isWhite = false
        }                
        if (isWhite) {
            item.insertAdjacentHTML('beforeend', '<p style="color:white";>'+element+'</p>')
        } else {
            item.insertAdjacentHTML('beforeend', '<p style="color:rgb(88,88,214)"; >'+element+'</p>')
        }
    });
    index++                
}