let startNumber, blueVal, redVal, greenVal, yellowVal;


let inputNums = [];
let playerScore;

function updateScore() {
	playerScore = 0;
	if(inputNums.length >= 1) {
		for(let i = 0; i < inputNums.length; i++) {
			playerScore += inputNums[i];
		}
		$('#playerScore').text(playerScore);
	}

}

function display() {

}


function game() {
	let startNumber = randInt(19, 120);
	let blueVal = randInt(1, 12);
	let redVal = randInt(1, 12);
	let greenVal = randInt(1, 12);
	let yellowVal = randInt(1, 12);
	// console.log(blueVal, redVal, greenVal, yellowVal);



}

function randInt(min, max) {
  	return Math.floor(Math.random() * (max - min + 1)) + min;
}
game();

$('#blue').click(function() {


	updateScore();
});
$('#red').click(function() {


	updateScore();
});
$('#green').click(function(){


	updateScore();
});
$('#yellow').click(function() {

	updateScore();
});