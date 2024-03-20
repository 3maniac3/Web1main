const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");

windowWidth = window.innerWidth;
windowHeight = window.innerHeight;

canvas.width = windowWidth;
canvas.height = windowHeight;
canvas.style.background = "white";

class Fighter{
  constructor(name, namedis, strength, facing, x, y){
    this.name = name;
    this.namedis = namedis;
    this.strength = strength;
    this.facing = facing;
    this.x = x;
    this.y = y;
    this.health = 100;
    this.alive = true;
    this.moveList = [];
    this.moveIdx = 0;
    this.moveCool = 0;
    this.jumpSprite = `streetfighter-asset/jump/${this.name}/sprite0.png`;
    this.gravity = "land";
    this.attackSprite = `streetfighter-asset/attack/${this.name}/sprite0.png`;
    this.attack = false;
    this.attackCool = 0;
    this.gotHitCool = 0;
    this.cooldown = 0;
    this.combo = 0;
    this.knockback = false;
    this.deadSprite = `streetfighter-asset/dead/${this.name}/sprite0.png`;
    
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
        //drawRect("rgb(0,0,255)", this.x - 80, this.y + 60, 20, 60);
        
        this.y ++;
        
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
        //drawRect("rgb(0,0,255)", this.x - 80, this.y - 20, 20, 60);
        
        this.y --;
        
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
  
  dead(){
    if(this.facing == "right"){
      ctx.save();
      let img = new Image();
      img.src = this.deadSprite;
      ctx.drawImage(img, 0, 0, img.width, img.height, this.x - 200, this.y - 100, 100, 180);
      ctx.restore();
    }
    else if(this.facing == "left"){
      ctx.save();
      let img = new Image();
      img.src = this.deadSprite;
      ctx.scale(1, -1);
      ctx.drawImage(img, 0, 0, img.width, img.height, this.x - 200, -this.y - 200, 100, 180);
      ctx.restore();
    }
  }
}

// background & anatomi
let backgroundIdx = Math.floor(Math.random() * (4 - 0) + 0);
let hitCool = 50;

// for the enemy
let enemyAttackCool = 20;
let enemyJumpPro = 0;
let enemyJumpAuto = false;

// buttons
const leftBtn = new Image();
const rightBtn = new Image();
const jumpBtn = new Image();
const attackBtn = new Image();
const pauseBtn = new Image();

let moveLeft = false;
let moveRight = false;

// pause button sections
let restartSec = false;
let leaveSec = false;

// characters
let player = new Fighter("rick_de_silva", "Rick de Silva", 2, "right", 260, 70);
let enemy = new Fighter("mike_tyson", "Mike Tyson", 5, "left", 260, 300);

const charNameBox = [
  {name: "rick_de_silva", namedis: "Rick de Silva", strength: 2},
  {name: "mike_tyson", namedis: "Mike Tyson", strength: 5},
  {name: "the_purple_guy", namedis: "The Purple Guy", strength: 1},
  {name: "steve", namedis: "Steve", strength: 3},
  {name: "none", namedis: "none", strength: 0},
];

const charSelectBox = [
  {x: 40, y: 100},
  {x: 40, y: 200},
  {x: 40, y: 300},
  {x: 40, y: 400},
  {x: 40, y: 500}
];

// system
let system = "character-select";

// sounds
let mainGameSound = new Audio("streetfighter-asset/sound/in_game_music.ogg");
let gameSound = true;

const degree = function(setDeg){
  return setDeg * Math.PI / 180;
}
const drawRect = function(color, x, y, dx, dy){
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, dx, dy);
  ctx.restore();
}
const playSound = function(sound){
  let audio = new Audio(sound);
  audio.play();
}

