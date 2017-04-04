window.onload = function() {


// deleting the users name.

function  deletefunc(){
	let deleteBTTN = document.getElementById("deleteBTTN");
	deleteBTTN.addEventListener('click', function(event) {

		localStorage.removeItem('name');
		document.getElementById("messageDiv").style.visibility = "hidden";

		document.getElementById('welcomeMessage').innerHTML = "Hi please enter your name to write comments!";
		deletefunc();
	})

}
deletefunc();

// Check for LocalStorage support.
if (localStorage) {

	// Add an event listener for form submissions
	document.getElementById('addbutton').addEventListener('click', function() {
		console.log('button.click');
		// Get the value of the name field.
		var name = document.getElementById('name').value;

		// Save the name in localStorage.
		localStorage.setItem('name', name);
		displayName();
	});

}

	var name = localStorage.getItem('name');

function displayName() {
	// Retrieve the users name.
	var name = localStorage.getItem('name');

	if (typeof name !== "undefined" && name !== "null") {
		document.getElementById('welcomeMessage').innerHTML = "Hello " + name + "!";

		document.getElementById("messageDiv").style.visibility = "visible";
	}

	if (typeof name == "undefined" || name == "null" || name =="") {
		document.getElementById("messageDiv").style.visibility = "hidden";
	}
}



//}
displayName();
document.getElementById("messageDiv").style.visibility = "hidden";




//dom element for the text box
let textBtn=document.getElementById("saveMssg");
let textarea=document.getElementById("textInput")




//firebase
firebase.database();
//Lägga till ett objekt:

textBtn.addEventListener('click', function(event){
	document.getElementById("textInput")="";
	let obj = {
		name: localStorage.getItem('name'),
		time: new Date().toLocaleTimeString() + " " + new Date().toDateString(),
		message: textarea.value
	};
	console.log('obj is:',obj);
	firebase.database().ref('fChat/').push(obj);




});

firebase.database().ref('fChat/').on('value', function(snapshot) {
	let allData = snapshot.val();
	let mlist = document.getElementById("messagelist");


	for( let EaObj in allData ) {
		let li = document.createElement('li');
		li.innerHTML = `${allData[EaObj].name}<br/>
${allData[EaObj].time}<br/>
${allData[EaObj].message}`;

		mlist.appendChild(li);

	}
});
};