import {constrainCoord} from './helperFn.js';

/**
 * Class object that handles ball creation, updating and rendering
 * @class ObjectPool
 * @property {array} balls  - an array to hold creates ball objects
 */
function ObjectPool(objectConstructorFn){
  this.pool = [];
  this.constr = objectConstructorFn;
}

/**
 * creates a new instance of Ball and pushes it to the balls array
 * @memberof ObjectPool
 * @param {number} x             - initial x position of Ball
* @param {number} y              - initial y position of Ball
 */
ObjectPool.prototype.createBall = function(x, y, vx, vy, ctx){
  this.pool.push(new this.constr(x, y, vx, vy, ctx));
};
/**
 * Updates the current state of the ball, specifically it's vector and position properties
 * @memberof ObjectPool
 * @param {number} dt             - deltaTime
 * @param {HTMLElement} canvas    - reference to the canvas element
 */
ObjectPool.prototype.update = function(dt, canvas, gravity, friction){
  this.pool.forEach(item => {
    const maxX = canvas.width- item.rad;
    const maxY = canvas.height- item.rad;
    const futureX = item.x + item.vx * dt;
    const futureY = item.y + item.vy * dt;

    if((futureX < item.rad) || (futureX > maxX))
      item.vx = -item.vx * friction;

    if((futureY < item.rad) || (futureY > maxY))
      item.vy = -item.vy * friction;


    // add gravity
    item.vy += gravity;

    item.x += item.vx * dt;
    item.y += item.vy * dt;

    item.x = constrainCoord(item.x, 0, maxX);
    item.y = constrainCoord(item.y, 0, maxY);
  });
};
/**
 * Renders the state of each ball contained within this.pool array
 * @memberof ObjectPool
 */
ObjectPool.prototype.render = function(){
  this.pool.forEach(item => item.drawBall());
};

export default ObjectPool;
