/*global firebase, React, ReactDOM */ 
/*jshint esnext: true, moz: true*/ 
/*jslint browser:true */ 


		window.addEventListener('load', function() {
            
//----------dom elements for the inputs
            let ProdNamn = document.getElementById('ProdProdNamn');
			let ProdPrice = document.getElementById('ProdPrice');
			let ProdColor = document.getElementById('ProdColor'); 
            
            let inputAntalResultat = document.getElementById('inputAntalResultat');
            
            //table to show
            let tableShowProd = document.getElementById('tableShowProd');
            
            //buttons
            let addButton = document.getElementById('addButton');
			let btnSortProdNamn = document.getElementById('btnSortProdNamn');
			let btnSortProdPrice = document.getElementById('btnSortProdPrice');

			let btnSortProdColor = document.getElementById('btnSortProdColor');
            
            
//-----------add prod to firebase database---
            addButton.addEventListener('click', function(event) {
                
				console.log('add to database products');
				firebase.database().ref('products/').push({
					ProdNamn: ProdNamn.value,
					ProdPrice: ProdPrice.value,
					ProdColor: ProdColor.value
				});
			});
            
            
//To manage the changes we have used value. The event value fired 1) the first time we connect to the database, 2) each time an element changes.
            firebase.database().ref('products/').on('child_added', function(snapshot, prevChildKey) {
				console.log('Första gången eller ändring i databasen. prevChildKey: ' + prevChildKey);
				let data = snapshot.val();
				//console.log('data:', data);
				addAnimalToTable(data);
			});
            
            //show in the table list 
            function addAnimalToTable(data) {
				let tr = document.createElement('tr');
				tr.innerHTML = `<td>${data.ProdNamn}</td> <td>${data.ProdPrice}</td> <td style="width: 50px; background-color: ${data.ProdColor};"></td>`;
				tableShowProd.appendChild(tr);
			}
            
            //a function created to sort the list on button event
            function sortFunction(button, sortKey) {
				button.addEventListener('click', function(event) {
					tableVisaproducts.innerHTML = '';
					//firebase.database().ref('products/').off('value')
					firebase.database().ref('products/').orderByChild(sortKey)
					.once('value', function(snapshot) {
						snapshot.forEach( animalRef => {
							addAnimalToTable(animalRef.val());
						})
					});
				})
			}
            
            sortFunction(btnSortProdNamn, 'ProdNamn');
			sortFunction(btnSortProdPrice, 'ProdPrice');
			sortFunction(btnSortAntal, 'antal');
			sortFunction(btnSortProdColor, 'ProdColor');
            
            
            
            inputAntalResultat.addEventListener('keypress', function(event) {
				if( event.keyCode == 13 ) {
					let antal = Number(inputAntalResultat.value);
					tableVisaproducts.innerHTML = '';
					console.log('inputAntalResultat: antal=' + antal);
					if( isNaN(antal) ) {
						// varna användaren
					} else {
						firebase.database().ref('products/').limitToFirst(antal)
						.once('value', function(snapshot) {
								snapshot.forEach( animalRef => {
									addAnimalToTable(animalRef.val());
								})
							
						});
					}
				}
			});
        });
