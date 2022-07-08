const modal = document.querySelector(".modal");
const overlay = modal.querySelector(".modal__overlay");
const winner = document.getElementById("winner");
const closeBtn = document.getElementById("cancel");
const reloadBtn = document.getElementById("reload");

function resultModal(color = "") {
  modal.classList.remove("hidden");
  winner.innerText = `${color}이 승리했습니다`;
  overlay.addEventListener("click", () => {
    //배경 클릭
    modal.classList.add("hidden");
  });
  closeBtn.addEventListener("click", () => {
    // 취소버튼 클릭
    modal.classList.add("hidden");
  });
  reloadBtn.addEventListener("click", () => {
    //새 게임버튼 클릭
    window.location.reload();
  });
}
