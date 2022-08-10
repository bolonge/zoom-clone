function resultModal(color = "") {
  const overlay = document.getElementById("modalOverlay");
  const content = document.getElementById("modalContent");
  const winner = content.querySelector("h1");
  const reloadBtn = content.querySelector("#reload");
  const closeBtn = content.querySelector("#cancel");

  modal.classList.replace("hidden", "flex");
  winner.innerText = `${color}이 승리했습니다`;

  overlay.addEventListener("click", handleCancelClick);
  closeBtn.addEventListener("click", handleCancelClick);
  reloadBtn.addEventListener("click", handleGameReadyOrStart);

  function handleCancelClick() {
    modal.classList.replace("flex", "hidden");
    window.location.reload();
  }

  function handleGameReadyOrStart(e) {
    if (isPeerReady) {
      socket.emit("start_game", roomName);
      modal.classList.replace("flex", "hidden");
      isPeerReady = false;
    } else {
      socket.emit("ready", roomName);
      e.target.classList.add("hidden");
    }
  }
}

function handleModalReadyButton() {
  const reloadBtn = document.getElementById("reload");
  const modalMessage = document.getElementById("modalMessage");
  if (isPeerReady) {
    modalMessage.innerHTML = "상대가 준비 했습니다";
    reloadBtn.innerHTML = "시작하기";
  }
}
