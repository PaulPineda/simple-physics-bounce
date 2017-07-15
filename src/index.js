// < SIDE EFFECTS
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

  requestAnimationFrame(frame);
}, false);

/**
 * Renders Ball instance to canvas context
 * @function frame
 * @param {HTMLElement} ctx   - canvas context
 * @param {object} ball       - Object instace of class Ball
 */
function drawBall(ctx, ball){
  //draw the circles
  ctx.beginPath();
  ctx.fillStyle = ball.col;
  ctx.fill();
  ctx.arc(ball.x, ball.y, ball.rad, 0, 2*Math.PI, true);
  ctx.fill();
}
// SIDE EFFECTS >


// Get reference to canvas and context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const BALL_POOL = new BallPool();


// Set up physics constants
const maxFps = 1/60;
const gravity = 9.8;
const friction = 0.7;
const defaultVx = 1000;
const defaultVy = 1000;

/**
 * Function that handles UPDATE and RENDER of rigidbodies within canvas.
 * It should be invoked by requestAnimationFrame only
 * @function frame
 * @param {number} previousTime - Result of performance.now() when invoked by requestAnimationFrame
 *
 */
function frame(previousTime){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const currentTime = performance.now();
  const deltaTime =  Math.min(maxFps, (currentTime - previousTime));

  // update the data for the Balls passing in deltaTime
  BALL_POOL.update(deltaTime, canvas);
  // render the updated values to canvas context
  BALL_POOL.render();

  requestAnimationFrame(frame);
}


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
BallPool.prototype.createBall = function(x, y){
  this.balls.push(new Ball(x, y));
};
/**
 * Updates the current state of the ball, specifically it's vector and position properties
 * @memberof BallPool
 * @param {number} dt             - deltaTime
 * @param {HTMLElement} canvas    - reference to the canvas element
 */
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
/**
 * Renders the state of each ball contained within this.balls array
 * @memberof BallPool
 */
BallPool.prototype.render = function(){
  this.balls.forEach(ball => drawBall(ctx,ball));
};

/**
 * Represent a rigidbody ball object
 * @constructor Ball
 * @param {number} x        - initial x value for ball
 * @param {number} y        - initial y value for ball
 * @property {string} col   - colour as string
 * @property {number} rad   - radius of the circle/ball
 * @property {number} x     - current x:position of ball
 * @property {number} y     - current y:position of ball
 * @property {number} vx    - vector x value -1 < x < 1
 * @property {number} vy    = vector y value -1 < y < 1
 */
function Ball(x, y){
  this.col = 'green';
  this.rad = 10;
  this.x = x;
  this.y = y;
  this.vx = randomVector(defaultVx);
  this.vy = randomVector(defaultVy);
}

/**
 * @function randomVector
 * @param {number} maxSpeed - max speed
* @returns a random number N, where -maxSpeed < N < maxSpeed
 */
function randomVector(maxSpeed){
  const rand = Math.random();
  const res = Math.random()*maxSpeed;
  return (rand < 0.5) ? -res:res;

}

/**
 * @function constrainCoord
 * @param {number} val - value to constrain
 * @param {number} min - min constrain limit
 * @param {number} max - max constrain limit
 * @returns {number} a value that has been constrained to the values between min and max
 */
function constrainCoord(val, min, max){
  return Math.max(min, Math.min(val, max));
}
