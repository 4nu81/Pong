
var paddle = {
    height: 80,
    width: 20
}
var P1 = {
    x: 50,
    y: 260,
    score: 0
}
var P2 = {
    x: 1130,
    y: 260,
    score: 0
}
var ball = {
    x:600,
    y:300,
    size:10,
    speed:3,
    angle: Math.random() * 0.5 - 0.25,
    image: new Image()
}

var ctx = null
var pause = false
const UP_KEY = 38;
const DOWN_KEY = 40;
const W_KEY = 87;
const S_KEY = 83;
const P_KEY = 80;
var keysdown = {}
var timer_couter = 0
var then = Date.now();
var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;

function game() {
    var now = Date.now();
	var delta = now - then;
    if (!pause) {
        ki();
        processInput(delta);
        updatePosition(delta);
        paddleCollisionCheck();
        scoreCheck();
    }
    render()
    then = now;
    requestAnimationFrame(game);
}

function ki(){
    if (ball.y + ball.size/2 < P2.y + paddle.height/2) {
        keysdown[UP_KEY] = true
        delete keysdown[DOWN_KEY]
    } else {
        keysdown[DOWN_KEY] = true
        delete keysdown[UP_KEY]
    }
}

function timer() {
    if (timer_couter%5 == 0) { // % -> Modulo  (Rest nach Division)
        ball.speed++
    }
}
function kicker1hit() {
    var fak = (ball.y - P1.y) / paddle.height
    ball.angle = (0.5 * (1 - fak)) - 0.25
}
function kicker2hit() {
    var fak = (ball.y - P2.y) / paddle.height
    ball.angle = (0.5 * (fak)) + 0.75
}
function paddleCollisionCheck() {
    if (ball.x <= P1.x + paddle.width && ball.x >= P1.x) {
        if (ball.y + ball.size >= P1.y && P1.y + paddle.height >= ball.y) {
            kicker1hit()
            timer_couter++
            timer()
        }
    } if (ball.x + ball.size >= P2.x && ball.x + ball.size <= P2.x + paddle.width) {
        if (ball.y + ball.size >= P2.y && P2.y + paddle.height >= ball.y) {
            kicker2hit()
            timer_couter++
            timer()
        }
    }
}
function updatePosition(delta) {
    var speed = ball.speed * delta / 10
    if (ball.y <= 10 || ball.y >= canvas.height - 20) {
        if (Math.random() < 0.7) {
            ball.angle *= -1
        } else {
            if (ball.y <= 10) ball.y = canvas.height - 20
            else ball.y = 10;
        }
    }
    var deltax = Math.cos(ball.angle * Math.PI) * speed
    var deltay = Math.sin(ball.angle * Math.PI) * speed
    ball.x += deltax
    ball.y -= deltay
}
function scoreCheck () {
    if (ball.x <= 10) {
        ball.x = 600
        ball.y = 300
        ball.angle = Math.random() * 0.5 - 0.25 // Ball nach rechts
        ball.speed = 3
        P2.score++
    } else if (ball.x >= canvas.width - 20) {
        ball.x = 600
        ball.y = 300
        ball.angle = Math.random() * 0.5 + 0.75 // Ball nach liks
        ball.speed = 3
        P1.score++
    }
}

function processInput (delta) {
    if (UP_KEY in keysdown && P2.y > 10) {
        P2.y += -2 * delta / 10
        pause = false
    }if (DOWN_KEY in keysdown && P2.y < 510) {
        P2.y += 2 * delta / 10
        pause = false
    } if (W_KEY in keysdown && P1.y > 10) {
        P1.y += -2 * delta / 10
        pause = false
    } if (S_KEY in keysdown && P1.y < 510) {
        P1.y += 2 * delta / 10
        pause = false
    }
}
function render() { 
    ctx.fillStyle = "black";
    ctx.fillRect (0,0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.fillStyle = "blue";
    ctx.fillRect (P1.x,P1.y,paddle.width,paddle.height)
    ctx.fillStyle = "crimson"
    ctx.fillRect (P2.x,P2.y, paddle.width, paddle.height)

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
    ctx.fillText(P1.score, 20, 580 )
    ctx.fillText(P2.score, 1150, 580)
    if (pause) {
        ctx.fillText('Pause', canvas.width/2-30, canvas.height/2 - 10)
    }

}
window.onload = function () {
    var canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    addEventListener ("keydown", function (evt) {
        if (P_KEY == evt.keyCode) {
            pause = !pause
        } else {
            keysdown[evt.keyCode] = true;
        }
    }, false);
    addEventListener ("keyup", function (evt) {
        delete keysdown[evt.keyCode];
    },false)
    ball.image.onload = function() {game()}
    ball.image.src = "ball.png";
}