async function saveHolyGrail() {
    var token = localStorage.getItem("token")
    var holyGrail = localStorage.getItem("holygrail")
    var isDirty = localStorage.getItem("isDirty")
    if (token != null && holyGrail != null && isDirty != null) {  
        var customHeader = { "Authorization": "Bearer " + token }  
        
        $.ajax({
            url: 'https://d2challenge.herokuapp.com/saveTemplate',
            headers: customHeader,
            dataType: 'text',
            type: 'post',
            contentType: 'application/json',
            data: holyGrail,
            success: function( data, textStatus, jQxhr ){
                localStorage.setItem("isDirty", false)
                location.reload()
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
    }
}