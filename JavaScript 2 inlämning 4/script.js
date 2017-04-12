/*jshint esnext: true, moz: true*/
/*jslint browser:true */
/*global firebase, React, ReactDOM */
// För att garantera att inga DOM-element är null
window.addEventListener('load', function () {
    //input elements dom
    let Name = document.getElementById('prodName');
    let prodCatagories = document.getElementById('prodCatagories');
    let indiAmount = document.getElementById('indiAmount');
    let color = document.getElementById('prodColor');
    //table DOM
    let productListTb = document.getElementById('productListTb');
    //adding button
    let addButton = document.getElementById('addButton');
    //warning div
    let warnig = document.getElementById('warnig');
    //sorting buttons
    let btnSortName = document.getElementById('btnSortName');
    let btnSortFamily = document.getElementById('btnSortFamily');
    let btnSortAmount = document.getElementById('btnSortAmount');
    let btnSortColor = document.getElementById('btnSortColor');
    //nextTen
    let nextTen = document.getElementById('nextTen');
    //----
    let showNoOfProdInList = document.getElementById('showNoOfProdInList');
    
    //----
    let db = firebase.database();
    
    addButton.addEventListener('click', function (event) {
        
        //console.log('clicked to add');
        
        db.ref('products/').push({
            Name: Name.value,
            prodCatagories: prodCatagories.value,
            indiAmount: Number(indiAmount.value),
            color: color.value
        });
    });
    db.ref('products/').on('child_added', function (snapshot, prevChildKey) {
        console.log('first time adding to datbase ' + prevChildKey);
        let data = snapshot.val();
        addProdToCatalog(data);
    });

    function addProdToCatalog(data) {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${data.Name}</td> <td>${data.prodCatagories}</td> <td>${data.indiAmount}</td> <td style="width: 50px; background-color: ${data.color};"></td>`;
        productListTb.appendChild(tr);
    }
    //one function for all sorting functions
    function sortFunction(button, sortKey) {
        button.addEventListener('click', function (event) {
            productListTb.innerHTML = '';
            db.ref('products/').orderByChild(sortKey).once('value', function (snapshot) {
                snapshot.forEach(child => {
                    addProdToCatalog(child.val());
                });
            });
        });
    }
    //----
    sortFunction(btnSortName, 'Name');
    sortFunction(btnSortFamily, 'prodCatagories');
    sortFunction(btnSortAmount, 'indiAmount');
    sortFunction(btnSortColor, 'color');
    //----
    showNoOfProdInList.addEventListener('keypress', function (event) {
        if (event.keyCode == 13) {
            let indiAmount = Number(showNoOfProdInList.value);
            productListTb.innerHTML = '';
            
            if (isNaN(indiAmount)) {
                
                warnig.innerHTML = 'put in a number in the amount section';
            }
            else {
                
                db.ref('products/').limitToFirst(indiAmount).once('value', function (snapshot) {
                    snapshot.forEach(child => {
                        addProdToCatalog(child.val());
                    });
                });
            }
        }
    });
    //---
  /*  nextTen.addEventListener('click', function(event){
        
       let indiAmount = Number(showNoOfProdInList.value);
        
        for (let i=5; i+5; i<indiAmount.length ){
            
        db.ref('products/').limitToFirst(i).once('value', function (snapshot) {
                    snapshot.forEach(child => {
                        addProdToCatalog(child.val());
                    
                    });
         });
        
        }
        
    });*/
    //--
});
