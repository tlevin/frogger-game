var Vehicle = function(top, left, speed, direction){
  Obstacle.call(this, top, left);
  this.speed = speed;
  this.direction = direction;
};
Vehicle.prototype = Object.create(Obstacle.prototype);
Vehicle.prototype.constructor = Vehicle;

Vehicle.prototype.move = function(toTop, toLeft){
  //jquery animate change in this.top/this.left to toTop and toLeft
};
Vehicle.prototype.resetPosition = function(startTop, startLeft){
  //check which direction
    //check when at end of container
    //if so, reset left and set random top
}