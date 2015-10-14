$(document).ready(function() {
  window.dancers = [];


  //add a rock to the page
  $(".addRock").on("click", function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var obstacleMakerFunctionName = $(this).data("obstacle-maker-name");

    // get the maker function for the kind of dancer we're supposed to make
    var obstacleMakerFunction = window[obstacleMakerFunctionName];

    
    //initialize a new Rock with a random position
    var obstacle = new obstacleMakerFunction(
      $(".container").height() * Math.random(),
      $(".container").width() * Math.random(),
      Math.random() * 1000
    );

    //set Rock's position
    obstacle.setPosition();
    $('.container').append(obstacle.$obstacleNode);
  });
});

