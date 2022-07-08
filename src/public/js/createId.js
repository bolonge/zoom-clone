function createId(x, y) {
  let yId = 0;
  yId = downRange.indexOf(y) + 1;
  switch (yId) {
    case 1:
      return downRange.indexOf(x) + 1;
    case 2:
      return downRange.indexOf(x) + 16;
    case 3:
      return downRange.indexOf(x) + 31;
    case 4:
      return downRange.indexOf(x) + 46;
    case 5:
      return downRange.indexOf(x) + 61;
    case 6:
      return downRange.indexOf(x) + 76;
    case 7:
      return downRange.indexOf(x) + 91;
    case 8:
      return downRange.indexOf(x) + 106;
    case 9:
      return downRange.indexOf(x) + 121;
    case 10:
      return downRange.indexOf(x) + 136;
    case 11:
      return downRange.indexOf(x) + 151;
    case 12:
      return downRange.indexOf(x) + 166;
    case 13:
      return downRange.indexOf(x) + 181;
    case 14:
      return downRange.indexOf(x) + 196;
    case 15:
      return downRange.indexOf(x) + 211;
    default:
      break;
  }
}
