import Pool from './ObjectPool.js';
import Ball from './Ball.js';

// Get reference to canvas and context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const BALL_POOL = new Pool(Ball);

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
  BALL_POOL.update(deltaTime, canvas, gravity, friction);
  // render the updated values to canvas context
  BALL_POOL.render();

  requestAnimationFrame(frame);
}

// Assign event listeners when DOM has loaded
document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    if(e.target && e.target.nodeName === 'CANVAS'){
      BALL_POOL.add(new Ball(e.offsetX, e.offsetY, defaultVx, defaultVy, ctx));
    }
  });
  document.body.addEventListener('touchEnd', e => {
    if(e.target && e.target.nodeName === 'CANVAS')
      BALL_POOL.add(new Ball(e.offsetX, e.offsetY, defaultVx, defaultVy, ctx));
  });

  requestAnimationFrame(frame);
}, false);
