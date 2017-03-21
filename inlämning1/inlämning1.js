
window.addEventListener('load', function() {  
  
  
   let ViewApi= document.getElementById('apiReqAnswerFeild');
  let ApiBttn= document.getElementById('bttnApi');

/*----------view--------*/
 let ShowApi = function() {

let url = "https://www.forverkliga.se/JavaScript/api/crud.php?requestKey";    
     let req = new XMLHttpRequest();
        req.open('get', url);
        req.onreadystatechange = function() {
            if(req.status == 200 && req.readyState == 4) {
                let json = JSON.parse(req.responseText);
                
                if(json.status === 'error'){
                    pushBook();
                }else {
                    ViewApi.innerHTML=json.key;
                    
                }            
                    }
        };
                
req.send(); 
     
};

ApiBttn.addEventListener('click', ShowApi);       
    
    

let tryAgain = document.getElementById("tryAgain");
    
//    *********** buttons *********************************
let AddBookBttn = document.getElementById("AddBookBttn");
let ViewBookListBttn = document.getElementById("ViewBookListBttn");   
let MakeChangesBttn = document.getElementById("MakeChangesBttn");   
let DeleteBookFromList = document.getElementById("DeleteBookFromList");
    
//    *********** inputs ******************************
let AuthorNameInput = document.getElementById("AuthorNameInput");   
let BookTitleInput = document.getElementById("BookTitleInput");


//    **********************************************
let booknumber = document.getElementById("booknumber");
let booktitle = document.getElementById("booktitle");   
let bookauthor = document.getElementById("bookauthor"); 



//    **********************************************   
var viewBooks = document.getElementById("viewBooks"); 


let bookid = document.getElementById("bookid"); 
    
var olBookList = document.getElementById("olBookList");    
 



//  *********** add book to the list*************    

    
 let pushBook = function() {
     
    let titleToPush = BookTitleInput.value;
    let authorToPush = AuthorNameInput.value;

     
     let url = "https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=1WA18&title=" + titleToPush +"&author=" + authorToPush;
    
    
     let req = new XMLHttpRequest();
        req.open('post', url);
        req.onreadystatechange = function() {
            if(req.status == 200 && req.readyState == 4) {
                let json = JSON.parse(req.responseText);
                
                if(json.status === 'error'){
                    pushBook();
                }else {
                    BookTitleInput.value="";
                    AuthorNameInput.value="";
                }            
                    }
        };
                
req.send(); 
     
};

AddBookBttn.addEventListener('click', pushBook);    



//************** view list ********************* 
let reloadPage = function(){
    let url = "https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=1WA18";
    
    let req = new XMLHttpRequest();
        req.open('get', url);
        req.onreadystatechange = function() {
            if(req.status == 200 && req.readyState == 4) {
                let json = JSON.parse(req.responseText);
               
                if(json.status === 'error'){
                    reloadPage();
                }

//********************************************************************                
                else {
                    let bookArray = json.data;
                    olBookList.innerHTML = "";
                    console.log(bookArray);
                      for(let i=0; i< bookArray.length; i++){                          
                            
                            let li = document.createElement('li');
                            li.innerHTML = '"' + bookArray[i].title + '"' +", "+ bookArray[i].author + ", ID: " + bookArray[i].id;
                            olBookList.appendChild(li);
                        }
                      }                 
                    }
                  };
        
                
req.send(); 
 
};
ViewBookListBttn.addEventListener('click', reloadPage);



    
//*************delete book**************************************
    
let deleteBook = function() {
     
    let idToPush = bookid.value;

     
     let url = "https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&key=1WA18&id=" + idToPush;
    
    
     let req = new XMLHttpRequest();
        req.open('post', url);
        req.onreadystatechange = function() {
            if(req.status == 200 && req.readyState == 4) {
                let json = JSON.parse(req.responseText);
                
                if(json.status === 'error'){
                    deleteBook();
                }else {
                    bookid.value="";
                    reloadPage();

                }              
             

                    }
        };
                
req.send(); 
     
};
DeleteBookFromList.addEventListener('click', deleteBook);
    
    
//*********************modify**************************  
let ModifyData = function() {
     
    let booknumberC = booknumber.value;
    let booktitleC = booktitle.value;
    let bookauthorC = bookauthor.value;

     
     let url = "https://www.forverkliga.se/JavaScript/api/crud.php?op=update&key=1WA18&id=" + booknumberC + "&title=" + booktitleC + "&author=" + bookauthorC;
    
    
     let req = new XMLHttpRequest();
        req.open('post', url);
        req.onreadystatechange = function() {
            if(req.status == 200 && req.readyState == 4) {
                let json = JSON.parse(req.responseText);
                if(json.status === 'error'){
                    ModifyData();                    
                }
              
              else {
                    booknumber.value="";
                    booktitle.value="";
                    bookauthor.value="";
                
                    reloadPage();

                    
                }
                

             

                    }
        };
                
req.send(); 
     
};
MakeChangesBttn.addEventListener('click', ModifyData);
       
    
       
    
    
    
});