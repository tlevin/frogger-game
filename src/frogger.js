var Frogger = function(top, left) {
  Obstacle.call(this, top, left);
  this.$obstacleNode.addClass('frogger');
};

Frogger.prototype = Object.create(Obstacle.prototype);
Frogger.prototype.constructor = Frogger;

Frogger.prototype.move = function(direction) {
  if (direction === 'up') {
    this.top -= 20;
    this.setPosition();
  } else if (direction === 'left') {
    this.left -= 20;
    this.setPosition();
  } else if (direction === 'right') {
    this.left += 20;
    this.setPosition();
  } else if (direction === 'down') {
    this.top += 20;
    this.setPosition();
  }
};