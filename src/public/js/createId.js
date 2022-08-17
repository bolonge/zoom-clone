const canDownRanges = [
  20, 65, 110, 155, 200, 245, 290, 335, 380, 425, 470, 515, 560, 605, 650,
];

function createId(x, y) {
  let yId = 0;
  yId = canDownRanges.indexOf(y) + 1;
  switch (yId) {
    case 1:
      return canDownRanges.indexOf(x) + 1;
    case 2:
      return canDownRanges.indexOf(x) + 16;
    case 3:
      return canDownRanges.indexOf(x) + 31;
    case 4:
      return canDownRanges.indexOf(x) + 46;
    case 5:
      return canDownRanges.indexOf(x) + 61;
    case 6:
      return canDownRanges.indexOf(x) + 76;
    case 7:
      return canDownRanges.indexOf(x) + 91;
    case 8:
      return canDownRanges.indexOf(x) + 106;
    case 9:
      return canDownRanges.indexOf(x) + 121;
    case 10:
      return canDownRanges.indexOf(x) + 136;
    case 11:
      return canDownRanges.indexOf(x) + 151;
    case 12:
      return canDownRanges.indexOf(x) + 166;
    case 13:
      return canDownRanges.indexOf(x) + 181;
    case 14:
      return canDownRanges.indexOf(x) + 196;
    case 15:
      return canDownRanges.indexOf(x) + 211;
    default:
      break;
  }
}
