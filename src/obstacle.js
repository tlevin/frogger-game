var Obstacle = function(top, left) {
  this.$obstacleNode = $('<div class="obstacle"></div>');
  this.top = top;
  this.left = left;
  this.centerTop = this.top + Math.round(this.$obstacleNode.width() / 2);
  this.centerLeft = this.left + Math.round(this.$obstacleNode.height()/2);
};
Obstacle.prototype.setPosition = function() {
  this.centerTop = this.top + Math.round(this.$obstacleNode.width() / 2);
  this.centerLeft = this.left + Math.round(this.$obstacleNode.height() / 2);
  var styleSettings = {
    top: this.top,
    left: this.left
  };
  this.$obstacleNode.css(styleSettings);
};