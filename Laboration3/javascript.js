//lab 2

function Circle(centerX, centerY, radius) {
	this.radius = radius;
	this.centerX = centerX;
	this.centerY = centerY;
	this.points=function (){
		return [{x: this.centerX, y:this.centerY}];
	}
	this.move = function (dx, dy) {
	   this.centerX = this.centerX + dx;
	   this.centerY = this.centerY + dy;
	};
	this.area = function(){
	return (Math.PI * this.radius * this.radius);
		};
	this.distanceTo= function(otherCircle){
		let c= Math.sqrt((otherCircle.centerX - this.centerX)*(otherCircle.centerX - this.centerX) + (otherCircle.centerY - this.centerY)*(otherCircle.centerY - this.centerY));
		let d =c-this.radius*2;
		if(d<0) return 0;
		return d;
	}
	this.boundingBox=function(){
			x1=this.centerX - this.radius;
			y1=this.centerY + this.radius;
			x2=this.centerX + this.radius;
			y2=this.centerY - this.radius;
			
			return new Rectangle(x1, y1, x2, y2)
		}
}
let c1 = new Circle(1,1, 1);
let c2= new Circle(4, 5, 1);
console.log('distance c1 to c2: '+c2.distanceTo(c1));

function Triangle(x1, y1, x2, y2, x3, y3){
	this.x1=x1;
	this.y1=y1; 
	this.x2=x2;
	this.y2=y2;
	this.x3=x3;
	this.y3=y3;
	this.points=function(){
		return[{x:this.x1, y:this.y1},{x:this.x2, y:this.y2},{x:this.x3, y:this.y3}];
			}
	this.area = function() {
				return(0.5*(x1*y2+x2*y3+x3*y1-x1*y3-x2*y1-x3*y2));
				}
	this.move = function(dx,dy) {
		  this.x1 += dx;
		  this.y1 += dy;
		  this.x2 += dx;
		  this.y2 += dy;
		  this.x3 += dx;
		  this.y3 += dy;
		}
	
	this.boundingBox=function(){
			let x1=this.x1;
			let y1=this.y1;
			let x2=this.x2;
			let y2=this.y2;
			let x3=this.x3;
			let y4=this.y4;
				
				minx=Math.min(x1, x2, x3);
				miny=Math.min(y1, y2, y3);
				maxx=Math.max(x1, x2, x3);
				maxy=Math.max(y1, y2, y3);
			return new  Rectangle(minx, maxy, maxx, miny);

	}

}

function Rectangle(x1, y1, x2, y2){
	this.x1=x1;
	this.y1=y1;
	this.x2=x2;
	this.y2=y2;
	
	this.area = function(){
		return ((this.x2-this.x1)*(this.y2-this.y1));
				};
	this.move = function(dx,dy) {
		  this.x1 = this.x1 + dx;
		  this.y1 = this.y1 + dy;
		  this.x2 = this.x2 + dx;
		  this.y2 = this.y2 + dy;
		}
	this.points =function(){
		let points=[{x:this.x1, y:this.y1},{x:this.x2, y:this.y2},{x:this.x2, y:this.y1},{x:this.x1, y:this.y2}];
		return points;
	}
	this.distanceTo=function(otherRectangle){
		let ox= (this.x2+this.x1)*0.5;
		let oy= (this.y2+this.y1)*0.5;
		let nx= (otherRectangle.x2+otherRectangle.x1)*0.5;
		let ny= (otherRectangle.y2+otherRectangle.y1)*0.5;

			let b= ((nx-ox)*(nx-ox)+(ny-oy)*(ny-oy));
			let c= Math.sqrt(b);
		
			return c;
	}
}
//**************


let ObjectList=[];

let dropbutton = document.getElementsByClassName('dropbtn')[0];
let div = document.getElementById("myDropdown");

dropbutton.addEventListener('click', function(event) {
  // div.style.display
  if( div.style.display == 'block' )
    div.style.display = 'none';
  else
    div.style.display = 'block';
  console.log('hello');
});






let rect = document.getElementById('rec1');
	rect.addEventListener('click', function(event) {
		points = []
  userClickedRectangleButton = true;
		userClickedTriangleButton = false;
		userClickedCircleButton = false;
});


let triangle =document.getElementById('tri1');
	triangle.addEventListener('click', function(event) {
	points = []
  userClickedTriangleButton = true;
		userClickedRectangleButton = false;
		userClickedCircleButton = false;

});


let circle = document.getElementById('cir1');
		circle.addEventListener('click', function(event) {
			points = [];
		userClickedCircleButton = true;
			userClickedRectangleButton = false;
			userClickedTriangleButton = false;
		});



