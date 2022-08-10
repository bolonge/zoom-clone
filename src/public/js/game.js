const turnInfo = game.querySelector("div");
const turnImg = turnInfo.querySelector("#turn");
const turnText = turnInfo.querySelector("#info");

function changeTurn() {
  if (turn === "black") {
    turn = "white";
    turnImg.style.background = "white";
  } else {
    turn = "black";
    turnImg.style.background = "black";
  }
  displayTurnInfo(turn);
}

function displayTurnInfo(turn) {
  const myStone = localStorage.getItem("stone");
  turnImg.classList.remove("hidden");
  myStone === turn
    ? turnText.classList.remove("hidden")
    : turnText.classList.add("hidden");
}

function clearTurnInfo() {
  turnImg.style.background = "black";
  turnImg.classList.add("hidden");
  turnText.classList.add("hidden");
}

function canDownStoneOnBoard(canvas) {
  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("touchend", handleMouseDown);
}

function canNotDownStoneOnBoard(canvas) {
  canvas.removeEventListener("mousedown", handleMouseDown);
  canvas.removeEventListener("touchend", handleMouseDown);
}

function checkGame(id, color = "") {
  for (let i = 1; i < 225; i++) {
    if (
      id.includes(i) &&
      id.includes(i + 1) &&
      id.includes(i + 2) &&
      id.includes(i + 3) &&
      id.includes(i + 4)
    ) {
      setTimeout(() => {
        resultModal(color);
      }, 100);
    }
  }
  for (let i = 1; i < 225; i++) {
    if (
      id.includes(i) &&
      id.includes(i + 15) &&
      id.includes(i + 30) &&
      id.includes(i + 45) &&
      id.includes(i + 60)
    ) {
      setTimeout(() => {
        resultModal(color);
      }, 100);
    }
  }
  for (let i = 1; i < 225; i++) {
    if (
      id.includes(i) &&
      id.includes(i + 16) &&
      id.includes(i + 32) &&
      id.includes(i + 48) &&
      id.includes(i + 64)
    ) {
      setTimeout(() => {
        resultModal(color);
      }, 100);
    }
  }
  for (let i = 1; i < 225; i++) {
    if (
      id.includes(i) &&
      id.includes(i + 14) &&
      id.includes(i + 28) &&
      id.includes(i + 42) &&
      id.includes(i + 56)
    ) {
      setTimeout(() => {
        resultModal(color);
      }, 100);
    }
  }
}
