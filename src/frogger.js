/*------------------------------------FROGGER SUBCLASS-------------------------------------*/
var Frogger = function(top, left) {
  Obstacle.call(this, top, left);
  this.$obstacleNode.addClass('frogger');
  this.left = left;
  this.top = top;
  this.isAlive = true;
  this.hasWon = false;
  this.canStart = false;
};

Frogger.prototype = Object.create(Obstacle.prototype);
Frogger.prototype.constructor = Frogger;

Frogger.prototype.move = function(direction) {
  if (direction === 'up') {
    this.top -= 15;
    this.setPosition();
  } else if (direction === 'left') {
    this.left -= 15;
    this.setPosition();
  } else if (direction === 'right') {
    this.left += 15;
    this.setPosition();
  } else if (direction === 'down') {
    this.top += 15;
    this.setPosition();
  }
};