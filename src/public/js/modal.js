function resultModal(color = "") {
  const modal = document.getElementById("modal");
  const overlay = modal.querySelector("#modalOverlay");
  const content = modal.querySelector("#modalContent");
  const winner = content.querySelector("h1");
  const reloadBtn = content.querySelector("#reload");
  const closeBtn = content.querySelector("#cancel");

  modal.classList.replace("hidden", "flex");
  winner.innerText = `${color}이 승리했습니다`;

  overlay.addEventListener("click", () => {
    //배경 클릭
    modal.classList.replace("flex", "hidden");
  });
  closeBtn.addEventListener("click", () => {
    // 취소버튼 클릭
    modal.classList.replace("flex", "hidden");
    window.location.reload();
  });
  reloadBtn.addEventListener("click", () => {
    //새 게임버튼 클릭
  });
}
