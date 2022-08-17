const STONE_WIDTH = 45; //돌 크기
const STONE_HEIGHT = 45;

const whiteStone = new Image(); //이미지 생성
const blackStone = new Image();

class LocationIds {
  #totalIds;
  #blackIds;
  #whiteIds;
  constructor() {
    this.#totalIds = [];
    this.#blackIds = [];
    this.#whiteIds = [];
  }
  get totalIds() {
    return this.#totalIds;
  }
  set totalIds(id) {
    this.#totalIds.push(id);
  }
  get blackIds() {
    return this.#blackIds;
  }
  set blackIds(id) {
    this.#blackIds.push(id);
  }
  get whiteIds() {
    return this.#whiteIds;
  }
  set whiteIds(id) {
    this.#whiteIds.push(id);
  }
}

function blackDown(x, y) {
  //검은돌 이미지 놓기
  blackStone.onload = function () {
    ctx.drawImage(blackStone, x - 22.5, y - 22.5, STONE_WIDTH, STONE_HEIGHT);
  };
  blackStone.src = "http://localhost:3000/public/img/black.png";
  blackId.push(createId(x, y));
  blackId.sort((a, b) => a - b);
}

function whiteDown(x, y) {
  //하얀돌 이미지 놓기
  whiteStone.onload = function () {
    ctx.drawImage(whiteStone, x - 22.5, y - 22.5, STONE_WIDTH, STONE_HEIGHT);
  };
  whiteStone.src = "http://localhost:3000/public/img/white.png";
  whiteId.push(createId(x, y));
  whiteId.sort((a, b) => a - b);
}
