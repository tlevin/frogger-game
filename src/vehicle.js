/*------------------------------------VEHICLE SUBCLASS-------------------------------------*/
var Vehicle = function(top, left, speed, direction){
  Obstacle.call(this, top, left);
  this.speed = speed;
  this.direction = direction;
  this.$obstacleNode.addClass('vehicle');
};

Vehicle.prototype = Object.create(Obstacle.prototype);
Vehicle.prototype.constructor = Vehicle;

Vehicle.prototype.move = function(toTop, toLeft){ 
  if(this.direction === 'left'){
    $(this.$obstacleNode).animate({'left': '-200px'}, this.speed);
  } else {
    $(this.$obstacleNode).animate({'left': '1400px'}, this.speed);
  }  
};

Vehicle.prototype.resetPosition = function(){
  if(this.direction === 'left'){
    $(this.$obstacleNode).css({'left': '1400px'});
  } else {
    $(this.$obstacleNode).css({'left': '-200px'});
  }
};