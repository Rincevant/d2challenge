function toolTipItemsUnique() {
    var docs = document.getElementsByClassName('uniquetooltip')
    var objetNames = document.getElementsByClassName('obj_name_unique')
    var index = 0
    for (let item of docs) {
        var itemText = item.innerHTML
        item.innerHTML = ""
        var res = itemText.split('\n')
        item.insertAdjacentHTML('beforeend', '<h3 class="unique">'+objetNames.item(index).innerHTML+'</h3>')
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
}

function toolTipItemsSet() {
    var docs = document.getElementsByClassName('settooltip')
    var objetNames = document.getElementsByClassName('obj_name_set')
    var index = 0
    for (let item of docs) {
        var itemText = item.innerHTML
        item.innerHTML = ""
        var res = itemText.split('\n')
        item.insertAdjacentHTML('beforeend', '<h3 class="set">'+objetNames.item(index).innerHTML+'</h3>')
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
}

toolTipItemsUnique();
toolTipItemsSet();