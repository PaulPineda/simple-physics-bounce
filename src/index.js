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

// ============
// BALL CLASSES
// ============

function BallPool(id){
  this.id = id;
  this.balls = [];
}
BallPool.prototype.createBall = function(vector2){
  this.balls.push(new Ball(vector2));
};
BallPool.prototype.render = function(){
  this.balls.forEach(ball => drawBall(ctx,ball));
};

function Ball(origin){
  this.col = 'green';
  this.rad = 10;
  this.x = origin.x;
  this.y = origin.y;
}
