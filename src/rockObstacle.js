var RockObstacle = function(top, left) {
  Obstacle.call(this, top, left);
};

RockObstacle.prototype = Object.create(Obstacle.prototype);
RockObstacle.prototype.constructor = RockObstacle;