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
ctx.fillStyle="#fff";
ctx.strokeStyle="red";
ctx.fillRect(snake[0].x,snake[0].y,scale,scale);
ctx.strokeRect(snake[0].x,snake[0].y,scale,scale);