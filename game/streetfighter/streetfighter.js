const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");

windowWidth = window.innerWidth;
windowHeight = window.innerHeight;

canvas.width = windowWidth;
canvas.height = windowHeight;
canvas.style.background = "white";

class Fighter{
  constructor(name, x, y){
    this.name = name;
    this.x = x;
    this.y = y;
    this.moveList = [];
    this.moveIdx = 0;
    this.moveCool = 0;
    
    for(let i = 0; i < 2; i ++){
      let img = `streetfighter-asset/move/${this.name}/sprite${i}.png`;
      this.moveList.push(img);
    }
  }
  
  update(){
    ctx.save();
    ctx.fillStyle = "rgb(0,255,0)";
    ctx.fillRect(this.x + 85, this.y + 20, 130, 55);
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.fillRect(this.x + 215, this.y + 20, 30, 55);
    ctx.restore();
    
    ctx.save();
    let img = new Image();
    img.src = this.moveList[this.moveIdx];
    ctx.scale(1, 1);
    ctx.translate(260, this.y);
    ctx.rotate(degree(90));
    ctx.drawImage(img, 0, 0, 100, 180);
    ctx.restore();
  }
  
  attack(){
    
  }
}

// background
let backgroundIdx = 0;

// buttons
const leftBtn = new Image();
const rightBtn = new Image();
const jumpBtn = new Image();
const attackBtn = new Image();

let moveLeft = false;
let moveRight = false;

// characters
let player = new Fighter("rick_de_silva", 0, 100);

// system
let system = "gameplay";

const degree = function(setDeg){
  return setDeg * Math.PI / 180;
}

function touCheck(){
  canvas.addEventListener("touchstart", e => {
    [...e.changedTouches].forEach(touch => {
      let x = touch.pageX;
      let y = touch.pageY;
      
      if(x > 10 && x < 10 + 55 && y > 125 && y < 125 + 90){
        moveRight = true;
      }
      if(x > 10 && x < 10 + 55 && y > 25 && y < 25 + 90){
        moveLeft = true;
      }
    });
  });

  canvas.addEventListener("touchend", function(){
    moveLeft = false;
    moveRight = false;
    player.moveIdx = 0;
    player.moveCool = 0;
  });
}

function drawCharacter(){
  player.update();
  
  if(moveLeft && !(player.y < -18)){
    player.y -= 3;
    player.moveCool ++;
        
    if(player.moveCool > 10 && player.moveIdx == 0){
      player.moveIdx ++;
      player.moveCool = 0;
    }
    else if(player.moveCool > 10 && player.moveIdx == 1){
      player.moveIdx = 0;
      player.moveCool = 0;
    }
  }
  
  if(moveRight && !(player.y > windowWidth + 230)){
    player.y += 3;
    player.moveCool ++;
        
    if(player.moveCool > 10 && player.moveIdx == 0){
      player.moveIdx ++;
      player.moveCool = 0;
    }
    else if(player.moveCool > 10 && player.moveIdx == 1){
      player.moveIdx = 0;
      player.moveCool = 0;
    }
  }
}

function drawBackground(){
  let background = new Image();
  let buttonPanel = new Image();
  
  ctx.save();
  background.src = `streetfighter-asset/image/background${backgroundIdx}.png`;
  ctx.scale(1, 1);
  ctx.rotate(Math.PI / 2);
  ctx.drawImage(background, 0, 0, background.width, background.height, 0, -360, windowWidth * 2, windowHeight - 380);
  ctx.restore();
  
  ctx.save();
  buttonPanel.src = "streetfighter-asset/image/brick_wall.png";
  ctx.translate(72, 0);
  ctx.rotate(Math.PI / 2);
  ctx.drawImage(buttonPanel, 0, 0, windowWidth * 2, 70);
  ctx.restore();
  
  ctx.save();
  //ctx.fillRect(10, 25, 55, 90);
  leftBtn.src = "streetfighter-asset/image/movebutton.png";
  ctx.translate(-125, 120);
  ctx.rotate(degree(270));
  ctx.drawImage(leftBtn, 0, 0, 100, 300);
  ctx.restore();
  
  ctx.save();
  //ctx.fillRect(10, 125, 55, 90);
  rightBtn.src = "streetfighter-asset/image/movebutton.png";
  ctx.translate(200, 120);
  ctx.rotate(degree(90));
  ctx.drawImage(rightBtn, 0, 0, 100, 300);
  ctx.restore();
  
  ctx.save();
  //ctx.fillRect(0, 457, 75, 50);
  jumpBtn.src = "streetfighter-asset/image/movebutton.png";
  ctx.drawImage(jumpBtn, 0, 320, 75, 300);
  ctx.restore();
  
  ctx.save();
  attackBtn.src = "streetfighter-asset/image/attackbutton.png";
  ctx.drawImage(attackBtn, -35, 410, 150, 300);
  ctx.restore();
}

function mainLoop(){
  requestAnimationFrame(mainLoop);
  ctx.clearRect(0, 0, windowWidth * 2, windowHeight);
  
  if(system == "gameplay"){
    drawBackground();
    drawCharacter();
  }
}

if(system == "gameplay"){
  touCheck();
}

mainLoop();