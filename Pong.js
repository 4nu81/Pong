
var Ball = 10
var p1Kickerheight = 80
var p1Kickerwidth = 20
var p2Kickerheight = 80
var p2Kickerwidth = 20
var p1positionx = 50
var p1positiony = 260
var p2positionx = 1130
var p2positiony = 260
var ballx = 600
var bally = 300
var kachel = 10 
var allkachel = 72000
var ctx = null
var gameId = null
var ballspeed = 1
var angle =  0.25 * Math.PI //Math.random() * 2.00 * Math.PI 
var pause = false
const UP_KEY = 38;
const DOWN_KEY = 40;
const W_KEY = 87;
const S_KEY = 83;
const P_KEY = 80;
var p1score = 0;
var p2score = 0;
var keysdown = {}


function gameLoop () {
    drawfield() 
    if (pause == true) console.log ('pause')
    if (!pause) {  
        directionchange()
        ballball()
        Score() 
  
    } 
}
function ballball() {
    var deltax = Math.cos(angle)* ballspeed
    var deltay = Math.sin(angle)* ballspeed
    ballx += deltax
    bally -= deltay
}
function Score () {
    if (ballx < p1positionx) {
        p2score++
    } else if (ballx > p2positionx) {
        p1score++
    }
}

function directionchange (evt) {
    if (UP_KEY in keysdown && p2positiony > 10) {
        p2positiony += -2
        pause = false
    }if (DOWN_KEY in keysdown && p2positiony < 510) {
        p2positiony += 2
        pause = false
    } if (W_KEY in keysdown && p1positiony > 10) {
        p1positiony += -2
        pause = false
    } if (S_KEY in keysdown && p1positiony < 510) {
        p1positiony += 2
        pause = false
    } if (P_KEY in keysdown) {
        pause = !pause
    }
}
function drawfield() { 
    ctx.fillStyle = "black";
    ctx.fillRect (0,0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect (ballx, bally, Ball, Ball)
    ctx.fillStyle = "blue";
    ctx.fillRect (p1positionx,p1positiony,p1Kickerwidth,p1Kickerheight)
    ctx.fillStyle = "crimson"
    ctx.fillRect (p2positionx,p2positiony, p2Kickerwidth, p2Kickerheight)
    var gradient = ctx.createLinearGradient(0, 0, 170, 0);
var gradient = ctx.createLinearGradient(0, 0, 1200, 0);
gradient.addColorStop("0", "blue");
gradient.addColorStop("0.5", "lime");
gradient.addColorStop("1", "crimson");
gradient.addColorStop("0.25", "lightblue");
gradient.addColorStop("0.75", "yellow");
ctx.strokeStyle = gradient;
ctx.lineWidth = 20;
ctx.strokeRect(0, 0, 1200, 600);
}
window.onload = function () {
    var canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    gameId = setInterval(gameLoop, 10);
    document.addEventListener ("keydown", function (evt) {
        keysdown[evt.keyCode] = true;
    }, false);
    addEventListener ("keyup", function (evt) {
        delete keysdown[evt.keyCode];
    },false)
} 