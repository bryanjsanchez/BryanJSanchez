var $count = $("#count");
var $modeButton = $("#modeButton");
var $modeDisplay = $("#modeDisplay");
var $start = $("#start");
var $tiles = $(".tile");

var $green = $("#green");
var $red = $("#red");
var $yellow = $("#yellow");
var $blue = $("#blue");

var greenSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
var redSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var yellowSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var blueSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");

var iteration;
var sequence = [];
var inputSequence;
var soundOn = true;
var mode = "easy";
var turnsToWin = 20;

function disableButtons() {
  $tiles.css("pointer-events", "none");
  $start.css("pointer-events", "none");
}

function enableButtons() {
  $tiles.css("pointer-events", "auto");
  $start.css("pointer-events", "auto");
}

function updateDisplay() {
  if (sequence.length<10) {
    $count.text("0" + sequence.length.toString());
  } else {
    $count.text(sequence.length.toString());
  }
}

function buttonColorEvent(button, colorChange, color1, color2, timer) {
  setTimeout(function() {
    button.css("background", colorChange)
    switch (button) {
      case $green:
        gradientDirection = "bottom right";
        if (soundOn) {
          greenSound.play();
        }
        break;
      case $red:
        gradientDirection = "bottom left";
        if (soundOn) {
          redSound.play();
        }
        break;
      case $yellow:
        gradientDirection = "top right";
        if (soundOn) {
          yellowSound.play();
        }
        break;
      case $blue:
        gradientDirection = "top left";
        if (soundOn) {
          blueSound.play();
        }
    }
  }, (timer));
  var gradientDirection;

  setTimeout(function() {
    button.css("background", "linear-gradient(to " + gradientDirection + ", " + color1 + ", " + color2 + ")");
  }, (timer+300));
}

function playSequence() {
  disableButtons();
  switch(inputSequence[0]) {
    case "1":
      buttonColorEvent($green, "#f4fff4", "#090", "#6f6", (700*iteration));
      break;
    case "2":
      buttonColorEvent($red, "#ffd9d9", "#c00", "#f66", (700*iteration));
      break;
    case "3":
      buttonColorEvent($yellow, "#fff9df", "#fc0", "#ff6", (700*iteration));
      break;
    case "4":
      buttonColorEvent($blue, "#d9ecff", "#06c", "#0ff", (700*iteration));
      break;
  }
  inputSequence.shift();
  if (inputSequence.length>0) {
    iteration++;
    return playSequence();
  } else {
    inputSequence = sequence.slice(0);
    return;
  }
}

$modeButton.click(function() {
  if (mode == "easy") {
    mode = "strict";
    $modeDisplay.text("Strict");
  } else if (mode == "strict") {
    mode = "easy"
    $modeDisplay.text("Easy");
  }
});

$start.click(function() {
  if (sequence.length == 0) {
    sequence.push(Math.floor((Math.random() * 4) + 1).toString());
    $start.html("Restart");
  } else {
    sequence = [Math.floor((Math.random() * 4) + 1).toString()];
  }
  inputSequence = sequence.slice(0);
  updateDisplay();
  iteration = 1;
  playSequence();
  setTimeout(function() {enableButtons();}, 1000*sequence.length);
});

$tiles.click(function() {
  disableButtons();
  if (inputSequence[0] == $(this).attr("value")) {
    switch ($(this).attr("value")) {
      case "1":
        buttonColorEvent($green, "#002600", "#090", "#6f6", 0);
        break;
      case "2":
        buttonColorEvent($red, "#300", "#c00", "#f66", 0);
        break;
      case "3":
        buttonColorEvent($yellow, "#403300", "#fc0", "#ff6", 0);
        break;
      case "4":
        buttonColorEvent($blue, "#001a33", "#06c", "#0ff", 0);
        break;
    }
    inputSequence.shift();
    if (inputSequence.length == 0) {
      sequence.push(Math.floor((Math.random() * 4) + 1).toString());
      inputSequence = sequence.slice(0);
      if (sequence.length > turnsToWin) {
        setTimeout(function() {
          soundOn = false;
          for (var i = 0; i < 5; i++) {
            $count.text("You Won!");
            buttonColorEvent($green, "#f4fff4", "#090", "#6f6", (1000*i));
            buttonColorEvent($red, "#ffd9d9", "#c00", "#f66", (1000*i));
            buttonColorEvent($yellow, "#fff9df", "#fc0", "#ff6", (1000*i));
            buttonColorEvent($blue, "#d9ecff", "#06c", "#0ff", (1000*i));
          }
        }, 1000);
        $start.css("pointer-events", "auto");
      } else {
        updateDisplay();
        setTimeout(function() {
          iteration = 1;
          playSequence();
          setTimeout(function() {enableButtons();}, 700*sequence.length);
        }, 800);
      }
    } else {
      setTimeout(function() {enableButtons();}, 299);
    }
  } else {
    $count.text("XX");
    if (mode == "strict"){
       sequence = [Math.floor((Math.random() * 4) + 1).toString()];
    }
    inputSequence = sequence.slice(0);
    setTimeout(function() {
      updateDisplay();
      iteration = 1;
      playSequence();
      setTimeout(function() {enableButtons();}, 600*sequence.length);
    }, 1000);
  }
});

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  $("footer").hide();
}
