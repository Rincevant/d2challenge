var docs = document.getElementsByClassName('tooltiptext')
var objetNames = document.getElementsByClassName('obj_name')
var index = 0
for (let item of docs) {
    var itemText = item.innerHTML
    item.innerHTML = ""
    var res = itemText.split('\n')
    item.insertAdjacentHTML('beforeend', '<h3>'+objetNames.item(index).innerHTML+'</h3>')
    res.forEach(element => {
        var isWhite = false
        var isGreen = false
        var isBlue = false
        if (element.includes(":")) {
            isWhite = true
        }
        
        if (element.includes("Items")) {
            isGreen = true
        } 
        
        if (!element.includes("items") && !element.includes(":")) {
            isBlue = true
        }  

        if (isWhite) {
            item.insertAdjacentHTML('beforeend', '<p style="color:white";>'+element+'</p>')            
        } else if (isGreen)  {
            item.insertAdjacentHTML('beforeend', '<p style="color:#90ff00"; >'+element+'</p>')            
        } else if (isBlue) {
            item.insertAdjacentHTML('beforeend', '<p style="color:rgb(88,88,214)"; >'+element+'</p>')            
        }
    });
    index++                
}