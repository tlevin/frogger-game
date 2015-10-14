var Vehicle = function(top, left, speed, direction){
  Obstacle.call(this, top, left);
  this.speed = speed;
  this.direction = direction;
  this.$obstacleNode.addClass('vehicle');
};
Vehicle.prototype = Object.create(Obstacle.prototype);
Vehicle.prototype.constructor = Vehicle;

Vehicle.prototype.move = function(toTop, toLeft){  
    $(this.$obstacleNode).animate({'left': '-200px'}, this.speed);
  
};
Vehicle.prototype.resetPosition = function(){
  $(this.$obstacleNode).css({'left': '1400px'});
}