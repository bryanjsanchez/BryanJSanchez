var $timer = $("#timer");
var $timerLabel = $("#timerLabel");

var $topColor = $("#topColor");
var $bottomColor = $("#bottomColor");

var $setTime = $("#setTime");
var $plusTime = $("#plusTime");
var $minusTime = $("#minusTime");

var $setBreak = $("#setBreak");
var $plusBreak = $("#plusBreak");
var $minusBreak = $("#minusBreak");

var $start = $("#start");
var $stop = $("#stop");
$stop.css("pointer-events", "none");

var setTime = parseInt($setTime.text()); //time in minutes
var timeLeft = setTime * 60; //time in seconds
display(timeLeft);
var secTimeLeft = timeLeft % 60;
var minTimeLeft = (timeLeft - secTimeLeft) / 60;

var setBreak = parseInt($setBreak.text()); //time in minutes

var timerDisplay;

var timer = 1; //Time = 1, Break = -1
var change = false; //signals change to or from break

var topHeight = "100vh";
var bottomHeight = "0vh";
changeColor(topHeight, bottomHeight);

function changeColor(topheight, bottomHeight) {
  $topColor.css("height", topHeight);
  $bottomColor.css("height", bottomHeight);
}

function display(timeLeft) {
  secTimeLeft = timeLeft % 60;
  minTimeLeft = (timeLeft - secTimeLeft) / 60;

  secTimeLeft = secTimeLeft.toString();
  if (secTimeLeft.length == 1) {
    secTimeLeft = "0" + secTimeLeft;
  }
  timerDisplay = minTimeLeft + ":";
  timerDisplay += secTimeLeft;
  secTimeLeft = timeLeft % 60;

  $timer.text(timerDisplay);
}

$plusTime.click(function() {
  if (parseInt($setTime.text()) < 60) {
    $setTime.text(parseInt($setTime.text()) + 1);
    setTime = parseInt($setTime.text());
    timeLeft = setTime * 60;
    timer = 1;
    change = true;
    topHeight = "100vh";
    bottomHeight = "0vh";
    changeColor(topHeight, bottomHeight);
    display(timeLeft);
  }
});

$minusTime.click(function() {
  if ($setTime.text() > 1) {
    $setTime.text(parseInt($setTime.text()) - 1);
    setTime = parseInt($setTime.text());
    timeLeft = setTime * 60;
    timer = 1;
    change = true;
    topHeight = "100vh";
    bottomHeight = "0vh";
    changeColor(topHeight, bottomHeight);
    display(timeLeft);
  }
});

$plusBreak.click(function() {
  if (parseInt($setBreak.text()) < 60) {
    $setBreak.text(parseInt($setBreak.text()) + 1);
    setBreak = parseInt($setBreak.text());
    timer = 1;
    change = true;
    topHeight = "100vh";
    bottomHeight = "0vh";
    changeColor(topHeight, bottomHeight);
  }
});

$minusBreak.click(function() {
  if ($setBreak.text() > 1) {
    $setBreak.text(parseInt($setBreak.text()) - 1);
    setBreak = parseInt($setBreak.text());
    timer = 1;
    change = true;
    topHeight = "100vh";
    bottomHeight = "0vh";
    changeColor(topHeight, bottomHeight);
  }
});

$start.click(function() {

  $start.css("pointer-events", "none");
  $stop.css("pointer-events", "auto");
  $plusTime.css("pointer-events", "none");
  $minusTime.css("pointer-events", "none");
  $plusBreak.css("pointer-events", "none");
  $minusBreak.css("pointer-events", "none");

  timerFunc = setInterval(function() {

    timeLeft--;

    if (change) {
      if (timer == 1) {
        timeLeft = setTime * 60;
        $timerLabel.text("Session");

      } else if (timer == -1) {
        $timerLabel.text("Break!");
        timeLeft = setBreak * 60;
      }
      change = false;
    }

    if (timer == 1) {
      topHeight = (timeLeft / (setTime * 60) * 100) + "vh";
      bottomHeight = (100 - (timeLeft / (setTime * 60) * 100)) + "vh";
    } else if ( timer == -1) {
      bottomHeight = (timeLeft / (setTime * 60) * 100) + "vh";
      topHeight = (100 - (timeLeft / (setBreak * 60) * 100)) + "vh";
    }

    changeColor(topHeight, bottomHeight);
    display(timeLeft);
    
    if (timeLeft === 0) {
      timer *= -1;
      change = true;
    }
  }, 1000);
});

$stop.click(function() {
  clearInterval(timerFunc);
  $start.css("pointer-events", "auto");
  $stop.css("pointer-events", "none");
  $plusTime.css("pointer-events", "auto");
  $minusTime.css("pointer-events", "auto");
  $plusBreak.css("pointer-events", "auto");
  $minusBreak.css("pointer-events", "auto");
}); 
