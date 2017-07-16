import { randomVector, constrainCoord } from './helperFn.js';

/**
 * Represent a rigidbody ball object
 * @constructor Ball
 * @param {number} x            - initial x value for ball
 * @param {number} y            - initial y value for ball
 * @param {number} vx           - vector x value -1 < x < 1
 * @param {number} vy           - vector y value -1 < y < 1
 * @param {HTMLElement} ctx     - Canvas context
 * @property {string} col       - colour as string
 * @property {number} rad       - radius of the circle/ball
 * @property {number} x         - current x:position of ball
 * @property {number} y         - current y:position of ball
 */
function Ball(x, y, vx, vy, ctx){
  this.col = 'green';
  this.rad = 10;
  this.x = x;
  this.y = y;
  this.vx = randomVector(vx);
  this.vy = randomVector(vy);
  this.ctx = ctx;
}

/**
 * Renders Ball instance to canvas context
 * @function frame
 */
Ball.prototype.update = function(dt, canvas, gravity, friction){
  const maxX = canvas.width- this.rad;
  const maxY = canvas.height- this.rad;
  const futureX = this.x + this.vx * dt;
  const futureY = this.y + this.vy * dt;

  if((futureX < this.rad) || (futureX > maxX))
    this.vx = -this.vx * friction;

  if((futureY < this.rad) || (futureY > maxY))
    this.vy = -this.vy * friction;


  // add gravity
  this.vy += gravity;

  this.x += this.vx * dt;
  this.y += this.vy * dt;

  this.x = constrainCoord(this.x, 0, maxX);
  this.y = constrainCoord(this.y, 0, maxY);
};

/**
 * Renders Ball instance to canvas context
 * @function frame
 */
Ball.prototype.render = function(){
  this.ctx.beginPath();
  this.ctx.fillStyle = this.col;
  this.ctx.fill();
  this.ctx.arc(this.x, this.y, this.rad, 0, 2*Math.PI, true);
  this.ctx.fill();
};

export default Ball;
