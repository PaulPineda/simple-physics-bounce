# Simple physics engine

This is a simple demo of rigidbody physics.

Clicking within the dotted bordered canvas area creates a ball object that bounces within the dotted border until it comes to rest.

---

### Testing:
This is just a regular npm package so once cloned, run:

`npm install && npm run dev`

### Minification:
Once cloned and the dependencies have been installed you can create a minified version by running:
`npm run build`

---

### The following values can be adjusted to create different environments:

**defaultVx/defaultVy**
_(Default for both is 1000)_
These represent the x and y speed range used as the initial values (the defaults for both are 1000)

**maxFps**
_(Default: 1/60)_
The maximum elapsed time used to calculate the updated Ball position

**gravity**
_Default: 9.8_
The value for gravity

**friction**
_Default: 0.7_
The value used to reduce the speed of the rigid body when it bounces off the canvas borders
