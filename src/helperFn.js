/**
 * @function randomVector
 * @param {number} maxSpeed - max speed
* @returns a random number N, where -maxSpeed < N < maxSpeed
 */
export function randomVector(maxSpeed){
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
export function constrainCoord(val, min, max){
  return Math.max(min, Math.min(val, max));
}
