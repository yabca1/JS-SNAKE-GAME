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
let d="right";

// call our draw function every 100ms
let playGme=setInterval(draw,100);
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.fillStyle="#fff";
ctx.strokeStyle="red";
ctx.fillRect(snake[0].x,snake[0].y,scale,scale);
ctx.strokeRect(snake[0].x,snake[0].y,scale,scale);

//old head position
let snakeX= snake[0].x;
let snkaeY=snake[0].y;
console.log(snakeX);

//which direction
if(d=="left") snakeX-=scale;
if(d=="up") snakeY-=scale;
if(d=="right")snakeX+=scale;
if(d=="down")snakeY+=scale;
}