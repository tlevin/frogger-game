/*------------------------------------ROCK SUBCLASS-------------------------------------*/
var RockObstacle = function(top, left) {
  Obstacle.call(this, top, left);
  this.$obstacleNode.addClass('rock');
};

RockObstacle.prototype = Object.create(Obstacle.prototype);
RockObstacle.prototype.constructor = RockObstacle;
