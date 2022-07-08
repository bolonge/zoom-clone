const turnImg = document.getElementById("turn");

function changeTurn() {
  if (turn === "black") {
    turn = "white";
    turnImg.style.background = "#fff";
  } else {
    turn = "black";
    turnImg.style.background = "#262626";
  }
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
