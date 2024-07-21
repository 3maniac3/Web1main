// GENERATE SQUARES
const chessboard =
document.querySelector(".chessboard");

const boardSize = 8 * 8;
let column = 0;
let color = "bright";

for(let i = 0; i < boardSize; i++){
  column++;
  const square =
  document.createElement("div");
  square.classList.add("square");
  square.classList.add(color);
  if(column == 8){
    column = 0;
    if(color == "bright") color = "dark";
    else color = "bright";
  }
  if(color == "bright") color = "dark";
  else color = "bright";
  chessboard.appendChild(square);
}