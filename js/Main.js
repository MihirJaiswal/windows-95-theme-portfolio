var canvas, canvasContext;

var blueCar = new carClass();
var greenCar = new carClass();

window.onload = function() {

	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	colorRect(0, 0, canvas.width, canvas.height, 'black');
	colorText("LOADING", canvas.width / 2, canvas.height / 2, 'white');
	loadImages();
}

function ImageLoadingDone() {

	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);
	setupInput();

	loadLevel(levelOne);
	
} 

function loadLevel(whicLevel) {
	trackGrid = whicLevel.slice();
	blueCar.reset(carPic, "Blue Strom");
	greenCar.reset(otherCarPic, "Green Machine");
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll(){
	blueCar.move();
	greenCar.move();
}



function clearScreen() {

	colorRect(0,0, canvas.width,canvas.height, 'black');
}


function drawAll() {
	// clearScreen();
	drawTracks();
	blueCar.draw();
	greenCar.draw();
}
