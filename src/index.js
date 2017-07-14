// ========================================
// SIDE EFFECTS (event listeners, rendering)
// =========================================


document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    if(e.target && e.target.nodeName === 'CANVAS'){
      BALL_POOL.createBall(e.offsetX, e.offsetY);

      if(BALL_POOL.balls)
        frame();
    }
  });
  document.body.addEventListener('touchEnd', e => {
    if(e.target && e.target.nodeName === 'CANVAS')
      BALL_POOL.createBall(e.offsetX, e.offsetY);
  });
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
const gravity = 9.8;
const friction = 0.9;
const BALL_POOL = new BallPool();

function frame(){
  ctx.clearRect(0,0,400,400);
  BALL_POOL.update();
  BALL_POOL.render();
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
    ball.x = ball.vx * dt;
    ball.y = ball.vy * dt;

    const overflowX = canvas.width - ball.x - ball.rad;
    const overflowY = canvas.height - ball.y - ball.rad;
    if(overflowY < 0){
      ball.y = canvas.height + overflowY;
      ball.vy = overflowY * friction;
    }
    if(ball.y < ball.rad){
      ball.y = -ball.y
      ball.vy =  ball.vy * friction;
    }
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
  this.vx = 0;
  this.vy = 1;
  console.log('NEW BALL V:',this.vx,this.vy);
}
