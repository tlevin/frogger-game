describe("Obstacle", function() {
  var obstacleTest;

  beforeEach(function() {
    obstacleTest = new Obstacle(0,0);
  });

  it("should have a jQuery $obstacleNode object", function() {
    expect(obstacleTest.$obstacleNode).to.be.an.instanceof(jQuery);
  });

  it("should have a method setPosition", function() {
    expect(obstacleTest.setPosition).to.be.a('function');
  });

  it("should set CSS to top and left arguments in setPosition", function() {
    obstacleTest.setPosition();
    expect(obstacleTest.$obstacleNode.css('top')).to.be.equal('0px');
    expect(obstacleTest.$obstacleNode.css('left')).to.be.equal('0px');
  });
});

describe("Frogger", function() {

  var frogger;

  beforeEach(function() {
    frogger = new Frogger(0,0);
  });

  it("should have a jQuery $obstacleNode object", function() {
    expect(frogger.$obstacleNode).to.be.an.instanceof(jQuery);
  });

  // it("should be a subclass of Obstacle", function() {
  //   expect(frogger.__proto__.__proto__).to.be.an.instanceof(Obstacle);
  // });

  it("should have a move function that makes it move left, right, up, and down", function() {
    frogger.move('down');
    frogger.move('right');
    frogger.move('up');
    frogger.move('left');
    expect(frogger.top).to.be.equal(0);
    expect(frogger.left).to.be.equal(0);
  });

  it('should inherit the set position method from Obstacle', function(){
    expect(frogger.setPosition).to.be.a('function');
  });

});

describe("Vehicle", function() {

  var vehicleTest;

  beforeEach(function() {
    vehicleTest = new Vehicle(0,0,0, 'left');
  });
  
  it('should have a jQuery $obstacleNode object', function() {
    expect(vehicleTest.$obstacleNode).to.be.an.instanceof(jQuery);
  });

  it('should have a direction that can be referenced', function() {
    expect(vehicleTest.direction).to.be.equal('left');
  });

  it('should have a reset Position function', function(){
    expect(vehicleTest.resetPosition).to.be.a('function');
  });

  it('should reset vehicle position when resetPosition called', function(){
    vehicleTest.resetPosition();
    expect(vehicleTest.$obstacleNode.css('left')).to.be.equal('1400px');
  });
});

describe('Rock', function() {
  var rockTest;

  beforeEach(function() {
    rockTest = new RockObstacle(0,0);
  });

  it('should have a jQuery $obstacleNode object', function() {
    expect(rockTest.$obstacleNode).to.be.an.instanceof(jQuery);
  });
});