// selection
function charselTouch(){
  canvas.addEventListener("touchstart", e => {
    [...e.changedTouches].forEach(touch => {
      let x = touch.pageX;
      let y = touch.pageY;
      
      for(let i = 0; i < charSelectBox.length - 1; i++){
        if(x > charSelectBox[i].x && x < charSelectBox[i].x + 80 && y > charSelectBox[i].y && y < charSelectBox[i].y + 50){
          player.name = charNameBox[i].name;
          player.namedis = charNameBox[i].namedis;
          player.strength = charNameBox[i].strength;
        }
      }
    });
  });
}

function characterSelect(){
  let charselBg = new Image();
  let warehouse = new Image();
  let playerDis = new Image();
  let enemyDis = new Image();
  
  ctx.save();
  charselBg.src = "streetfighter-asset/image/charsel-bg.png";
  ctx.drawImage(charselBg, 150, 0, 210, 680);
  ctx.restore();
  
  ctx.save();
  playerDis.src = `streetfighter-asset/showpanel/${player.name}.png`;
  ctx.translate(362, -100);
  ctx.rotate(degree(90));
  ctx.drawImage(playerDis, 0, 0, 400, 180);
  ctx.restore();
  
  ctx.save();
  enemyDis.src = `streetfighter-asset/showpanel/${enemy.name}.png`;
  ctx.translate(362, 370);
  ctx.rotate(degree(90));
  ctx.drawImage(enemyDis, 0, 0, 400, 180);
  ctx.restore();
  
  ctx.save();
  ctx.scale(2, 2);
  ctx.translate(90, -8);
  ctx.rotate(degree(90));
  ctx.fillText(`${player.namedis}`, 10, 10);
  ctx.restore();
  
  ctx.save();
  ctx.scale(2, 2);
  ctx.translate(90, 230);
  ctx.rotate(degree(90));
  ctx.fillText(`${enemy.namedis}`, 10, 10);
  ctx.restore();
  
  ctx.save();
  ctx.fillStyle = "red";
  ctx.scale(2, 2);
  ctx.translate(105, 80);
  ctx.rotate(degree(90));
  ctx.fillText(`Strength: ${player.strength}`, 10, 10);
  ctx.restore();
  
  ctx.save();
  ctx.fillStyle = "red";
  ctx.scale(2, 2);
  ctx.translate(105, 177);
  ctx.rotate(degree(90));
  ctx.fillText(`Strength: ${enemy.strength}`, 10, 10);
  ctx.restore();
  
  ctx.save();
  warehouse.src = "streetfighter-asset/image/warehouse_bg.png";
  ctx.drawImage(warehouse, 0, 0, 150, 680);
  ctx.restore();
  
  for(let i = 0; i < charSelectBox.length; i++){
    ctx.save();
    ctx.fillStyle = "red";
    ctx.fillRect(charSelectBox[i].x, charSelectBox[i].y, 80, 50);
    ctx.restore();
  }
}

