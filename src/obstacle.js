var Obstacle = function(top, left) {
  this.$obstacleNode = $('<div class="obstacle"></div>');
  this.top = top;
  this.left = left;
};
Obstacle.prototype.setPosition = function() {
  var styleSettings = {
    top: this.top,
    left: this.left
  };
  this.$obstacleNode.css(styleSettings);
};