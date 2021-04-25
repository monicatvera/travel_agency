// load images

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/plane1.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

//gameover


// some variables

var gap = 85;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;
var gameOver = false;
// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// pipe coordinates
var pipe = [];

var cvs;
var ctx;
var divGame;

window.onload = initialize;

function initialize() {
    cvs = document.getElementById("canvas");
    divGame = document.getElementById("div-game");
    ctx = cvs.getContext("2d");
    ctx.drawImage(bg, 0, 0);
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Empezamos?", cvs.width / 2, 100);
    pipe[0] = { x: cvs.width, y: 0 };
    document.addEventListener("mouseenter", mouse);
    document.addEventListener('keypress', function (e) {
        if (e.key === 'f') {
            obj = document.getElementById('div-game');
            obj.style.backgroundColor = (obj.style.backgroundColor == 'rgb(0, 0, 0)') ? 'transparent' : '#000000';
        }
    });

}

   function mouse(){
    ctx.font = "14px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Haz click para iniciar el juego", cvs.width / 2, 300);
    document.addEventListener("click", draw);
   }

function moveUp() {
    if(gameOver==false){
    bY -= 25;
    fly.play();
    }
}
// draw images

function draw() {
    ctx.drawImage(bg, 0, 0);
  

    for (var i = 0; i < pipe.length; i++) {

        constant = pipeNorth.height + gap;
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

        pipe[i].x--;

        if (pipe[i].x == 125 && gameOver == false) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }



        // detect collision

        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) || bY + bird.height >= cvs.height - fg.height) {
            //location.reload(); // reload the page
            //setState("game over");
            gameOver=true;
            displayGameOver();

        } else if (pipe[i].x == 5) {
            score++;
            scor.play();
            
        }
       
    }



    ctx.drawImage(fg, 0, cvs.height - fg.height);

    ctx.drawImage(bird, bX, bY);

    bY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + score, 100, cvs.height - 80);
    requestAnimationFrame(draw);
    document.addEventListener("keydown", moveUp);
}

function displayGameOver() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", cvs.width / 2, 100);
    ctx.fillText("Score: " + score, cvs.width / 2, 150);
    ctx.font = "16px Arial";
    ctx.fillText("Haz cliz, para empezar de nuevo", cvs.width / 2, 300);
    document.addEventListener("click", restart);
}

function restart() {
    location.reload();
}