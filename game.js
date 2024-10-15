var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;
var currentLevel = 0

// Responsible for playing sounds
function playSound(name) {
    var aud = new Audio("sounds/" + name + ".mp3");
    aud.play();
}

// Responsible for animating the Button Press effect
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// Responsible for generating the next color
function nextSequence() {
    userClickedPattern.splice(0, userClickedPattern.length);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
    level++;
    $("#level-title").text("Level " + level);
    console.log("Game Pattern: " + gamePattern);
}

// Pushes the color that the user has selected
function buttonClickHandler(color) {
    if (gameStarted) {
        // Animate only the clicked button
        $("#" + color).animate({ opacity: 0 }, 50).animate({ opacity: 1 }, 50);
        
        userClickedPattern.push(color);
        playSound(color);
        animatePress(color);
        console.log("User Clicked Pattern: " + userClickedPattern);
    }
}

// Check if the game pattern and the user entered pattern are the same or not
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
        return true;
    } else {
        console.log("Wrong Answer");
        return false;
    }
}

// To reset all the variables for restarting the game
function gameOver() {
    gamePattern.splice(0, gamePattern.length);
    userClickedPattern.splice(0, userClickedPattern.length);
    gameStarted = false;
    level = 0;
    currentLevel = 0;

}

$(document).keydown(function(event) {
    console.log("Key pressed: ", event.key);
    if (!gameStarted && !(event.key == 'Tab' || event.key == 'CapsLock' || event.key == 'CapsLock' || event.key == 'Shift' || event.key == 'Meta' || event.ctrlKey || event.altKey || event.key.startsWith('Arrow'))) {

        setTimeout(function() {
            $("#level-title").text("Level " + level);
            gameStarted = true;

            nextSequence();
        }, 200);
        
    }
});

$(".btn").click(function(event) {
    buttonClickHandler(event.target.id);

    if(!checkAnswer(userClickedPattern.length - 1)) {
        $("#level-title").html("Game Over!! <br><br>Press any key to restart.");
        playSound("wrong");

        $("body").addClass("game-over");
        
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        gameOver();
    }
});