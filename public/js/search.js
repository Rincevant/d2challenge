async function searchItems(search) {
    if (search != null && search.length >= 3) {
        let searchJson = JSON.stringify({ value: search });
        $.ajax({
            url: 'http://localhost:8080/holygrail/search',
            dataType: 'json',
            type: 'POST',
            contentType: 'application/json',
            data: searchJson,
            success: function( response ){
                console.log(response)
                updateUI(response.objets);
                toolTipItems();
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
    } else {
        let contentDiv = $("#unique_content"); 
        contentDiv.empty(); // Supprime les anciens résultats
        contentDiv.append("<p class='errorMessage'>Input minimum 3 characters for search.</p>");
        return;
    }
}

// Fonction pour mettre à jour l'UI avec les objets trouvés
function updateUI(result) {
    let contentDiv = $("#unique_content"); 
    contentDiv.empty(); // Supprime les anciens résultats

    console.log(result)

    if (result.length === 0) {
        contentDiv.append("<p class='errorMessage'>No items found.</p>");
        return;
    }

    result.forEach(objet => {
        let objetHtml = `
            <div id="${objet.name.toLowerCase().replace(/\s/g, "_")}" class='objetSearch'>                   
                <div class="tooltip">
                    <img src="/images/${objet.kind}/${objet.image}.png" class="obj_image">
                    <span class="obj_name">${objet.name}</span>
                    <span class="obj_value">${objet.value.charAt(0).toUpperCase()}${objet.value.slice(1)} Unique</span>
                    <span class="obj_type">${objet.type}</span>
                    <span class="tooltiptext">${objet.properties}</span>
                </div>
            </div>            
        `;        
        contentDiv.append(objetHtml); // Ajoute l'objet à la page
    });
}