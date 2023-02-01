const gameBoard = (() => {
	const choice = [];
	const container = document.querySelector(".container");

	const createBoard = () => {
		for (let i = 0; i < 9; i++) {
			const box = document.createElement("div");
			box.classList.add("box");
			container.appendChild(box);
		}
	};

	const playRound = (player1, player2) => {
		let player1turn = 0;
		let player2turn = 0;
		const boxes = container.querySelectorAll(".box");
		for (let i = 0; i < boxes.length; i++) {
			const box = boxes[i];
			box.addEventListener("click", () => {
				if (player1turn === 0 && box.innerHTML === "") {
					box.innerHTML = player1.marker;
					player1turn = 1;
					player2turn = 0;
					choice.push(box.innerHTML);
					console.log(choice);
					console.log(player1.name);
				} else if (player2turn === 0 && box.innerHTML === "") {
					box.innerHTML = player2.marker;
					player2turn = 1;
					player1turn = 0;
					choice.push(box.innerHTML);
					console.log(choice);
					console.log(player2.name);
				}
			});
		}
	};

	return { choice, createBoard, playRound };
})();

gameBoard.createBoard();

function createPlayer(name, marker) {
	return {
		name: name,
		marker: marker,
		sayName() {
			console.log(`Player ${name}`);
		},
	};
}

const john = createPlayer("john", "X");
const cpu = createPlayer("cpu", "O");
john.sayName();

gameBoard.playRound(john, cpu);
