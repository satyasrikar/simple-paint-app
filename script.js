var canvas = document.getElementById("myCanvas");
var context = canvas.getContext('2d');

var dFlag = false, hitFlag = false; //(dFlag) to check if mouse is currently dragging; (hitFlag) to check if mouse hits a shape
var dragStartLoc;
var snapshot;
var fillStyle = document.getElementById("fillColor");




function welcome() {
    alert("Welcome! \n This is a simple Paint App using Vanilla JavaScript! \n Click + Drag to Drag Circles \n Select Colours! | Press SPACE to clear canvas. \n \n To save your work right click on the canvas and choose 'Save As..'");
}



function drawStyles() {

    context.strokeStyle = 'yellow';
    context.fillStyle = fillStyle.value;
    context.lineWidth = 4;
    context.lineCap = 'round';
    console.log(fillStyle.value);
    document.getElementById("body").style.borderColor = fillStyle.value;
}

//Writes Coordinates to screen for each event
function drawGps() {
    var posX = dragStartLoc.x;
    var posY = dragStartLoc.y;
    document.getElementById('x-value').innerHTML = Math.floor(posX);
    document.getElementById('y-value').innerHTML = Math.floor(posY);

}

//Retrieve Coordinates of click
function getGPS(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;

    return { x: x, y: y };
}

//preserve and retrieve Frames to enable drawing multiple shapes
function saveFrame() {
    canvasFrame = context.getImageData(0, 0, canvas.width, canvas.height);
}

function getFrame() {
    context.putImageData(canvasFrame, 0, 0);
}


function submit() {
    drawStyles();

}

function drawBg(color) {

}

// function checkHit(position) {
//     var radius = Math.sqrt(Math.pow((dragStartLoc.x - position.x), 2) + Math.pow((dragStartLoc.y - position.y), 2));

//         if ((positon.x - dragStartLoc.x) * (positon.x - dragStartLoc.x) +
//             (positon.y - dragStartLoc.y) * (positon.y - dragStartLoc.y) <= radius * radius)
//             alert("inside");
//         else
//         alert("outside");
//     }

// }


// function testHit() {
//    takeSnapshot();
//    restoreSnapshot();
//    testHit == true;
//    checkHit();

// }






function drawCircle(position) {
    var radius = Math.sqrt(Math.pow((dragStartLoc.x - position.x), 2) + Math.pow((dragStartLoc.y - position.y), 2));
    context.beginPath();
    context.arc(dragStartLoc.x, dragStartLoc.y, radius, 0, 2 * Math.PI, false);
    context.fill();
    document.getElementById('size').innerHTML = Math.floor(radius);
}


function startDraw(event) {
    dFlag = true;
    dragStartLoc = getGPS(event);
    saveFrame();
    drawGps();
}

function drag(event) {
    var position;
    if (dFlag === true) {
        getFrame();
        drawGps();
        position = getGPS(event);
        drawCircle(position);


    }
}

function endDraw(event) {
    dFlag = false;
    saveFrame();
    getFrame();
    var position = getGPS(event);
    drawCircle(position);
    drawBg();


}





document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        context.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById("size").innerHTML = "-";
        document.getElementById("x-value").innerHTML = "-";
        document.getElementById("y-value").innerHTML = "-";
    }

})



canvas.addEventListener('mousedown', startDraw, false);
canvas.addEventListener('mousemove', drag, false);
canvas.addEventListener('mouseup', endDraw, false);
fillStyle.addEventListener('input', drawStyles(), false);

window.addEventListener('load', welcome(), true);


