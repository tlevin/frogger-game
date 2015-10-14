$(document).ready(function() {
  window.dancers = [];

/*-----------------------CACHE THE DOM--------------------------------*/  
var $container = $('.container');
var $addRockButton = $('.addRock');
var $addVehicleButton = $('.addVehicle');
var vehicleSpeed = 4000

/*-------------------------------------------------------------------*/  

  $addVehicleButton.on("click", function(event) {
    var obstacleMakerFunctionName = $(this).data("vehicle-maker-name");

    // get the maker function for the obstacle we are making
    var obstacleMakerFunction = window[obstacleMakerFunctionName];

    
    //initialize a new Rock with a random position
    var vehicle = new obstacleMakerFunction(
      $container.height() * Math.random(),
      $container.width(), vehicleSpeed
    );

    //set vehicle's position
    vehicle.setPosition();

    //append rock to the container
    $container.append(vehicle.$obstacleNode);
    vehicle.move();

    var resetInterval = setInterval(function(){
      if(vehicle.$obstacleNode.css('left') === '-200px'){
        vehicle.resetPosition();
        vehicle.move();
      }
    }, 300);

  });


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

    //append rock to the container
    $container.append(obstacle.$obstacleNode);
  });
});

