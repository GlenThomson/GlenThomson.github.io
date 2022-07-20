const canvas = document.getElementById("pongBoard");
const context = canvas.getContext("2d");
const frameRate = 220;
let playerScore = 0;
let computerScore = 0;
var hit_sound1 = new Audio('sounds/hit_sound1.wav');
var lose_sound = new Audio('sounds/lose_sound.mp3');
var hit_sound2 = new Audio('sounds/hit_sound2.wav');
var scored_sound = new Audio('sounds/scored_sound.wav');



class Player{
    constructor(x, y, color,speedY){
        this.x = x;
        this.y = y;
        this.width = canvas.width/100;
        this.height = canvas.height/6;
        this.color = color;
        this.speedY = speedY;
        this.playerMoving = false;
        this.direction = "";
    }
    draw(){
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    move(direction){
        if(direction == "up" && this.y > 0){
            this.y -= this.speedY;
        }
        if(direction == "down" && this.y<= canvas.height -this.height){
            this.y += this.speedY;
        }
        
    }
}

class Ball {
    constructor() {
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.radius = 12;
        this.color = "white";
        this.speedX = 1;
        this.speedY = 1;
        this.timeSicneLastHit = 0;
    }
    draw() {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        context.closePath();
        context.fill();
    }
    move() {
        this.x += this.speedX;
        this.y += this.speedY;
        if ((this.y + this.radius > canvas.height || this.y - this.radius < 0)&&ball.timeSicneLastHit >5) {
            this.speedY *= -1;
            hit_sound2.play();
            ball.timeSicneLastHit += 0;
        }
    }
    resetBall() {
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        
        this.speedX = 1;
        this.speedY = 1;

    }
}

function startGame(){
    update()
}

function drawText() {
    context.font = "20px Arial";
    context.fillStyle = "white";
    context.fillText("Player Score "+playerScore+"            Pong           "+"Computer Score " +computerScore,180,30);
}


function drawBoard(){
    context.fillStyle = "black";
    context.fillRect(0,0,canvas.width,canvas.height);
}


function update(){
    //draweverything on the canvas
    drawBoard();
    drawText();
    ball.draw();
    player1.draw();
    player2.draw();

    //move the ball
    ball.move()
    //check if the ball has hit the goal
    checkGoal();

    //check if the ball has hit the paddle
    checkPaddleHit(player1);
    checkPaddleHit(player2);

    //check for player key presses
    window.addEventListener("keydown", eventHandler); 
    window.addEventListener("keyup", eventHandler); 
    //if key is still down then move the player paddle  
    player1.move(player1.direction);
    
    //move computer paddle
    computerPaddleMovement();

    //add to time since last hit for ball
    ball.timeSicneLastHit += 1;
}

function computerPaddleMovement(){
    if(ball.y-player2.height/2 < player2.y){
        player2.move("up");
    }
    else if(ball.y -player2.height/2> player2.y){ 
        player2.move("down");
    }
}


function checkGoal(){
    if(ball.x + ball.radius > canvas.width){
        playerScore++;
        ball.resetBall();
        scored_sound.play();
    }
    if(ball.x - ball.radius < 0){
        computerScore++;
        lose_sound.play();
        ball.resetBall();
    }
}

function checkPaddleHit(Player){
    let half_paddle_height = Player.height/2;
    if(ball.x + ball.radius > Player.x && ball.x - ball.radius < Player.x + Player.width && ball.y + ball.radius > Player.y && ball.y - ball.radius < Player.y + Player.height && ball.timeSicneLastHit > 5){
        ball.timeSicneLastHit += 0;
        if(ball.x < canvas.width/2){//if the ball hit player 
            if(ball.y > Player.y + half_paddle_height){
                ball.speedY += (ball.y - Player.y -half_paddle_height)/half_paddle_height;
            }
            else{
                ball.speedY -= (ball.y - Player.y)/half_paddle_height;
            }
        }
        else{ // if the ball hit the computer paddle 

        }
        //checks to makes sure ball isnt moving to fast in y direction 
        if(Math.abs(ball.speedY) > Math.abs(ball.speedX)){
            ball.speedY = Math.abs(ball.speedX) * Math.sign(ball.speedY);
        }
        ball.speedX *= -1.05;
        hit_sound1.play();
        
    }
}


function eventHandler(event){
    if(event.type == "keydown" && event.keyCode == 38){
        player1.playerMoving = true;
        player1.direction = "up";
    }
    else if(event.type == "keydown" && event.keyCode == 40){
        player1.playerMoving = true;
        player1.direction = "down";
    }
    else if(event.type == "keyup" && event.keyCode == 38){
        player1.playerMoving = false;
        player1.direction = "";

    }
    else if(event.type == "keyup" && event.keyCode == 40){
        player1.playerMoving = false;
        player1.direction = "";
    }
}



let ball = new Ball();
let player1 = new Player(0, canvas.height/2, "green", 2);
let player2 = new Player(canvas.width-player1.width, canvas.height/2, "purple",1.8);
startGame()
setInterval(update,1000/frameRate);






