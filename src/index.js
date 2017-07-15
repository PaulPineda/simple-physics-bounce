// ========================================
// SIDE EFFECTS (event listeners, rendering)
// =========================================


document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    if(e.target && e.target.nodeName === 'CANVAS'){
      BALL_POOL.createBall(e.offsetX, e.offsetY);
    }
  });
  document.body.addEventListener('touchEnd', e => {
    if(e.target && e.target.nodeName === 'CANVAS')
      BALL_POOL.createBall(e.offsetX, e.offsetY);
  });
  frame();
}, false);

function drawBall(ctx, ball){
  //draw the circles
  ctx.beginPath();
  ctx.fillStyle = ball.col;
  ctx.fill();
  ctx.arc(ball.x, ball.y, ball.rad, 0, 2*Math.PI, true);
  ctx.fill();
}

// ==================================
// CREATE CANVAS CONTEXT TO DRAW ONTO
// ==================================

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// ============================================
// UPDATE THE CANVAS WITH requestAnimationFrame
// ============================================
let previousTime = performance.now();
const maxFps = 1/60;

const gravity = 9.8*maxFps;
const friction = 0.9;
const BALL_POOL = new BallPool();



function frame(){
  // work out the time elapsed
  const currentTime = performance.now();
  const deltaTime =  Math.min(maxFps, (currentTime - previousTime) / 1000);

  //console.log(deltaTime);

  ctx.clearRect(0,0,canvas.width,canvas.height);
  BALL_POOL.update(deltaTime);
  BALL_POOL.render();

  previousTime = currentTime;
  requestAnimationFrame(frame);
}


// ============
// BALL CLASSES
// ============

function BallPool(){
  this.balls = [];
}
BallPool.prototype.createBall = function(x, y){
  this.balls.push(new Ball(x, y));
};
BallPool.prototype.update = function(dt){
  this.balls.forEach(ball => {
    const maxX = canvas.width- ball.rad;
    const maxY = canvas.height- ball.rad;
    const futureX = ball.x + ball.vx;
    const futureY = ball.y + ball.vy;

    if((futureX < ball.rad) || (futureX > maxX))
      ball.vx = -ball.vx * friction;

    if((futureY < ball.rad) || (futureY > maxY))
      ball.vy = -ball.vy * friction;


    // add gravity
    ball.vy += gravity;

    ball.x += ball.vx;
    ball.y += ball.vy;

    ball.x = constrainCoord(ball.x, 0, maxX);
    ball.y = constrainCoord(ball.y, 0, maxY);
  });
};
BallPool.prototype.render = function(){
  this.balls.forEach(ball => drawBall(ctx,ball));
};

function Ball(x, y){
  this.col = 'green';
  this.rad = 10;
  this.x = x;
  this.y = y;
  this.vx = randomVector();
  this.vy = randomVector();
}

function randomVector(){
  var rand = Math.random();
  return (rand < 0.5) ? -Math.random():Math.random();

}

function constrainCoord(val, min, max){
  return Math.max(min, Math.min(val, max));
}