//canvas
let canvas = document.getElementById('canv');


let context = canvas.getContext('2d');

let info = document.getElementById('info');
let points= [];
let tpoints= [];
let cpoints= [];






//-----------------user pick color

let userwillPickColor = document.getElementById('addColor');
userwillPickColor.addEventListener('click', function()
	{
	info.innerHTML = 'user picked  '+ document.getElementById('colorid').value +' color.';
	userSelectedColor = true;
	});

let colorpick = document.getElementById('colorid').value;

let notInColorList= document.getElementsByTagName('Option');

canvas.addEventListener('click', function()
{
	if (userSelectedColor){
		
		context.strokeStyle = document.getElementById('colorid').value;
	}

});
//--------------------


//rectangle
canvas.addEventListener('click', function(event) {
  info.innerHTML = 'user clicked at: ' +
   event.clientX + ', ' + event.clientY;
let r = event.target.getBoundingClientRect();

  if ( userClickedRectangleButton ) {
    console.log('user clicked rectangle button');
    points.push([event.clientX-r.left, event.clientY-r.top]);

    if( points.length == 2 ) {

      let Xaxis= points[0][0];
      let Yaxis= points[0][1];
			let Xaxis2=points[1][0];
			let Yaxis2=points[1][1];
      let width  = Xaxis2-Xaxis;
      let height = Yaxis2-Yaxis;


      console.log(points);


			context.lineWidth = 6;
			context.strokeRect(Xaxis, Yaxis, width, height)
      info.innerHTML += 'selected points for rectangle ' + points;
			
			let RecObj = new Rectangle(Xaxis, Yaxis, Xaxis2, Yaxis2);
			ObjectList.push(RecObj);
    }
  }
});



//triangle



canvas.addEventListener('click', function(event) {
  info.innerHTML = 'user clicked at: ' +
   points + ', to make a triangle';
let r = event.target.getBoundingClientRect();

  if ( userClickedTriangleButton ) {
    console.log('user clicked triangle button');

		points.push([event.clientX-r.left,
		event.clientY-r.top]);

		if (points.length ==3){

			let X1=points[0][0];
			let Y1=points[0][1];
			let X2=points[1][0];
			let Y2=points[1][1];
			let X3=points[2][0];
			let Y3=points[2][1];

			console.log(points);

			context.beginPath();
			context.moveTo(X1, Y1);
			context.lineTo(X2, Y2);
			context.lineTo(X3, Y3);
			context.closePath();

			context.lineWidth = 6;

			context.stroke();

			let triobj = new Triangle(X1, Y1, X2, Y2, X3, Y3)
			ObjectList.push(triobj);
		}
	}
});



//circle
canvas.addEventListener('click', function(event) {
  info.innerHTML = 'user clicked at: ' +
   event.clientX + ', ' + event.clientY;
	let r = event.target.getBoundingClientRect();

  if ( userClickedCircleButton ) {
    console.log('user clicked circle button');
		points.push([event.clientX-r.left,
		event.clientY-r.top]);

		if (points.length ==2){

			let x1=points[0][0];
			let y1=points[0][1];

			let x2=points[1][0];
			let y2=points[1][1];
			let dx = x2 - x1, dy = y2 - y1;
			let R =Math.sqrt(dx*dx+dy*dy);


			let CirObj = new Circle(x1, y1, R);
			ObjectList.push(CirObj);

			drawCircle(CirObj);
		}
	}
});
function drawCircle(CirObj) {
	context.lineWidth = 6;
	context.beginPath();
	context.arc(CirObj.centerX, CirObj.centerY, CirObj.radius, 0, 2*Math.PI);
	context.stroke();
}
/*------export to json
first create the objects*/


let TBox= document.getElementById('divTextBox');



let exportjson=document.getElementById('exportToJson');


exportjson.addEventListener('click', function(){

	TBox.innerHTML=JSON.stringify(ObjectList);



});
//-----delete one
/*
let Delete= document.getElementById('deleteOne');
Delete.addEventListener('click', function() {
	ObjectList.pop();
	// redraw canvas with remaining objects in ObjectList
	for (i= 0; i<ObjectList.length; i++) {
		let obj = ObjectList[i];
		if( obj instanceof Circle) {
			drawCircle(obj);
		}
	}
		
      },false);
*/
//------------


//**clear the whole canvas
document.getElementById('clear').addEventListener('click', function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }, false);





//points
let clickCount=0;


//rectangle
let userClickedRectangleButton = false;
//triangle
let userClickedTriangleButton = false;
//circle
let userClickedCircleButton = false;

let userClickedRedButton = false;

let userClickedGreenButton = false;

let userSelectedColor = false;



