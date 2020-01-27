
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
var ballspeedx = 0
var ballspeedy = 0
var pause = false
const UP_KEY = 38;
const DOWN_KEY = 40;
const W_KEY = 87;
const S_KEY = 83;
const P_KEY = 80;
var p1score = 0;
var p2score = 0;

function gameLoop () {
    drawfield() 
    if (pause == true) console.log ('pause') 
    if (!pause) {  
        Kollision()
        Clock1()
        Clock2()  
        Score()     
    } 
}
function border() {
    if (p1positiony == 0) {
        
    }
}

function Score () {
    if (ballx < p1positionx) {
        p2score++
    } else if (ballx > p2positionx) {
        p1score++
    }
}
function Kollision () {
    if (ballx && bally == p1positionx && p1positiony && ballspeedx == 1 ) {
        ballspeedx = -1
    } else if (ballx && bally == p1positionx && p1positiony && ballspeedx == 2) {
        ballspeedx = -2
    } else if (ballx && bally == p1positionx && p1positiony && ballspeedx == 3) {
        ballspeedx = -3 
    }
    if (ballx && bally == p1positionx && p1positiony && ballspeedx == -1 ) {
        ballspeedx = 1
    } else if (ballx && bally == p1positionx && p1positiony && ballspeedx == -2) {
        ballspeedx = 2
    } else if (ballx && bally == p1positionx && p1positiony && ballspeedx == -3) {
        ballspeedx = 3 
    }
}
function Clock1 () {
    for (var clocknumber1 = 0;clocknumber1 < 3001;clocknumber1++ ) {
        if (clocknumber1 == 3000) {
            ballspeedx = 2
            ballspeedy = 2
        }
    }
}
function Clock2 () {
    for (var clocknumber2 = 0;clocknumber2 < 6001;clocknumber2++) {
        if (clocknumber2 == 6000) {
        ballspeedx = 3
        ballspeedy = 3
        }
    }
}
function directionchange (evt) {
    if (evt.keyCode == UP_KEY) {
        p2positiony += -10
        pause = false
    }if (evt.keyCode == DOWN_KEY) {
        p2positiony += 10
        pause = false
    } if (evt.keyCode == W_KEY) {
        p1positiony += -10
        pause = false
    } if (evt.keyCode == S_KEY) {
        p1positiony += 10
        pause = false
    } if (evt.keyCode == P_KEY) {
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
gradient.addColorStop("0.3", "yellow");
gradient.addColorStop("0.7", "lightblue");
ctx.strokeStyle = gradient;
ctx.lineWidth = 20;
ctx.strokeRect(0, 0, 1200, 600);
}
window.onload = function () {
    var canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    document.addEventListener('keydown', directionchange);
    gameId = setInterval(gameLoop, 10);
} 