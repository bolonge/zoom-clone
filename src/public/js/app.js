const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const camerasSelect = document.getElementById("cameras");
const call = document.getElementById("call");
const startBtn = document.getElementById("myStartBtn");

const game = document.getElementById("game");
let canvas = document.getElementById("gameBoard");
let ctx = canvas.getContext("2d");

let myNickname,
  myStream,
  muted = false,
  cameraOff = false,
  roomName,
  myPeerConnection,
  myDataChannel,
  locationXY = [],
  blackId = [],
  whiteId = [],
  turn = "black",
  errorMessage = "";

async function getCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
    const currentCamera = myStream.getVideoTracks()[0];
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (currentCamera.label === camera.label) {
        option.selected = true;
      }
      camerasSelect.appendChild(option);
    });
  } catch (error) {
    console.log(error);
  }
}

async function getMedia(deviceId) {
  const initialContraints = {
    audio: false,
    video: {
      facingMode: true,
    },
  };
  const cameraContraints = {
    audio: false,
    video: { deviceId: { exact: deviceId } },
  };
  try {
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraContraints : initialContraints
    );
    myFace.srcObject = myStream;
    if (!deviceId) {
      await getCameras();
    }
  } catch (error) {
    console.log(error);
  }
}

function handleMuteClick() {
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (!muted) {
    muteBtn.innerText = "Unmute";
    muted = true;
  } else {
    muteBtn.innerText = "Mute";
    muted = false;
  }
}

function handleVideoClick() {
  myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (cameraOff) {
    cameraBtn.innerText = "Turn Camera Off";
    cameraOff = false;
  } else {
    cameraBtn.innerText = "Turn Camera On";
    cameraOff = true;
  }
}

async function handleCameraChange() {
  await getMedia(camerasSelect.value);
  if (myPeerConnection) {
    const videoTrack = myStream.getVideoTracks()[0];
    const videoSender = myPeerConnection
      .getSenders()
      .find((sender) => sender.track.kind === "video");
    videoSender.replaceTrack(videoTrack);
  }
}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleVideoClick);
camerasSelect.addEventListener("input", handleCameraChange);

//start game code

function handleStartGame() {
  socket.emit("start_game", roomName);
  startBtn.hidden = true;
}

startBtn.addEventListener("click", handleStartGame);

//welcome form code

const welcome = document.getElementById("welcome");
welcomeForm = welcome.querySelector("#roomName");
nicknameForm = welcome.querySelector("#nickname");

function handleSaveNickName(event) {
  event.preventDefault();
  const input = nicknameForm.querySelector("input");
  const button = nicknameForm.querySelector("button");
  socket.emit("nickname", input.value);
  myNickname = input.value;
  input.disabled = true;
  button.disabled = true;
}

async function initCall() {
  welcome.hidden = true;
  call.hidden = false;
  await getMedia();
  makeConnection();
}

function alertErrorMessage() {
  if (errorMessage !== "") {
    alert(errorMessage);
    errorMessage = "";
    window.location.reload();
  }
}

async function handleWelcomSubmit(event) {
  event.preventDefault();
  if (!myNickname) {
    alert("이름을 입력해주세요");
    return;
  }
  const input = welcomeForm.querySelector("input");
  await initCall();
  socket.emit("join_room", input.value);
  roomName = input.value;
  input.value = "";
}
nicknameForm.addEventListener("submit", handleSaveNickName);
welcomeForm.addEventListener("submit", handleWelcomSubmit);

//socket code
socket.on("join_error", (message) => {
  errorMessage = message;
  alertErrorMessage();
});

socket.on("welcome", async (name) => {
  myDataChannel = myPeerConnection.createDataChannel("game");
  myDataChannel.addEventListener("message", handleGameDataChannel);
  const offer = await myPeerConnection.createOffer();
  myPeerConnection.setLocalDescription(offer);
  socket.emit("offer", offer, roomName);
  startBtn.hidden = false;
});

socket.on("offer", async (offer) => {
  myPeerConnection.addEventListener("datachannel", (event) => {
    myDataChannel = event.channel;
    myDataChannel.addEventListener("message", handleGameDataChannel);
  });
  myPeerConnection.setRemoteDescription(offer);
  const answer = await myPeerConnection.createAnswer();
  myPeerConnection.setLocalDescription(answer);
  socket.emit("answer", answer, roomName);
});

socket.on("answer", (answer) => {
  myPeerConnection.setRemoteDescription(answer);
});

socket.on("ice", (ice) => {
  myPeerConnection.addIceCandidate(ice);
});

socket.on("stone", (stone) => {
  localStorage.setItem("stone", stone);
});

socket.on("left_user", () => {
  alert("상대방이 나갔습니다");
  locationXY = [];
  blackId = [];
  whiteId = [];
  canvas.remove();
  canvas = createBoard(canvas);
  ctx = canvas.getContext("2d");
  drawLine(ctx);
  game.appendChild(canvas);
});

//RTC code
function makeConnection() {
  myPeerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun.1und1.de:3478",
          "stun:stun.cloopen.com:3478",
          "stun:stun.epygi.com:3478",
          "stun:stun.gmx.de:3478",
        ],
      },
    ],
  });
  myPeerConnection.addEventListener("icecandidate", handleIce);
  myPeerConnection.addEventListener("addstream", handleAddStream);
  myStream
    .getTracks()
    .forEach((track) => myPeerConnection.addTrack(track, myStream));
}

function handleIce(data) {
  socket.emit("ice", data.candidate, roomName);
}

function handleAddStream(data) {
  const peerFace = document.getElementById("peerFace");
  peerFace.srcObject = data.stream;
}

// game
const handleMouseDown = (event) => {
  const x = rangeSet(event.offsetX);
  const y = rangeSet(event.offsetY);

  if (!locationXY.includes(`${x}_${y}`)) {
    if (downRange.includes(x) && downRange.includes(y)) {
      if (turn === localStorage.getItem("stone")) {
        myDataChannel.send(`${turn},${x},${y}`);
        blackOrWhite(turn, x, y);
      }
    }
  } else {
    console.log("중복");
  }
};

function handleGameDataChannel(event) {
  const { data } = event;
  const turn = data.split(",")[0];
  const locationX = data.split(",")[1] - 0;
  const locationY = data.split(",")[2] - 0;
  blackOrWhite(turn, locationX, locationY);
}

function blackOrWhite(turn, x, y) {
  if (turn === "black") {
    blackDown(x, y);
    locationXY.push(`${x}_${y}`);
    checkGame(blackId, "흑");
  } else {
    whiteDown(x, y);
    locationXY.push(`${x}_${y}`);
    checkGame(whiteId, "백");
  }
  changeTurn();
}

drawLine(ctx);

if (canvas) {
  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("touchend", handleMouseDown);
}
