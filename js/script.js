const canvas=document.querySelector(".canvas");
const ctx= canvas.getContext("2d");


console.log(ctx);
//to be able control the movt of our snake in a control way
// lets devide our canvas into 10 by 10 small squares
const scale=20;
const rows= canvas.height/scale;
const columns= canvas.width/ scale;

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
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0; i<snake.length; i++){
ctx.fillStyle="#fff";
ctx.strokeStyle="red";
ctx.fillRect(snake[i].x,snake[i].y,scale,scale);
ctx.strokeRect(snake[i].x,snake[i].y,scale,scale);
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
let score=0;
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

snake.unshift(newHead);
}

