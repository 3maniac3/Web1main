const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");

windowWidth = window.innerWidth;
windowHeight = window.innerHeight;

canvas.width = windowWidth;
canvas.height = windowHeight;
canvas.style.background = "white";

class Fighter{
  constructor(name, x, y, facing){
    this.name = name;
    this.x = x;
    this.y = y;
    this.facing = facing;
    this.moveList = [];
    this.moveIdx = 0;
    this.moveCool = 0;
    this.jump = `streetfighter-asset/jump/${this.name}/sprite0.png`;
    this.gravity = "up";
    
    for(let i = 0; i < 2; i ++){
      let img = `streetfighter-asset/move/${this.name}/sprite${i}.png`;
      this.moveList.push(img);
    }
  }
  
  update(){
    drawRect("rgb(0,255,0)", this.x - 175, this.y + 20, 130, 55);
    drawRect("rgb(255,0,0)", this.x - 45, this.y + 20, 30, 55);
    
    if(this.facing == "right"){
      ctx.save();
      let img = new Image();
      img.src = this.moveList[this.moveIdx];
      ctx.translate(this.x, this.y);
      ctx.rotate(degree(90));
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 100, 180);
      ctx.restore();
    }
    else if(this.facing == "left"){
      ctx.save();
      let img = new Image();
      img.src = this.moveList[this.moveIdx];
      ctx.scale(1, -1);
      ctx.translate(this.x, -this.y - 95);
      ctx.rotate(degree(90));
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 100, 180);
      ctx.restore();
    }
  }
  
  startJump(){
    if(this.gravity == "up"){
      if(this.x <= 320){
        this.x += 5;
      }
      else{
        this.gravity == "down";
      }
    }
    
    if(this.gravity == "down"){
      if(this.x >= 260){
        this.x -= 5;
      }
      else{
        gravity = "land";
      }
    }
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
let player = new Fighter("rick_de_silva", 260, 100, "right");

// system
let system = "gameplay";

const degree = function(setDeg){
  return setDeg * Math.PI / 180;
}
const drawRect = function(color, x, y, dx, dy){
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, dx, dy);
  ctx.restore();
}

function touCheck(){
  canvas.addEventListener("touchstart", e => {
    [...e.changedTouches].forEach(touch => {
      let x = touch.pageX;
      let y = touch.pageY;
      
      // right button
      if(x > 10 && x < 10 + 55 && y > 125 && y < 125 + 90){
        moveRight = true;
        player.facing = "right";
      }
      // left button
      if(x > 10 && x < 10 + 55 && y > 25 && y < 25 + 90){
        moveLeft = true;
        player.facing = "left";
      }
      // jump button
      if(x > 0 && x < 320 && y > 75 && y < 300 - 75){
        player.gravity = "up";
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
  //player.startJump();
  
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
  //ctx.scale(1, 1);
  ctx.translate(360, 0)
  ctx.rotate(degree(90));
  ctx.drawImage(background, 0, 0, 670, 290);
  ctx.restore();
  
  ctx.save();
  buttonPanel.src = "streetfighter-asset/image/brick_wall.png";
  ctx.translate(72, 0);
  ctx.rotate(degree(90));
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
  ctx.drawImage(jumpBtn, 0, windowHeight - 348, 75, 300);
  ctx.restore();
  
  ctx.save();
  attackBtn.src = "streetfighter-asset/image/attackbutton.png";
  ctx.drawImage(attackBtn, -35, windowHeight - 240, 150, 300);
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