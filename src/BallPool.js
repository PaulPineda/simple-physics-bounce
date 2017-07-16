import {constrainCoord} from './helperFn.js';
import Ball from './Ball.js';
/**
 * Class object that handles ball creation, updating and rendering
 * @class BallPool
 * @property {array} balls  - an array to hold creates ball objects
 */
function BallPool(){
  this.balls = [];
}

/**
 * creates a new instance of Ball and pushes it to the balls array
 * @memberof BallPool
 * @param {number} x             - initial x position of Ball
* @param {number} y              - initial y position of Ball
 */
BallPool.prototype.createBall = function(x, y, vx, vy, ctx){
  this.balls.push(new Ball(x, y, vx, vy, ctx));
};
/**
 * Updates the current state of the ball, specifically it's vector and position properties
 * @memberof BallPool
 * @param {number} dt             - deltaTime
 * @param {HTMLElement} canvas    - reference to the canvas element
 */
BallPool.prototype.update = function(dt, canvas, gravity, friction){
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
/**
 * Renders the state of each ball contained within this.balls array
 * @memberof BallPool
 */
BallPool.prototype.render = function(){
  this.balls.forEach(ball => ball.drawBall());
};

export default BallPool;
