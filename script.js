let startGame = true;
const container = document.querySelector(".container");
const boxes = container.querySelectorAll(".box");
const winnerText = document.querySelector(".winner");
const playRoundBtn = document.querySelector(".play");

let choice = [];

const gameBoard = (() => {
	const createBoard = () => {
		for (let i = 0; i < 9; i++) {
			choice.push("");
		}
	};

	const playRound = (player1, player2) => {
		let player1turn = true;

		for (let i = 0; i < boxes.length; i++) {
			const box = boxes[i];
			box.addEventListener("click", () => {
				if (startGame && player1turn === true && box.innerHTML === "") {
					box.innerHTML = player1.marker;
					player1turn = false;
					let index = box.getAttribute("data-index");
					choice[index] = player1.marker;
					console.log(choice);
					checkWinner(player1, player2);
				} else if (startGame && player1turn === false && box.innerHTML === "") {
					box.innerHTML = player2.marker;
					player1turn = true;
					let index = box.getAttribute("data-index");
					choice[index] = player2.marker;
					console.log(choice);
					checkWinner(player1, player2);
				}
			});
		}
	};

	return { createBoard, playRound };
})();

function createPlayer(name, marker) {
	return {
		name: name,
		marker: marker,
		sayName() {
			console.log(`Player ${name}`);
		},
	};
}

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

const checkWinner = (player, cpu) => {
	for (let i = 0; i < winningCombinations.length; i++) {
		const [a, b, c] = winningCombinations[i];
		if (choice[a] === player.marker && choice[b] === player.marker && choice[c] === player.marker) {
			console.log(`Player ${player.name} wins!`);
			winnerText.textContent = `${player.name} wins!`;
			startGame = false;
			playRoundBtn.style.display = "block";
			return;
		} else if (choice[a] === cpu.marker && choice[b] === cpu.marker && choice[c] === cpu.marker) {
			console.log(`Player ${cpu.name} wins!`);
			winnerText.textContent = `${cpu.name} wins!`;
			startGame = false;
			playRoundBtn.style.display = "block";
			return;
		} else if (!checkWinner) {
			winnerText.textContent = `DRAW`;
			startGame = false;
			playRoundBtn.style.display = "block";
		}
	}
	checkDraw();
};

const checkDraw = () => {
	let draw = true;
	for (let i = 0; i < choice.length; i++) {
		if (choice[i] === "") {
			draw = false;
			break;
		}
	}
	if (draw) {
		startGame = false;
		playRoundBtn.style.display = "block";
		winnerText.textContent = "It's a draw!";
	}
};

const restartGame = () => {
	choice = [];
	for (let i = 0; i < boxes.length; i++) {
		boxes[i].innerHTML = "";
	}
	startGame = true;
	winnerText.textContent = "Tic-Tac-Toe";
	gameBoard.createBoard();
	playRoundBtn.style.display = "none";
	gameBoard.playRound(player, cpu);
};

playRoundBtn.addEventListener("click", restartGame);
