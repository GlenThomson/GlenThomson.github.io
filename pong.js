const canvas = document.getElementById("pongBoard");
const context = canvas.getContext("2d");

class Ball {
    constructor() {
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.radius = 10;
        this.color = "white";
        this.speedX = 5;
        this.speedY = 5;
    }
    draw() {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        context.closePath();
        context.fill();
    }

}

let ball = new Ball();
startGame()




function startGame(){
    update()
}

function update(){
    drawBoard();
    drawText();
    ball.draw();
}

function drawText() {
    context.font = "10px Arial";
    context.fillStyle = "white";
    context.fillText("Pong",100,100);
    
}




function drawBoard(){
    context.fillStyle = "black";
    context.fillRect(0,0,canvas.width,canvas.height);
}







