$(function () {   
    // Callback from a <input type="file" onchange="onChange(event)">
    $('input[type="file"]').change(function(event) {
        $('#result').empty();
        //Retrieve the first (and only!) File from the FileList object
        //Récupère le premier (et le seul !) File de l'objet FileList  
        var file = event.target.files[0];
        console.log("Encodage = "+ file.characterSet);
        
        // Récupère le séparateur indiqué dans l'input. Sinon c'est ','
//        var separater = $('#separater').val();
//        if (!separater) separater = ",";
//        console.log("separateur = "+ separater);
        
                    
        if (!file) {
            alert("Failed to load file");
        } else if (!file.name.match('\.csv')) {
            // Vérification du ytpe de fichier choisi
            alert(file.name + " n'est pas un fichier CSV !");
            alert(typeof(file));
        } else {
            var reader = new FileReader();
                reader.onload = function(event) {
                    let contents = event.target.result;
                    if (contents) {
                        $('#result').append($('<table>'));
                        // Découpage du fichier en lignes
                        var lines = contents.split('\n');
                        
                        // Détecte le séparateur (entre ',' et ';')
                        var separater = lines[0].split(',').length > 1 ? ',' : ';';
                        
                        for (var i = 0; i < lines.length; i++) {
                            if (lines[i].length > 0 ) { // Contre les lignes vides
                                
                                // Découpage des lignes en cases
                                var cases = lines[i].split(separater);
                                
                                switch (cases[0]) {
                                    // Récupération des quantités ------------------
                                    case "QUANTITES DE LIVRAISONS": // Possibilité d'utiliser le numéro de la ligne Excel
                                        $('table').append($('<tr>'));
                                        console.log(cases);
                                        console.log("Longueur cases : "+ cases.length);
                                        for (var j = 0; j < cases.length-1; j++) {
                                            if (cases[j]) {
                                                console.log("La case n°"+ j + " est inscrite.");
                                                $('tr:last-child').append($('<td>', {html: cases[j]}));
                                            }
                                        }
                                        // Essai avec .each()
//                                        $.each(cases, function (index, case1) {
//                                            if (case1) $('tr:last-child').append($('<td>', {html: case1}));
//                                        });
                                        break;
                                    // Récupération des prix -----------------------
                                    case "PRIX EN EURO HT AU MILLE":
                                        $('table').append($('<tr>'));
                                        // Première partie de l'étiquette
                                        let entetePrix = $('<td>', {html: cases[0]});
                                        // Je saute une ligne
                                        cases = lines[i+1].split(separater);
                                        // ajout de la deuxième partie de l'étiquette
                                        entetePrix.text(entetePrix.text() + cases[0]);
                                        $('tr:last-child').append(entetePrix);
                                        // Inscription des prix
                                        for (var j = 1; j < cases.length-1; j++) {
                                            if (cases[j])
                                                $('tr:last-child').append($('<td>', {html: cases[j]}));
                                        }
                                        break;
                                    default:

                                        break;
                                }
                            }
                        }
                    } else {
                        alert(file.name + " est vide !");
                    }
                };

                reader.readAsText(file); // By default, UTF-8 is assumed
        }
    });
    
    // Bouton Fichier" avec rappel du nom du fichier selectionné
    var inputs = document.querySelectorAll('input[type="file"]');
    Array.prototype.forEach.call( inputs, function( input ) {
        var label    = input.nextElementSibling,
            labelVal = label.innerHTML;

        input.addEventListener( 'change', function( e ) {
            var fileName = '';
    //        if( this.files && this.files.length > 1 )
    //                fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
    //        else
                fileName = e.target.value.split( '\\' ).pop();

            if (fileName) label.innerHTML = fileName;
            else label.innerHTML = labelVal;
        });
    });
});
