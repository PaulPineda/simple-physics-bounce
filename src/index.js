// ========================================
// SIDE EFFECTS (event listeners, rendering)
// =========================================


document.addEventListener('DOMContentLoaded', () => {
  // SET UP EVENT HANDLERS
  document.body.addEventListener('click', e => {
    if(e.target && e.target.nodeName === 'CANVAS'){
      BALL_POOL.createBall(e.offsetX, e.offsetY);
    }
  });

  document.body.addEventListener('touchEnd', e => {
    if(e.target && e.target.nodeName === 'CANVAS')
      BALL_POOL.createBall(e.offsetX, e.offsetY);
  });

  // START requestAnimationFrame LOOP
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
// GET CANVAS CONTEXT TO DRAW ONTO
// ==================================

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// ============================================
// UPDATE THE CANVAS WITH requestAnimationFrame
// ============================================
let previousTime = performance.now();
const maxFps = 1/60;

const gravity = 9.8;
const friction = 0.9;
const BALL_POOL = new BallPool();



function frame(previousTime){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const currentTime = performance.now();
  const deltaTime =  Math.min(maxFps, (currentTime - previousTime) / 1000);

  // update the data for the Balls passing in deltaTime
  BALL_POOL.update(deltaTime, canvas);
  // render the updated values to canvas context
  BALL_POOL.render();


  requestAnimationFrame(frame);
}


// ==============================================================
// BALL POOL IS AN OBJECT THAT CONTAINS AN ARRAY OF CREATED BALLS
// ==============================================================

function BallPool(){
  this.balls = [];
}
BallPool.prototype.createBall = function(x, y){
  this.balls.push(new Ball(x, y));
};
BallPool.prototype.update = function(dt, canvas){
  this.balls.forEach(ball => {
    const maxX = canvas.width- ball.rad;
    const maxY = canvas.height- ball.rad;
    const futureX = ball.x + ball.vx * dt;
    const futureY = ball.y + ball.vy * dt;

    if((futureX < ball.rad) || (futureX > maxX))
      ball.vx = -ball.vx * friction;

    if((futureY < ball.rad) || (futureY > maxY))
      ball.vy = -ball.vy * friction;


    // add gravity
    ball.vy += gravity;

    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;

    ball.x = constrainCoord(ball.x, 0, maxX);
    ball.y = constrainCoord(ball.y, 0, maxY);
  });
};
BallPool.prototype.render = function(){
  this.balls.forEach(ball => drawBall(ctx,ball));
};

// ==============================================================
// BALL CLASS
// ==============================================================
function Ball(x, y){
  this.col = 'green';
  this.rad = 10;
  this.x = x;
  this.y = y;
  this.vx = randomVector(100);
  this.vy = randomVector(500);
}


// ==============================================================
// HELPER FUNCTIONS
// ==============================================================
function randomVector(maxSpeed){
  const rand = Math.random();
  const res = Math.random()*maxSpeed;
  return (rand < 0.5) ? -res:res;

}

function constrainCoord(val, min, max){
  return Math.max(min, Math.min(val, max));
}
