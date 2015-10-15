$(document).ready(function() {
  window.obstacles = [];
  window.frogger;
  window.frogWin = ['img/frogwin1.gif', 'img/frogwin2.gif', 'img/frogwin3.gif', 'img/frogwin4.gif'];

/*-----------------------CACHE THE DOM--------------------------------*/  
var $container = $('.container');
var $addRockButton = $('.addRock');
var $addVehicleButton = $('.addVehicle');
var $addFroggerButton = $('.addFrogger');
var vehicleSpeed = 8000;
var directionVehicle = function(){
  return Math.round(Math.random()) === 1 ? 'left' : 'right';
};
var leftStartPositions = [30, 75, 500, 55];
var rightStartPositions = [125,175,625, 650];
var showResult = function(){
   $('.resultWindow').show();
   for(var i = 0; i < obstacles.length; i++){
    obstacles[i].$obstacleNode.hide();
   $('.playAgain').show();
   $('.menubar').off();
  }
};

var gameOver = function(){
  showResult();
  $('.gameover.lose').show();
  $('.menubar').hide();
  frogger.$obstacleNode.addClass('spin');
  frogger.isAlive = false;
};
var gameWon = function(){
  showResult();
  $('.gameover.win').show();
  $('.frogWin').css({
    'background-image': 'url(' + frogWin[Math.floor(Math.random()*frogWin.length)] + ')'
  })
  frogger.hasWon = true;
};
var randomRockPosition = function() {
  var topOrBottom = Math.round(Math.random()) === 1 ? 1 : 0;
  //top condition
  if (topOrBottom) {
    return 200 * Math.random() + 40;
  } else {
    return 200 * Math.random() + 480;
  }
};

/*-------------------------------------------------------------------*/

/*--------------------Add Vehicle Instance--------------------------*/

  $addVehicleButton.on("click", function(event) {
    var obstacleMakerFunctionName = $(this).data("vehicle-maker-name");

    // get the maker function for the obstacle we are making
    var obstacleMakerFunction = window[obstacleMakerFunctionName];
    
    //initialize a new Rock with a random position
    var vehicle = new obstacleMakerFunction(
      $container.height() * Math.random(),
      $container.width()*Math.random(), vehicleSpeed, directionVehicle()
    );
    if(vehicle.direction === 'left'){
      vehicle.top = leftStartPositions[Math.floor(Math.random()*leftStartPositions.length)];

    } else {
      vehicle.$obstacleNode.addClass('flipCar');
      vehicle.top = rightStartPositions[Math.floor(Math.random()*rightStartPositions.length)];
    }

    //set vehicle's position
    vehicle.setPosition();

    //add Vehicle to window.obstacles array
    obstacles.push(vehicle);

    //append rock to the container
    $container.append(vehicle.$obstacleNode);
    vehicle.move();

    var resetInterval = setInterval(function(){
      if(vehicle.direction === 'left'){
        if(vehicle.$obstacleNode.css('left') === '-200px'){
          vehicle.resetPosition();
          vehicle.move();
        }
      } else {
        if(vehicle.$obstacleNode.css('left') === '1400px'){
          vehicle.resetPosition();
          vehicle.move();
        }
      }
    }, 300);

  });

/*-------------------------------------------------------------------*/ 

/*--------------------Add Rock Instance------------------------------*/  


  //add a rock to the page
  $addRockButton.on("click", function(event) {
    var obstacleMakerFunctionName = $(this).data("obstacle-maker-name");

    // get the maker function for the obstacle we are making
    var obstacleMakerFunction = window[obstacleMakerFunctionName];

    
    //initialize a new Rock with a random position
    var obstacle = new obstacleMakerFunction(
      randomRockPosition(),
      $container.width() * Math.random()
    );

    //set Rock's position
    obstacle.setPosition();
    obstacles.push(obstacle);
    //append rock to the container
    $container.append(obstacle.$obstacleNode);
  });


/*-------------------------------------------------------------------*/

/*--------------------Add Frogger------------------------------*/ 

  
  //initialize Frogger
 frogger = new Frogger(730, 600);

  //set Frogger's position
  frogger.setPosition();

  //append frogger to the container
  $container.append(frogger.$obstacleNode);


/*-------------------------------------------------------------------*/
/*--------------------Frogger Movement ------------------------------*/

  $('body').keydown(function(event){
    if (frogger.isAlive && !frogger.hasWon) {
      if(event.which === 37 ){
        frogger.move('left');
      } else if (event.which === 38){
        frogger.move('up');
      } else if(event.which === 39){
        frogger.move('right');
      } else if(event.which === 40){
        frogger.move('down');
      }

      if((frogger.top < 480 && frogger.left < 255 && frogger.top > 240) ||
        (frogger.top < 480 && frogger.top > 240 && frogger.left < 735 && frogger.left > 345) ||
        (frogger.top < 480 && frogger.top > 240 && frogger.left > 825)) {
        gameOver();
      }

      if(frogger.top < 10 && !frogger.hasWon){
        gameWon();
      }
    }
  });


/*-------------------------------------------------------------------*/

/*--------------------Check Collisions ------------------------------*/

  window.checkDistance = function(top, left){
    var a = Math.abs(top-frogger.centerTop);
    var b = Math.abs(left-frogger.centerLeft);
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
  };

  var collisionInterval = setInterval(function() {
    for(var i = 0; i < obstacles.length; i++){
        var topObstacle = +obstacles[i].$obstacleNode.css('top').slice(0,-2);
        var leftObstacle = +obstacles[i].$obstacleNode.css('left').slice(0,-2);
        var distance = checkDistance(topObstacle + 30, leftObstacle + 20);

        if(distance < 30){
          gameOver();
        }
      }
  }, 30);


/*-------------------------------------------------------------------*/



});