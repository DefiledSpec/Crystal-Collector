let startNumber, blueVal, redVal, greenVal, yellowVal;

let inputNums;
let playerScore, playerWins = 0, playerLosses = 0;

function updateScore(val) {
	playerScore = 0;
	if(val) {
		inputNums.push(val);
	}
	if(inputNums.length >= 1) {
		for(let i = 0; i < inputNums.length; i++) {
			playerScore += inputNums[i];
		}
	}
	$('#playerScore').text(playerScore);
}

function checkVal() {
	console.log(playerScore, startNumber);
	if (playerScore > startNumber) {
		console.log('better luck next time.');
		resetScore();
		game();
	} else {
		if(playerScore < startNumber) {
			console.log('keep going!');
		} else if (playerScore === startNumber) {
			console.log('you win!');
			updateStreak();
			game();
		}
	}
}

function resetScore() {
	playerLosses++;
	playerScore = 0;
	$('#losses').text(playerLosses);
}
function updateStreak() {
	playerWins++;
	playerScore = 0;
	$('#wins').text(playerWins);
}


function game() {
	inputNums = [];
	updateScore();
	startNumber = randInt(19, 120);
	$('#gameNumber').text(startNumber);
	blueVal = randInt(1, 12);
	redVal = randInt(1, 12);
	greenVal = randInt(1, 12);
	yellowVal = randInt(1, 12);
}

function randInt(min, max) {
  	return Math.floor(Math.random() * (max - min + 1)) + min;
}
game();

$('#blue').click(function() {
	updateScore(blueVal);
	checkVal();
});
$('#red').click(function() {
	updateScore(redVal);
	checkVal();
});
$('#green').click(function(){
	updateScore(greenVal);
	checkVal();
});
$('#yellow').click(function() {
	updateScore(yellowVal);
	checkVal();
});
