$(document).ready(function() {
/*------------------------------------GLOBAL VARIABLES----------------------------------*/
  window.obstacles = [];
  window.frogger;
  window.frogWin = ['img/frogwin1.gif', 'img/frogwin2.gif', 'img/frogwin3.gif', 'img/frogwin4.gif'];
  window.checkDistance = function(top, left){
    var a = Math.abs(top-frogger.centerTop);
    var b = Math.abs(left-frogger.centerLeft);
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
  };

/*------------------------------------CACHE THE DOM-------------------------------------*/
var $body = $('body');
var $container = $('.container');
var $addRockButton = $('.addRock');
var $addVehicleButton = $('.addVehicle');
var $addFroggerButton = $('.addFrogger');
var $playAgainButton = $('.playAgain');
var $resultWindow = $('.resultWindow');
var $topBar = $('.topbar');
var $menuBar = $('.menubar');
var $gameOverScreen = $('.gameover.lose');
var $gameWonScreen = $('.gameover.win');
var $frogGif = $('.frogWin');
var $countdown = $('.countdown');
var $nightmareMode = $('.nightmareMode');

/*------------------------------------VARIABLE DEFINITIONS-------------------------------*/
var leftStartPositions = [30, 75, 500, 55];
var rightStartPositions = [125,175,625, 650];
var currentCount = 9;
var countCars = 0;
var nightmareMode;

/*------------------------------------AUDIO-------------------------------*/
var hop = new Audio('mp3/hop.mp3');
var theme = new Audio('mp3/theme.mp3');
var hit = new Audio('mp3/hit.mp3');
var water = new Audio('mp3/water.mp3');
var gameStart = new Audio('mp3/gameStart.mp3');
var playHop = function(){
  hop.play();
};
theme.autoplay = true;
theme.volume = 0.3;
theme.loop = true;

/*------------------------------------FUNCTIONS-----------------------------------------*/
var directionVehicle = function(){
  return Math.round(Math.random()) === 1 ? 'left' : 'right';
};

var vehicleSpeed = function() {
  return Math.round(Math.random() * 3000 + 5000);
};

var showResult = function(){
  $resultWindow.show();
  $topBar.hide();
  for(var i = 0; i < obstacles.length; i++){
    obstacles[i].$obstacleNode.hide();
    $playAgainButton.show();
    $menuBar.off();
    clearInterval(nightmareMode);
  }
};

var gameOver = function(){
  theme.pause();
  showResult();
  $gameOverScreen.show();
  $menuBar.hide();
  frogger.$obstacleNode.addClass('spin');
  frogger.isAlive = false;
};

var gameWon = function(){
  showResult();
  $gameWonScreen.show();
  $menuBar.hide();
  $frogGif.css({
    'background-image': 'url(' + frogWin[Math.floor(Math.random()*frogWin.length)] + ')'
  });
  frogger.hasWon = true;
};

var randomRockPosition = function() {
  var topOrBottom = Math.round(Math.random()) === 1 ? 1 : 0;
  if (topOrBottom) {
    return 200 * Math.random() + 40;
  } else {
    return 200 * Math.random() + 480;
  }
};

var makeCar = function(){
  var vehicle = new Vehicle(
    $container.height() * Math.random(),
    Math.random()*400, vehicleSpeed(), directionVehicle()
  );

  if(vehicle.direction === 'left'){
    vehicle.left = Math.random()*700 + 500;
    vehicle.top = leftStartPositions[Math.floor(Math.random()*leftStartPositions.length)];
  } else {
    vehicle.left = Math.random()*700;
    vehicle.$obstacleNode.addClass('flipCar');
    vehicle.top = rightStartPositions[Math.floor(Math.random()*rightStartPositions.length)];
  }

  vehicle.setPosition();
  obstacles.push(vehicle);
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
};

/*------------------------------------EVENT HANDLERS------------------------------------*/

$playAgainButton.on('click', function(){
  window.location.reload();
});

  /*------------Add Vehicle Button--------------*/
  $addVehicleButton.on("click", makeCar);


  /*------------Nightmare Mode Button-----------*/
  $nightmareMode.on('click', function(){
    nightmareMode = setInterval(function(){
      makeCar();
    }, 500);
  });

  /*------------Add Rock Button-----------------*/
  $addRockButton.on("click", function(event) {
    var rockObstacle = new RockObstacle(
      randomRockPosition(),
      $container.width() * Math.random()
    );

    rockObstacle.setPosition();
    obstacles.push(rockObstacle);
    //append rock to the container
    $container.append(rockObstacle.$obstacleNode);
  });

  /*-------------Frogger Movement--------------*/
  $body.keyup(function(event){
    if (frogger.isAlive && !frogger.hasWon && frogger.canStart) {
      if (event.which === 37) {
        frogger.move('left');
        playHop();
      } else if (event.which === 38){
        frogger.move('up');
        playHop();
      } else if(event.which === 39){
        frogger.move('right');
        playHop();
      } else if(event.which === 40){
        frogger.move('down');
        playHop();
      }
      

      if((frogger.top < 480 && frogger.left < 255 && frogger.top > 240) ||
        (frogger.top < 480 && frogger.top > 240 && frogger.left < 735 && frogger.left > 345) ||
        (frogger.top < 480 && frogger.top > 240 && frogger.left > 825)) {
        water.play();
        frogger.$obstacleNode.animate({
          'left': '1400px'}, 1000);
        setTimeout(gameOver, 1000);
      }

      if(frogger.top < 10 && !frogger.hasWon) { gameWon(); }
    }
  });



/*------------------------------------APP START-----------------------------------------*/

  /*------------Start Music--------------*/
  theme.play()

  /*------------Add Frogger--------------*/
  //initialize Frogger
  frogger = new Frogger(730, 600);
  frogger.setPosition();
  $container.append(frogger.$obstacleNode);


  /*------------Set Intervals------------*/
  //countdown timer
  var countDown = setInterval(function(){
    $countdown.text(''+currentCount);
    currentCount--;
    if(currentCount === -1){
      gameStart.play();
      clearInterval(countDown);
      $countdown.delay(1000).hide();
    }
  }, 1000);

  // initialize 30 cars to game
  var initialCars = setInterval(function(){
    makeCar();
    countCars++;
    if(countCars > 30){
      frogger.canStart = true;
      clearInterval(initialCars);
    }
  }, 333);

  //Collision Detection
  var collisionInterval = setInterval(function() {
  for (var i = 0; i < obstacles.length; i++) {
    var topObstacle = +obstacles[i].$obstacleNode.css('top').slice(0,-2);
    var leftObstacle = +obstacles[i].$obstacleNode.css('left').slice(0,-2);
    var distance = checkDistance(topObstacle + 30, leftObstacle + 20);

    if(distance < 30){
      clearInterval(collisionInterval);
      hit.play();
      gameOver(); }

    }
  }, 30);
/*---------------------------------------END--------------------------------------------*/
});