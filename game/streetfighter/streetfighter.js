const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");

windowWidth = window.innerWidth;
windowHeight = window.innerHeight;

canvas.width = windowWidth;
canvas.height = windowHeight;
canvas.style.background = "white";

class Fighter{
  constructor(name, namedis, facing, x, y){
    this.name = name;
    this.namedis = namedis;
    this.facing = facing;
    this.x = x;
    this.y = y;
    this.health = 100;
    this.moveList = [];
    this.moveIdx = 0;
    this.moveCool = 0;
    this.jumpSprite = `streetfighter-asset/jump/${this.name}/sprite0.png`;
    this.gravity = "land";
    this.attackSprite = `streetfighter-asset/attack/${this.name}/sprite0.png`;
    this.attack = false;
    this.attackCool = 0;
    
    for(let i = 0; i < 2; i ++){
      let img = `streetfighter-asset/move/${this.name}/sprite${i}.png`;
      this.moveList.push(img);
    }
  }
  
  update(){
    //drawRect("rgb(0,255,0)", this.x - 175, this.y + 20, 130, 55);
    //drawRect("rgb(255,0,0)", this.x - 45, this.y + 20, 30, 55);
    
    if(this.facing == "right" && this.gravity == "land" && !(this.attack)){
      ctx.save();
      let img = new Image();
      img.src = this.moveList[this.moveIdx];
      ctx.translate(this.x, this.y);
      ctx.rotate(degree(90));
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 100, 180);
      ctx.restore();
    }
    else if(this.facing == "left" && this.gravity == "land" && !(this.attack)){
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
      if(this.x <= 360){
        this.x += 5;
        if(this.facing == "right"){
          ctx.save();
          let img = new Image();
          img.src = this.jumpSprite;
          ctx.translate(this.x, this.y);
          ctx.rotate(degree(90));
          ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 100, 180);
          ctx.restore();
        }
        else if(this.facing == "left"){
          ctx.save();
          let img = new Image();
          img.src = this.jumpSprite;
          ctx.scale(1, -1);
          ctx.translate(this.x, -this.y - 95);
          ctx.rotate(degree(90));
          ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 100, 180);
          ctx.restore();
        }
      }
      else{
        this.gravity = "down";
      }
    }
    
    if(this.gravity == "down"){
      if(this.x > 260){
        this.x -= 5;
        if(this.facing == "right"){
          ctx.save();
          let img = new Image();
          img.src = this.jumpSprite;
          ctx.translate(this.x, this.y);
          ctx.rotate(degree(90));
          ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 100, 180);
          ctx.restore();
        }
        else if(this.facing == "left"){
          ctx.save();
          let img = new Image();
          img.src = this.jumpSprite;
          ctx.scale(1, -1);
          ctx.translate(this.x, -this.y - 95);
          ctx.rotate(degree(90));
          ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 100, 180);
          ctx.restore();
        }
      }
      else if(this.x == 260){
        this.gravity = "land";
      }
    }
  }
  
  startAttack(){
    if(this.attack){
      if(this.facing == "right"){
        drawRect("rgb(0,0,255)", this.x - 80, this.y + 60, 20, 60);
        
        ctx.save();
          let img = new Image();
          img.src = this.attackSprite;
          ctx.translate(this.x, this.y);
          ctx.rotate(degree(90));
          ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 100, 180);
          ctx.restore();
          
        this.attackCool ++;
        if(this.attackCool >= 5){
          this.attack = false;
          this.attackCool = 0;
        }
      }
      else if(this.facing == "left"){
        drawRect("rgb(0,0,255)", this.x - 80, this.y - 20, 20, 60);
        
        ctx.save();
          let img = new Image();
          img.src = this.attackSprite;
          ctx.scale(1, -1);
          ctx.translate(this.x, -this.y - 95);
          ctx.rotate(degree(90));
          ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 100, 180);
          ctx.restore();
          
        this.attackCool ++;
        if(this.attackCool >= 5){
          this.attack = false;
          this.attackCool = 0;
        }
      }
    }
  }
}

// background
let backgroundIdx = Math.floor(Math.random() * (4 - 0) + 0);

// buttons
const leftBtn = new Image();
const rightBtn = new Image();
const jumpBtn = new Image();
const attackBtn = new Image();

let moveLeft = false;
let moveRight = false;

// characters
let player = new Fighter("rick_de_silva", "Rick de Silva", "right", 260, 70);
let enemy = new Fighter("mike_tyson", "Mike Tyson", "left", 260, 500);

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
      }
      // left button
      if(x > 10 && x < 10 + 55 && y > 25 && y < 25 + 90){
        moveLeft = true;
      }
      // jump button
      if(x > 0 && x < 75 && y > 457 && y < 457 + 50 && player.gravity == "land"){
        player.gravity = "up";
      }
      if(x > 0 && x < 70 && y > 525 && y < 525 + 67){
        player.attack = true;
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
  enemy.update();
  
  player.startJump();
  enemy.startJump();
  
  player.startAttack();
  
  if(player.y > enemy.y){
    player.facing = "left";
    enemy.facing = "right";
  }
  else{
    player.facing = "right";
    enemy.facing = "left";
  }
  
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
  
  if(moveRight && !(player.y > windowWidth + 220)){
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

function drawPanel(){
  let personPanel = new Image();
  
  ctx.save();
  personPanel.src = "streetfighter-asset/Image/personpanel.png";
  ctx.drawImage(personPanel, 280, 0, 80, 280);
  ctx.restore();
  
  ctx.save();
  personPanel.src = "streetfighter-asset/Image/personpanel.png";
  ctx.scale(1, -1);
  ctx.drawImage(personPanel, 0, 0, personPanel.width, personPanel.height, 280, -390, 80, -280);
  ctx.restore();
  
  ctx.save();
  ctx.scale(2, 2);
  ctx.translate(178, 25);
  ctx.rotate(degree(90));
  ctx.fillText(`${player.namedis}`, 10, 10);
  ctx.restore();
  
  ctx.save();
  ctx.scale(2, 2);
  ctx.translate(178, 190);
  ctx.rotate(degree(90));
  ctx.fillText(`${enemy.namedis}`, 10, 10);
  ctx.restore();
  
  // player health
  drawRect("rgb(255,0,0)", 302, 70, 20, 200);
  drawRect("rgb(255,255,0)", 302, 70, 20, player.health * 2);
  
  // enemy health
  drawRect("rgb(255,0,0)", 302, 400, 20, 200);
  drawRect("rgb(255,255,0)", 302, 400, 20, enemy.health * 2);
}

function drawBackground(){
  let background = new Image();
  let buttonPanel = new Image();
  
  ctx.save();
  background.src = `streetfighter-asset/image/background${backgroundIdx}.png`;
  //ctx.scale(1, 1);
  ctx.translate(360, 0)
  ctx.rotate(degree(90));
  ctx.drawImage(background, 0, 0, 680, 290);
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
  //ctx.fillRect(0, 525, 70, 67);
  attackBtn.src = "streetfighter-asset/image/attackbutton.png";
  ctx.drawImage(attackBtn, -35, windowHeight - 270, 150, 300);
  ctx.restore();
}

function mainLoop(){
  requestAnimationFrame(mainLoop);
  ctx.clearRect(0, 0, windowWidth * 2, windowHeight);
  
  if(system == "gameplay"){
    drawBackground();
    drawCharacter();
    drawPanel();
  }
}

switch(system){
  case "gameplay":
    touCheck();
}

mainLoop();