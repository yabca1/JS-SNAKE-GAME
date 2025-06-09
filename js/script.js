const canvas=document.querySelector(".canvas");
const ctx= canvas.getContext("2d");


console.log(ctx);
//to be able control the movt of our snake in a control way
// lets devide our canvas into 10 by 10 small squares
const scale=20;
const rows= canvas.height/scale;
const columns= canvas.width/ scale;

let score=0;

//lets build the snake 
let snake=[];
snake[0]={
 x:(Math.floor(Math.random()*columns))*scale,
 y:(Math.floor(Math.random()*columns))*scale   
}

//create the food object

let food={
    x:(Math.floor(Math.random()*columns))*scale,
    y:(Math.floor(Math.random()*columns))*scale  
}
//event for changing the direction
let d="right";

document.onkeydown = direction;
function direction(event){
    let key = event.keyCode;
    if(key==37 && d != "right" ){
        d="left";
    }else if (key==38 && d!="down"){
        d="up";
    }else if (key==39 && d!="left"){
        d="right";
    }else if(key==40 && d!="up"){
        d="down";
    }
}


// call our draw function every 100ms
let playGme=setInterval(draw,100);

//pause 

let isPaused = false;

document.getElementById("pause").onclick = function () {
    if (!isPaused) {
        clearInterval(playGme);
        this.textContent = "Resume";
        isPaused = true;
    } else {
        playGme = setInterval(draw, 100);
        this.textContent = "Pause";
        isPaused = false;
    }
};

function draw(){
    //add tail fade effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
ctx.fillRect(0, 0, canvas.width, canvas.height);

  for(let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "red";
    ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
    ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);

    // displaying the score
ctx.fillStyle = "white";
ctx.font = "20px Arial";
ctx.fillText("Score: " + score, 20, 20);


    // 🧠 Add this block INSIDE the loop, AFTER drawing the first segment
    if (i === 0) {
        ctx.fillStyle = "black"; // eye color
        const eyeSize = 3;

        let eye1X, eye1Y, eye2X, eye2Y;

        // Set eye positions based on direction
        switch (d) {
            case "right":
                eye1X = snake[i].x + 14;
                eye2X = snake[i].x + 14;
                eye1Y = snake[i].y + 4;
                eye2Y = snake[i].y + 12;
                break;
            case "left":
                eye1X = snake[i].x + 3;
                eye2X = snake[i].x + 3;
                eye1Y = snake[i].y + 4;
                eye2Y = snake[i].y + 12;
                break;
            case "up":
                eye1X = snake[i].x + 4;
                eye2X = snake[i].x + 12;
                eye1Y = snake[i].y + 3;
                eye2Y = snake[i].y + 3;
                break;
            case "down":
                eye1X = snake[i].x + 4;
                eye2X = snake[i].x + 12;
                eye1Y = snake[i].y + 14;
                eye2Y = snake[i].y + 14;
                break;
        }

        ctx.fillRect(eye1X, eye1Y, eyeSize, eyeSize);
        ctx.fillRect(eye2X, eye2Y, eyeSize, eyeSize);
    }
}


//draw food
ctx.fillStyle="#fff";
ctx.strokeStyle="yellow";
ctx.fillRect(food.x,food.y,scale,scale);
ctx.fillRect(food.x,food.y,scale,scale);

//old head position
let snakeX= snake[0].x;
let snakeY=snake[0].y;
console.log(snakeX);

//which direction
if(d=="left") snakeX-=scale;
if(d=="up") snakeY-=scale;
if(d=="right")snakeX+=scale;
if(d=="down")snakeY+=scale;

if(snakeX > canvas.width){
    snakeX=0;
}
if(snakeY > canvas.width){
    snakeY=0;
}
if(snakeX < 0){
    snakeX=canvas.width;
}
if(snakeY < 0){
    snakeY=canvas.width;
}

//if the snakes eats the food it grows

if(snakeX==food.x && snakeY==food.y){
    score++;
    //for new food position
    food={
        x:(Math.floor(Math.random()*columns))*scale,
        y:(Math.floor(Math.random()*rows))*scale
    }
    //we dont remove the tail   
}else{
    //remove the tail
    snake.pop();
}

//new head position
let newHead={
    x: snakeX,
    y: snakeY
}
if (eatSelf(newHead, snake)) {
    clearInterval(playGme);
    // Display "Game Over"
    ctx.fillStyle = "red";
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    document.getElementById("pause").style.display = "none";


    // Show HTML message and restart button
    document.getElementById("status").style.display = "block";
    document.getElementById("restart").style.display = "inline";
    document.getElementById("pause").style.display = "inline";
document.getElementById("pause").textContent = "Pause";
isPaused = false;

    return; // Exit the draw function
}



snake.unshift(newHead);
}

//check if snake is eating itself
function eatSelf(head,array){
    for(let i=0;  i<array.length; i++){
        if(head.x==array[i].x && head.y==array[i].y){
            return true;
        }
    }
    return false;
}
document.getElementById("restart").onclick = function() {
    // Reset game state
    snake = [{
        x:(Math.floor(Math.random()*columns))*scale,
        y:(Math.floor(Math.random()*rows))*scale
    }];
    food = {
        x:(Math.floor(Math.random()*columns))*scale,
        y:(Math.floor(Math.random()*rows))*scale
    };
    d = "right";
    score = 0;

    document.getElementById("status").style.display = "none";
    document.getElementById("restart").style.display = "none";

    clearInterval(playGme);
    playGme = setInterval(draw, 100);
};
