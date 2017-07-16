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
 * adds a new instance of item to pool
 * @memberof ObjectPool
 * @param {item} x             - item object to store in pool
 */
ObjectPool.prototype.add = function(item){
  this.pool.push(item);
};
/**
 * Iterates through this.pool, calls a method 'update' on each item applying any passed args
 * @memberof ObjectPool
 */
ObjectPool.prototype.update = function(){
  // any arguments after 1st will be considered as params for callback
  var args = [].slice.call(arguments, 0);

  this.pool.forEach(item => {

    item.update.apply(item, args);

  });
};
/**
 * Renders the state of each ball contained within this.pool array
 * @memberof ObjectPool
 */
ObjectPool.prototype.render = function(){
  this.pool.forEach(item => item.render());
};

export default ObjectPool;
