ctx.strokeRect(20, 20, 630, 630);
ctx.beginPath();

for (var i = 20; i < 585; i += 45) {
  ctx.moveTo(i + 45, 20); //세로줄
  ctx.lineTo(i + 45, 650);
  ctx.stroke();
  ctx.moveTo(20, i + 45); //가로줄
  ctx.lineTo(650, i + 45);
  ctx.stroke();
}
ctx.closePath();

ctx.moveTo(335, 335); //가운데
ctx.arc(335, 335, 3, 0, Math.PI * 2);
ctx.fill();

ctx.moveTo(155, 155); //왼쪽 위
ctx.arc(155, 155, 3, 0, Math.PI * 2);
ctx.fill();

ctx.moveTo(155, 515); //왼쪽 아래
ctx.arc(155, 515, 3, 0, Math.PI * 2);
ctx.fill();

ctx.moveTo(515, 155); //오른쪽 위
ctx.arc(515, 155, 3, 0, Math.PI * 2);
ctx.fill();

ctx.moveTo(515, 515); //오른쪽 아래
ctx.arc(515, 515, 3, 0, Math.PI * 2);
ctx.fill();
