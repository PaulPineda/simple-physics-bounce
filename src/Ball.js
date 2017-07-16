import {randomVector} from './helperFn.js';

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
Ball.prototype.drawBall = function(){
  this.ctx.beginPath();
  this.ctx.fillStyle = this.col;
  this.ctx.fill();
  this.ctx.arc(this.x, this.y, this.rad, 0, 2*Math.PI, true);
  this.ctx.fill();
};

export default Ball;
