// ========================================
// SIDE EFFECTS (event listeners, rendering)
// =========================================

const BPool = new BallPool();

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    if(e.target && e.target.nodeName === 'CANVAS'){
      BPool.createBall({x:e.offsetX, y:e.offsetY});
      BPool.render();
    }
  });
  document.body.addEventListener('touchEnd', e => {
    if(e.target && e.target.nodeName === 'CANVAS')
      BPool.createBall({x:e.offsetX, y:e.offsetY});
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
const BALL_POOL = new BallPool();

function frame(){



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
BallPool.prototype.render = function(){
  this.balls.forEach(ball => drawBall(ctx,ball));
};
BallPool.prototype.update = function(){
  this.balls.forEach(ball => {
    ball.x += ball.vx;
    ball.y += ball.vy;
  });
};

function Ball(x, y){
  this.col = 'green';
  this.rad = 10;
  this.x = x;
  this.y = y;
}
