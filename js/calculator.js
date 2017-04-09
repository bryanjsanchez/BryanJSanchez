var resultScreen = $("#result-text");
var result = "0+";
var screen = "0";
var finalAnswer = false;
resultScreen.text(screen);

var numberButton = $(".number");
var decimalButton = $(".decimal-point");
var operatorButton = $(".operator");
var posNegButton = $(".posNeg");
var equalsButton = $(".equals");
var clearButton = $(".clear");
var clearAllButton = $(".clear-all");

numberButton.click(function() {
  if (finalAnswer) {
    result = "0+";
    screen = "0"
    resultScreen.text(screen);
  }
  if (screen == "0") {
    screen = "";
  } else if (screen == "+" || screen == "-") {
    result += screen;
    screen = "";
  } else if (screen == "÷") {
    result += "/";
    screen = "";
  } else if (screen == "×") {
    result += "*";
    screen = "";
  }
  screen += this.value;
  if (parseFloat(screen) > 100000000) {
    resultScreen.text("OVERFLOW");
    result = "0+";
    screen = "0";
    return;
  }
  screen = screen.substr(0,8);
  resultScreen.text(screen);
  finalAnswer = false;
});

decimalButton.click(function() {
  if ((parseFloat(screen) > 0 || parseFloat(screen) < 0) && !finalAnswer) {
    screen += this.value;
    screen = screen.substr(0,8);
    resultScreen.text(screen);
  }
});

operatorButton.click(function() {
  if (screen == "+" 
    || screen == "-" 
    || screen == "÷" 
    || screen == "×") {
      screen = "";
    } 
    result += screen;
    result = eval(result);
    if (result > 100000000) {
      resultScreen.text("OVERFLOW");
      result = "0+";
      screen = "0";
      finalAnswer = false;
      return;
    }
    result = result.toString();
    screen = $(this).text();
    resultScreen.text(screen);
    finalAnswer = false;
    
});

posNegButton.click(function() {
  if (finalAnswer) {
    return;
  }
  if (/[-]?\d+/.test(screen)) {
    screen = parseFloat(screen);
    screen = screen * -1;
    screen = screen.toString();
    resultScreen.text(screen);
  }
});

equalsButton.click(function() {
  if (/\d+/.test(screen)) {
    result += screen;
  }
    result = eval(result);
  if (result > 100000000) {
    resultScreen.text("OVERFLOW");
    result = "0+";
    screen = "0";
    finalAnswer = false;
    return;
  }
  screen = result.toString();
  result = "0+";
  finalAnswer = true;
  screen = screen.substr(0,9);
  resultScreen.text(screen);
});

clearButton.click(function() {
  screen = "0";
  resultScreen.text(screen);
  finalAnswer = false;
});

clearAllButton.click(function() {
  result = "0+";
  screen = "0"
  resultScreen.text(screen);
  finalAnswer = false;
});

