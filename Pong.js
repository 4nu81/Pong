
var Ball = 10
var ballheight = 10
var ballwidth = 10
var p1height = 80
var p1width = 20
var p2height = 80
var p2width = 20
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
var ballspeed = 3
var angle = Math.random() * 0.5 - 0.25
var pause = false
const UP_KEY = 38;
const DOWN_KEY = 40;
const W_KEY = 87;
const S_KEY = 83;
const P_KEY = 80;
var p1score = 0;
var p2score = 0;
var keysdown = {}
var timer_couter = 0

function gameLoop () {
    drawfield() 
    if (pause == true) console.log ('pause')
    if (!pause) {  
        directionchange()
        p1bounce()
        ballbounce()
        Score()
        
    } 
}
function timer() {
    if (timer_couter%5 == 0) { // % -> Modulo  (Rest nach Division)
        ballspeed++
    }
}

function kicker1hit() {
    var fak = (bally - p1positiony) / p1height
    angle = (0.5 * (1 - fak)) - 0.25
}
function kicker2hit() {
    var fak = (bally - p2positiony) / p2height
    angle = (0.5 * (fak)) + 0.75
}

function p1bounce() {
    if (ballx <= p1positionx + p1width && ballx >= p1positionx) {
        if (bally + ballheight >= p1positiony && p1positiony + p1height >= bally) {
            kicker1hit()
            timer_couter++
            timer()
        }
    } if (ballx + ballwidth >= p2positionx && ballx + ballwidth <= p2positionx + p2width) {
        if (bally + ballheight >= p2positiony && p2positiony + p2height >= bally) {
            kicker2hit()
            timer_couter++
            timer()
        }
    }

}

function ballbounce() {
    if (bally <= 10) {
        angle *= -1
    } else if (bally >= canvas.height - 20) {
        angle *= -1
    }
    var deltax = Math.cos(angle * Math.PI) * ballspeed
    var deltay = Math.sin(angle * Math.PI) * ballspeed
    ballx += deltax
    bally -= deltay
}
function Score () {
    if (ballx <= 10) {
        ballx = 600
        bally = 300
        angle = Math.random() * 0.5 - 0.25 // Ball nach rechts
        ballspeed = 3
        p2score++
    } else if (ballx >= canvas.width - 20) {
        ballx = 600
        bally = 300
        angle = Math.random() * 0.5 + 0.75 // Ball nach liks
        ballspeed = 3
        p1score++
    }
}

function directionchange (evt) {
    if (UP_KEY in keysdown && p2positiony > 10) {
        p2positiony += -4
        pause = false
    }if (DOWN_KEY in keysdown && p2positiony < 510) {
        p2positiony += 4
        pause = false
    } if (W_KEY in keysdown && p1positiony > 10) {
        p1positiony += -4
        pause = false
    } if (S_KEY in keysdown && p1positiony < 510) {
        p1positiony += 4
        pause = false
    }
}
function drawfield() { 
    ctx.fillStyle = "black";
    ctx.fillRect (0,0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect (ballx, bally, Ball, Ball)
    ctx.fillStyle = "blue";
    ctx.fillRect (p1positionx,p1positiony,p1width,p1height)
    ctx.fillStyle = "crimson"
    ctx.fillRect (p2positionx,p2positiony, p2width, p2height)
    var gradient = ctx.createLinearGradient(0, 0, 1200, 0);
    gradient.addColorStop("0", "blue");
    gradient.addColorStop("0.5", "lime");
    gradient.addColorStop("1", "crimson");
    gradient.addColorStop("0.25", "lightblue");
    gradient.addColorStop("0.75", "yellow");
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 20;
    ctx.strokeRect(0, 0, 1200, 600);
    ctx.fillStyle ="lime"
    ctx.font ="20px Arial"
    ctx.fillText(p1score, 20, 580 )
    ctx.fillStyle ="lime"
    ctx.font ="20px Arial"
    ctx.fillText(p2score, 1150, 580)
}
window.onload = function () {
    var canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    gameId = setInterval(gameLoop, 10);
    document.addEventListener ("keydown", function (evt) {
        if (P_KEY == evt.keyCode) {
            pause = !pause
        } else {
            keysdown[evt.keyCode] = true;
        }
    }, false);
    addEventListener ("keyup", function (evt) {
        delete keysdown[evt.keyCode];
    },false)
}