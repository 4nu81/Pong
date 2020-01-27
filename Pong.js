
var Ball = 10
var p1Kickerheight = 70
var p1Kickerwidth = 20
var p2Kickerheight = 70
var p2Kickerwidth = 20
var p1positionx = 1
var p1positiony = 300
var p2positionx = 1180
var p2positiony = 300
var ballx = 600
var bally = 300
var kachel = 10 
var allkachel = 72000
var ctx = null
var gameId = null
var p1direction = 0
var p2direction = 0
var pause = true
// var context = canvas.getContext ("2d") ;
const UP_KEY = 38;
const DOWN_KEY = 40;
const W_KEY = 87;
const S_KEY = 83;
const P_KEY = 80;




function gameLoop () {
    drawfield ()
 //   drawfield2 () 
    if (!pause) {
        
    }
  
}
    
    

//directionchange
function directionchange (evt) {
    if (evt.keyCode == UP_KEY) {
        p2direction = -1 
        pause = false
    }else if (evt.keyCode == DOWN_KEY) {
        p2direction = 1
        pause = false
    } if (evt.keyCode == W_KEY) {
        p1direction = -1
        pause = false
    }else if (evt.keyCode == S_KEY) {
        p1direction = 1
        pause = false
    }else if (evt.keyCode == P_KEY) {
        pause = !pause
    }
}
function drawfield () { 
    ctx.fillStyle = "black";
    ctx.fillRect (0,0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect (ballx, bally, Ball, Ball)
    ctx.fillStyle = "blue";
    ctx.fillRect (p1positionx,p1positiony, p1Kickerwidth, p1Kickerheight)
    ctx.fillStyle = "crimson";
    ctx.fillRect (p2positionx,p2positiony, p2Kickerwidth, p2Kickerheight)
    }
    //function drawfield2() {
    //context.beginPath();
    //context.moveTo(0, 0);
    //context.lineTo (0,1200);
    //context.strokeStyle = '#7FFF00';
    //context.stroke();
    // }

window.onload = function () {
    var canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    document.addEventListener('keydown', directionchange);
    gameId = setInterval(gameLoop, 50);
    ctx.fillStyle = "blue";
    ctx.fillRect (p1positionx,p1positiony, p1Kickerwidth, p1Kickerheight)
    ctx.fillStyle = "crimson";
    ctx.fillRect (p2positionx,p2positiony, p2Kickerwidth, p2Kickerheight)
} 
