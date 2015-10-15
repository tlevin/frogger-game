$(document).ready(function() {
  window.obstacles = [];
  window.frogger;

/*-----------------------CACHE THE DOM--------------------------------*/  
var $container = $('.container');
var $addRockButton = $('.addRock');
var $addVehicleButton = $('.addVehicle');
var $addFroggerButton = $('.addFrogger');
var vehicleSpeed = 8000
var directionVehicle = function(){
  return Math.round(Math.random()) === 1 ? 'left' : 'right';
}
var leftStartPositions = [30, 75, 500, 55];
var rightStartPositions = [125,175,625, 650];

/*-------------------------------------------------------------------*/  

/*--------------------Add Vehicle Instance--------------------------*/  

  $addVehicleButton.on("click", function(event) {
    var obstacleMakerFunctionName = $(this).data("vehicle-maker-name");

    // get the maker function for the obstacle we are making
    var obstacleMakerFunction = window[obstacleMakerFunctionName];
    
    //initialize a new Rock with a random position
    var vehicle = new obstacleMakerFunction(
      $container.height() * Math.random(),
      $container.width(), vehicleSpeed, directionVehicle()
    );
    if(vehicle.direction === 'left'){
      vehicle.top = leftStartPositions[Math.floor(Math.random()*leftStartPositions.length)];

    } else {
      vehicle.$obstacleNode.addClass('flipCar')
      vehicle.left = -200;
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
      $container.height() * Math.random(),
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
  
  //add Frogger to the page
  $addFroggerButton.on("click", function(event) {
    var obstacleMakerFunctionName = $(this).data("frogger-maker-name");

    // get the maker function for the obstacle we are making
    var obstacleMakerFunction = window[obstacleMakerFunctionName];

    
    //initialize Frogger
   frogger = new obstacleMakerFunction(750, 600);

    //set Frogger's position
    frogger.setPosition();

    //append frogger to the container
    $container.append(frogger.$obstacleNode);
    $addFroggerButton.toggle();





  });
/*-------------------------------------------------------------------*/
/*--------------------Frogger Movement ------------------------------*/

  $('body').keydown(function(event){
    if(event.which === 37 ){
      frogger.move('left');
    } else if (event.which === 38){
      frogger.move('up');
    } else if(event.which === 39){
      frogger.move('right');
    } else if(event.which === 40){
      frogger.move('down');
    }
  });


/*-------------------------------------------------------------------*/

/*--------------------Check Collisions ------------------------------*/

  window.checkDistance = function(top, left){
    var a = Math.abs(top-frogger.centerTop);
    var b = Math.abs(left-frogger.centerLeft);
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
  }

  var collisionInterval = setInterval(function() {
    for(var i = 0; i < obstacles.length; i++){
        var topObstacle = +obstacles[i].$obstacleNode.css('top').slice(0,-2);
        var leftObstacle = +obstacles[i].$obstacleNode.css('left').slice(0,-2);
        var distance = checkDistance(topObstacle + 30, leftObstacle + 20);

        if(distance < 30){
          console.log('collision');
        }  
      }
  }, 30);


/*-------------------------------------------------------------------*/



});