// main gameplay
function touCheck(){
  canvas.addEventListener("touchstart", e => {
    [...e.changedTouches].forEach(touch => {
      let x = touch.pageX;
      let y = touch.pageY;
      
      if(system == "gameplay"){
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
        // attack button
        if(x > 0 && x < 70 && y > 525 && y < 525 + 67 && !(player.knockback)){
          player.attack = true;
          hitDetect();
        }
        // pause button
        if(x > 318 && x < 318 + 40 && y > 314 && y < 314 + 40){
          system = "pauseMenu";
        }
      }
      
      if(system == "pauseMenu"){
        if(x > 260 && x < 260 + 40 && y > 490 && y < 490 + 60 && !(restartSec) && !(leaveSec)){
          system = "gameplay";
        }
        else if(x > 185 && x < 185 + 50 && y > 180 && y < 180 + 310 && !(restartSec) && !(leaveSec)){
          restartSec = true;
        }
        /*else if(x > 135 && x < 185 + 50 && y > 180 && y < 180 + 310 && !(restartSec) && !(leaveSec)){
          leaveSec = true;
        }*/
        else if(x > 160 && x < 160 + 70 && y > 255 && y < 255 + 150 && restartSec){
          restartSec = false;
        }
        else if(x > 115 && x < 115 + 35 && y > 280 && y < 280 + 95 && restartSec){
          player.y = 70;
          enemy.y = 300;
          player.health = 100;
          enemy.health = 100;
          player.alive = true;
          enemy.alive = true;
          restartSec = false;
          system = "gameplay";
        }
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

function pauseMenu(){
  ctx.save();
  let img = new Image();
  img.src = "streetfighter-asset/image/pausepanel.png";
  ctx.drawImage(img, 100, 70, 200, 500);
  //ctx.strokeRect(260, 490, 40, 60);
  //ctx.strokeRect(185, 180, 50, 310);
  //ctx.strokeRect(135, 180, 50, 310);
  ctx.restore();
  
  if(restartSec){
    ctx.save();
    let img = new Image();
    img.src = "streetfighter-asset/image/surepanel.png";
    ctx.drawImage(img, 50, -20, 300, 700);
    //ctx.strokeRect(160, 255, 70, 150);
    //ctx.strokeRect(115, 280, 35, 95);
    ctx.restore();
  }
  
  if(leaveSec){
    ctx.save();
    let img = new Image();
    img.src = "streetfighter-asset/image/surepanel.png";
    ctx.drawImage(img, 50, -20, 300, 700);
    ctx.restore();
  }
}

function winDetect(){
  gameSound = 1;
  playSound("streetfighter-asset/sound/punch_sound.ogg");
  
  //setTimeout(function(){
    //alert("test");
  //}, 3000);
}

function hitDetect(){
  // player hit and combo
  if(player.facing == "right" && enemy.alive){
    if(player.y < enemy.y && player.y > enemy.y - 100 && player.x < enemy.x + 50){
      enemy.health -= player.strength;
      enemy.y += 5;
      enemy.cooldown = hitCool;
      playSound("streetfighter-asset/sound/punch_sound.ogg");
      if(enemy.cooldown > 0){
        player.combo ++;
        enemy.knockback = true;
      }
      if(player.combo >= 5){
        enemy.health -= player.strength + 3;
        enemy.y += 200;
        enemy.dead();
        player.combo = 0;
        enemy.knockback = false;
      }
    }
    if(player.y < enemy.y && player.y > enemy.y - 100 && player.x > enemy.x + 50 && player.x < enemy.x + 70){
      enemy.health -= player.strength + 3;
      playSound("streetfighter-asset/sound/punch_sound.ogg");
    }
  }
  if(player.facing == "left" && enemy.alive){
    if(player.y > enemy.y && player.y < enemy.y + 100 && player.x < enemy.x + 50){
        enemy.health -= player.strength;
        enemy.y -= 5;
        enemy.cooldown = hitCool;
        playSound("streetfighter-asset/sound/punch_sound.ogg");
        if(enemy.cooldown > 0){
          player.combo ++;
          enemy.knockback = true;
        }
        if(player.combo >= 5){
          enemy.health -= player.strength + 3;
          enemy.y -= 200;
          enemy.dead();
          player.combo = 0;
          enemy.knockback = false;
        }
    }
    if(player.y > enemy.y && player.y < enemy.y + 100 && player.x > enemy.x + 50 && player.x < enemy.x + 70){
      enemy.health -= player.strength + 3;
      playSound("streetfighter-asset/sound/punch_sound.ogg");
    }
  }
}

function enemyMove(){
  if(enemy.y > player.y + 80 && enemy.alive){
    enemy.y -= 2;
    enemy.moveCool ++;
    if(enemy.moveCool > 10 && enemy.moveIdx == 0){
      enemy.moveIdx ++;
      enemy.moveCool = 0;
    }
    else if(enemy.moveCool > 10 && enemy.moveIdx == 1){
      enemy.moveIdx = 0;
      enemy.moveCool = 0;
    }
  }
  // enemy hit and combo
  if(enemy.facing == "right" && player.alive && enemy.attack && !(enemy.knockback) && enemy.alive){
    if(enemy.y < player.y && enemy.y > player.y - 80 && enemy.x < player.x + 30){
      player.health -= enemy.strength;
      player.y += 5;
      player.cooldown = hitCool;
      playSound("streetfighter-asset/sound/punch_sound.ogg");
      if(player.cooldown > 0){
        enemy.combo ++;
        player.knockback = true;
      }
      if(enemy.combo >= 15){
        player.health -= enemy.strength + 3;
        player.y += 200;
        enemy.combo = 0;
        player.knockback = false;
      }
    }
      if(enemy.y < player.y && enemy.y > player.y - 100 && enemy.x > player.x + 50 && enemy.x < player.x + 70){
        player.health -= enemy.strength + 3;
        playSound("streetfighter-asset/sound/punch_sound.ogg");
      }
  }
  if(enemy.facing == "left" && player.alive && enemy.attack && !(enemy.knockback) && enemy.alive){
    if(enemy.y > player.y && enemy.y < player.y + 80 && enemy.x < player.x + 30){
        player.health -= enemy.strength;
        player.y -= 5;
        player.cooldown = hitCool;
        playSound("streetfighter-asset/sound/punch_sound.ogg");
        if(player.cooldown > 0){
          enemy.combo ++;
          player.knockback = true;
        }
        if(enemy.combo >= 15){
          player.health -= enemy.strength + 3;
          player.y -= 200;
          enemy.combo = 0;
          player.knockback = false;
        }
    }
    if(enemy.y > player.y && enemy.y < player.y + 100 && enemy.x > player.x + 50 && enemy.x < player.x + 70){
      player.health -= enemy.strength + 3;
      playSound("streetfighter-asset/sound/punch_sound.ogg");
    }
  }
  
  if(enemy.y < player.y - 80 && enemy.alive){
    enemy.y += 2;
    enemy.moveCool ++;
    if(enemy.moveCool > 10 && enemy.moveIdx == 0){
      enemy.moveIdx ++;
      enemy.moveCool = 0;
    }
    else if(enemy.moveCool > 10 && enemy.moveIdx == 1){
      enemy.moveIdx = 0;
      enemy.moveCool = 0;
    }
  }
  
  if(enemy.y > player.y - 90 && enemy.y < player.y + 90 && enemy.alive){
    enemy.moveIdx = 0;
    if(!(enemyJumpAuto)){
      enemyJumpAuto = true;
      enemyJumpPro = Math.floor(Math.random() * (3 - 0) + 0);
      if(enemyJumpPro == 2 && enemy.gravity == "land"){
        enemy.gravity = "up";
      }
    }
    if(enemyAttackCool > 0){
      enemyAttackCool --;
    }
    else if(enemyAttackCool <= 0 && !(enemy.knockback)){
      enemy.attack = true;
      enemy.startAttack();
      enemyAttackCool = 20;
    }
  }
  else{
    enemyJumpAuto = false;
  }
}

function drawCharacter(){
  if(enemy.alive){
    enemy.update();
    enemy.startJump();
    enemy.startAttack();
  }
  else{
    enemy.dead();
    /*gameSound = false;
    mainGameSound.loop = false;
    mainGameSound.pause();
    mainGameSound.currentTime = 100;
    if(!(gameSound)){
      winDetect();
    }*/
  }
  
  if(player.alive){
    player.update();
    player.startJump();
    player.startAttack();
  }
  else{
    player.dead();
    /*gameSound = false;
    mainGameSound.loop = false;
    mainGameSound.pause();
    mainGameSound.currentTime = 100;
    winDetect();*/
  }
  
  if(player.y > enemy.y){
    if(player.alive){
      player.facing = "left";
    }
    if(enemy.alive){
      enemy.facing = "right";
    }
  }
  else{
    if(player.alive){
      player.facing = "right";
    }
    if(enemy.alive){
      enemy.facing = "left";
    }
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
  
  if(player.y < -20){
    player.y = 0;
  }
  if(player.y > windowWidth + 222){
    player.y = windowWidth + 210;
  }
  
  if(enemy.y < -20){
    enemy.y = 0;
  }
  if(enemy.y > windowWidth + 222){
    enemy.y = windowWidth + 210;
  }
  
  if(enemy.health <= 0 && enemy.x == 260){
    enemy.alive = false;
    enemy.health = 0;
  }
  if(player.health <= 0 && player.x == 260){
    player.alive = false;
    player.health = 0;
  }
  // enemy cooldowm
  if(enemy.cooldown > 0){
    enemy.cooldown --;
  }
  if(enemy.cooldown <= 0){
    player.combo = 0;
    enemy.knockback = false;
  }
  // player cooldown
  if(player.cooldown > 0){
    player.cooldown --;
  }
  if(player.cooldown <= 0){
    enemy.combo = 0;
    player.knockback = false;
  }
}

function drawPanel(){
  let personPanel = new Image();
  let playerPanel = new Image();
  let enemyPanel = new Image();
  
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
  drawRect("rgb(255,255,0)", 302, 600, 20, enemy.health * -2);
  
  ctx.save();
  playerPanel.src = `streetfighter-asset/showpanel/${player.name}.png`;
  ctx.translate(360, -430);
  ctx.rotate(degree(90));
  ctx.drawImage(playerPanel, 0, 0, playerPanel.width, playerPanel.height, 400, 0, 130, 70);
  ctx.restore();
  
  ctx.save();
  enemyPanel.src = `streetfighter-asset/showpanel/${enemy.name}.png`;
  ctx.translate(360, 175);
  ctx.rotate(degree(90));
  ctx.drawImage(enemyPanel, 0, 0, enemyPanel.width, enemyPanel.height, 400, 0, 130, 70);
  ctx.restore();
}

function drawBackground(){
  let background = new Image();
  let buttonPanel = new Image();
  
  ctx.save();
  background.src = `streetfighter-asset/image/background${backgroundIdx}.png`;
  ctx.translate(360, 0)
  ctx.rotate(degree(90));
  ctx.drawImage(background, 0, 0, 680, 290);
  ctx.restore();
  
  ctx.save();
  buttonPanel.src = "streetfighter-asset/image/brick_wall.png";
  ctx.translate(72, 0);
  ctx.rotate(degree(90));
  ctx.drawImage(buttonPanel, 0, 0, 680, 70);
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
  //ctx.fillRect(0, 525, 70, 67);
  attackBtn.src = "streetfighter-asset/image/attackbutton.png";
  ctx.drawImage(attackBtn, -35, 398, 150, 300);
  ctx.restore();
  
  ctx.save();
  //ctx.fillRect(318, 314, 40, 40);
  pauseBtn.src = "streetfighter-asset/image/pausebutton.png";
  ctx.translate(420, 275);
  ctx.rotate(degree(90));
  ctx.drawImage(pauseBtn, 0, 0, 120, 150);
  ctx.restore();
}

function mainLoop(){
  requestAnimationFrame(mainLoop);
  ctx.clearRect(0, 0, windowWidth * 2, windowHeight);
  
  switch(system){
    case "gameplay":
      drawBackground();
      drawCharacter();
      drawPanel();
      if(player.alive){
        enemyMove();
      }
      if(!(mainGameSound.play()) && gameSound){
        //mainGameSound.loop = true;
        mainGameSound.play();
      }
      break;
    
    case "pauseMenu":
      drawBackground();
      drawCharacter();
      drawPanel();
      pauseMenu();
      break;
      
    case "character-select":
      characterSelect();
      break;
  }
}

switch(system){
  case "gameplay":
    touCheck();
    break;
  
  case "character-select":
    charselTouch();
    break;
}

mainLoop();