function rangeSet(offset) {
  //범위 지정
  if (offset >= 627.5) {
    return 650;
  } else if (offset >= 605 - 22.5) {
    return 605;
  } else if (offset >= 560 - 22.5) {
    return 560;
  } else if (offset >= 515 - 22.5) {
    return 515;
  } else if (offset >= 470 - 22.5) {
    return 470;
  } else if (offset >= 425 - 22.5) {
    return 425;
  } else if (offset >= 380 - 22.5) {
    return 380;
  } else if (offset >= 335 - 22.5) {
    return 335;
  } else if (offset >= 290 - 22.5) {
    return 290;
  } else if (offset >= 245 - 22.5) {
    return 245;
  } else if (offset >= 200 - 22.5) {
    return 200;
  } else if (offset >= 155 - 22.5) {
    return 155;
  } else if (offset >= 110 - 22.5) {
    return 110;
  } else if (offset >= 65 - 22.5) {
    return 65;
  } else if (offset >= 0) {
    return 20;
  } else {
    return 20;
  }
}
