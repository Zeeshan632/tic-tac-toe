const container = document.querySelector(".main-container");
const allBlocks = document.querySelectorAll(".input-block");
const turnsText = document.querySelector(".turns");

let recentMove = 0;

for (let block of allBlocks) {
	block.addEventListener("click", (e) => {
		if (recentMove === 0 && !e.target.classList.contains("zero")) {
			e.target.classList.add("cross");
			e.target.innerHTML = "<h1 class='cross-tag'>X</h1>";
			recentMove = 1;
		} else if (recentMove !== 0 && !e.target.classList.contains("cross")) {
			e.target.classList.add("zero");
			e.target.innerHTML = "<h1 class='zero-tag'>O</h1>";
			recentMove = 0;
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
	// console.log(ifCrossWin, ifZeroWin);

	for (let condition of winningConditions) {
		let crossWinCount = 0;
		let zeroWinCount = 0;

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
});
