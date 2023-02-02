const container = document.querySelector(".container");
const boxes = container.querySelectorAll(".box");
const winnerText = document.querySelector(".winner");
const playRoundBtn = document.querySelector(".play");

let choices = [];
let startGame = true;

const gameBoard = (() => {
	const createBoard = () => {
		choices = Array(9).fill("");
	};

	const playRound = (player1, player2) => {
		let player1Turn = true;

		boxes.forEach((box, i) => {
			box.addEventListener("click", () => {
				if (!startGame || box.innerHTML !== "") return;

				let player = player1Turn ? player1 : player2;
				box.innerHTML = player.marker;
				player1Turn = !player1Turn;
				choices[i] = player.marker;
				checkWinner(player1, player2);
			});
		});
	};

	return { createBoard, playRound };
})();

const createPlayer = (name, marker) => ({
	name,
	marker,
	sayName: () => console.log(`Player ${name}`),
});

const player = createPlayer("Player", "X");
const cpu = createPlayer("CPU", "O");

const winningCombinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

const checkWinner = (player1, player2) => {
	for (let [a, b, c] of winningCombinations) {
		if (choices[a] === player1.marker && choices[b] === player1.marker && choices[c] === player1.marker) {
			winnerText.textContent = `${player1.name} wins!`;
			startGame = false;
			playRoundBtn.style.display = "block";
			return;
		} else if (choices[a] === player2.marker && choices[b] === player2.marker && choices[c] === player2.marker) {
			winnerText.textContent = `${player2.name} wins!`;
			startGame = false;
			playRoundBtn.style.display = "block";
			return;
		}
	}
};

const restartGame = () => {
	choices = [];
	boxes.forEach((box) => (box.innerHTML = ""));
	startGame = true;
	winnerText.textContent = "Tic-Tac-Toe";
	gameBoard.createBoard();
	playRoundBtn.style.display = "none";
	gameBoard.playRound(player, cpu);
};

playRoundBtn.addEventListener("click", restartGame);
