var $playerSelect = $("#player-select");
var $X = $(".X");
var $O = $(".O");
var $space = $(".space");
var $winScreen = $("#win-screen");
var $winMessage = $("#win-message");

var turnNumber = 0;
var playerTurn;
var human;
var computer;


//Board legend: T=top, M=middle, B=bottom, L=left, R=right
var boardPosition = ["TL", "TM", "TR", "ML", "MM", "MR", "BL", "BM", "BR"];

// -1 flags empty square
var gameBoard = {
  "TL": -1,
  "TM": -1,
  "TR": -1,
  "ML": -1,
  "MM": -1,
  "MR": -1,
  "BL": -1,
  "BM": -1,
  "BR": -1,
   
}

$X.click(function() {
  $playerSelect.slideUp();
  turnNumber = 1;
  human = 1;
  computer = 0;
  playerTurn = human;
});

$O.click(function() {
  $playerSelect.slideUp();
  turnNumber = 1;
  human = 0;
  computer = 1;
  playerTurn = human;
});

function clearBoard(gameBoard, boardPosition) {
  for (var i = 0; i < boardPosition.length; i++) {
    gameBoard[boardPosition[i]] = -1;
  }
  $space.text("");
}

function checkWinner(gameBoard, player) {
  if ((gameBoard["TL"] == player && gameBoard["TM"] == player && gameBoard["TR"] == player) 
    || (gameBoard["ML"] == player && gameBoard["MM"] == player && gameBoard["MR"] == player)
    || (gameBoard["BL"] == player && gameBoard["BM"] == player && gameBoard["BR"] == player)
    || (gameBoard["TL"] == player && gameBoard["ML"] == player && gameBoard["BL"] == player)
    || (gameBoard["TM"] == player && gameBoard["MM"] == player && gameBoard["BM"] == player)
    || (gameBoard["TR"] == player && gameBoard["MR"] == player && gameBoard["BR"] == player)
    || (gameBoard["TL"] == player && gameBoard["MM"] == player && gameBoard["BR"] == player)
    || (gameBoard["TR"] == player && gameBoard["MM"] == player && gameBoard["BL"] == player)) {
    turnNumber = 11;
    $winScreen.show();
    if (player == 0) {
      $winMessage.text("O WINS!");
    } else if (player == 1) {
      $winMessage.text("X WINS!");
    }
  }
} 

$winScreen.click(function() {
  $winScreen.hide();
  $playerSelect.show();
  turnNumber = 0;
  clearBoard(gameBoard, boardPosition);
});

$space.click(function() {
  if ($(this).is(':empty')) {
    if (human == 0) {
      $(this).text("O");
    } else {
      $(this).text("X");
    }
    gameBoard[this.id] = human;
    console.log(gameBoard);
    playerTurn = computer;
    turnNumber++;
    checkWinner(gameBoard, human);
  }
  if (turnNumber == 10) {
    $winScreen.show();
    $winMessage.text("DRAW");
  }
  setTimeout(function() {
    while (playerTurn == computer && turnNumber <= 9) {
      var r = Math.floor((Math.random() * 9) + 1);
      if (gameBoard[boardPosition[r]] == -1) {
        gameBoard[boardPosition[r]] = computer;
        if (computer == 0) {
          $("#" + boardPosition[r]).text("O");
        } else {
          $("#" + boardPosition[r]).text("X");
        }
        playerTurn = human
        turnNumber++;
        checkWinner(gameBoard, computer);
      }
    }
  }, 300)
});