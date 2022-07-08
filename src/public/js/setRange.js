const downRange = [
  //돌을 놓을 수 있는 영역
  20,
  65,
  110,
  155,
  200,
  245,
  290,
  335,
  380,
  425,
  470,
  515,
  560,
  605,
  650
];

function rangeSet(a) {
  //범위 지정
  if (a >= 627.5) {
    return 650;
  } else if (a >= 605 - 22.5) {
    return 605;
  } else if (a >= 560 - 22.5) {
    return 560;
  } else if (a >= 515 - 22.5) {
    return 515;
  } else if (a >= 470 - 22.5) {
    return 470;
  } else if (a >= 425 - 22.5) {
    return 425;
  } else if (a >= 380 - 22.5) {
    return 380;
  } else if (a >= 335 - 22.5) {
    return 335;
  } else if (a >= 290 - 22.5) {
    return 290;
  } else if (a >= 245 - 22.5) {
    return 245;
  } else if (a >= 200 - 22.5) {
    return 200;
  } else if (a >= 155 - 22.5) {
    return 155;
  } else if (a >= 110 - 22.5) {
    return 110;
  } else if (a >= 65 - 22.5) {
    return 65;
  } else if (a >= 0) {
    return 20;
  } else {
    return 20;
  }
}
