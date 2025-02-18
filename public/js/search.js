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
                toolTipItemsUnique();
                toolTipItemsSet();
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
    } else {
        let contentDiv = $("#errorMessage"); 
        contentDiv.empty(); // Supprime les anciens résultats
        contentDiv.append("<p class='errorMessage'>Input minimum 3 characters for search.</p>");
        return;
    }
}

// Fonction pour mettre à jour l'UI avec les objets trouvés
function updateUI(result) {
    let contentDiv = $("#errorMessage"); 
    contentDiv.empty(); // Supprime les anciens résultats

    if (result.length === 0) {
        contentDiv.append("<p class='errorMessage'>No items found.</p>");
        return;
    }

    let contentUnique = $("#unique_content"); 
    contentUnique.empty();

    result.forEach(objet => {
        let objetHtml;
        if(objet.item === "Unique") {
            objetHtml = `
            <div id="item_${objet.id}_${objet.item}" class='objetSearch Unique'>                   
                <div class="tooltip">
                    <img src="/images/${objet.kind}/${objet.image}.png" class="obj_image">
                    <span class="obj_name obj_name_unique">${objet.name}</span>
                    <span class="obj_value">${objet.value.charAt(0).toUpperCase()}${objet.value.slice(1)} Unique</span>
                    <span class="obj_type">${objet.type}</span>
                    <span class="tooltiptext uniquetooltip">${objet.properties}</span>
                </div>
            </div>`;   
        } else if(objet.item === "Set") {
            objetHtml = `
            <div id="item_${objet.id}_${objet.item}" class='objetSearch Set'>                   
                <div class="tooltip">
                    <img src="/images/${objet.kind}/${objet.image}.png" class="obj_image">
                    <span class="obj_name obj_name_set">${objet.name}</span>
                    <span class="obj_type">${objet.type}</span>
                    <span class="tooltiptext settooltip">${objet.properties}</span>
                </div>
            </div>`;
        }             
        contentUnique.append(objetHtml); // Ajoute l'objet à la page
    });
}