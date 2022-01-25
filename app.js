const container = document.querySelector(".main-container");
const allBlocks = document.querySelectorAll(".input-block");
const turnsText = document.querySelector(".turns");

let recentMove = 0;
let blocksClicked = 0; // later on we will check if all the blocks are clicked or not, to decide if somewon wins or the game ties

for (let block of allBlocks) {
	block.addEventListener("click", (e) => {
		if (recentMove === 0 && !e.target.classList.contains("zero")) {
			e.target.classList.add("cross");
			e.target.innerHTML = "<h1 class='cross-tag'>X</h1>";
			recentMove = 1;

			blocksClicked++;
		} else if (recentMove !== 0 && !e.target.classList.contains("cross")) {
			e.target.classList.add("zero");
			e.target.innerHTML = "<h1 class='zero-tag'>O</h1>";
			recentMove = 0;

			blocksClicked++;
		}

		// checking for turns and updating the text
		if (recentMove === 0) {
			turnsText.textContent = "Its Player 1's turn";
		} else {
			turnsText.textContent = "Its Player 2's turn";
		}
	});
}
let winningConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];
container.addEventListener("click", (e) => {
	// the following two variable are the arrays, which contain the indexes of the blocks whether they have a cross class or zero class
	let ifCrossWin = [];
	let ifZeroWin = [];
	if (e.target.classList.contains("input-block")) {
		for (let i = 0; i < allBlocks.length; i++) {
			if (allBlocks[i].classList.contains("cross")) {
				ifCrossWin.push(i);
			} else if (allBlocks[i].classList.contains("zero")) {
				ifZeroWin.push(i);
			}
		}
	}

	// the following is checking if after any click, whether the indexes of the 'winninCondtions' meets the indexes stored in either 'ifZeroWin' or 'ifCrossWin', if one single digits matches, then either the crossWinCount or zeroWinCount gets one added to it
	let crossWinCount;
	let zeroWinCount;
	for (let condition of winningConditions) {
		crossWinCount = 0;
		zeroWinCount = 0;
		for (let i = 0; i < condition.length; i++) {
			if (ifCrossWin.includes(condition[i])) {
				crossWinCount++;
			} else if (ifZeroWin.includes(condition[i])) {
				zeroWinCount++;
			}
		}

		if (crossWinCount === 3) {
			setTimeout(() => {
				alert("Player 1 is Winner");
				location.reload();
			}, 500);
		} else if (zeroWinCount === 3) {
			setTimeout(() => {
				alert("Player 2 is winner");
				location.reload();
			}, 500);
		}
	}

	// checking if all the blocks are clicked
	if (blocksClicked === 9) {
		setTimeout(() => {
			alert("it's a tie");
		}, 1000);
	}
});
