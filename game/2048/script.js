const info = document.getElementById("info");
const score = document.getElementById("score");
const highScore = document.getElementById("high-score");
const gameBone = document.querySelector(".game-bone");
const gameLayer = document.querySelector(".game-layer");

const radius = 50;
let startX, startY, moveX, moveY;
let point = 0, highPoint = 0;

window.addEventListener("load", () => { 
    innerSub(); getScore(); generate(2); repaint(); 
});

window.addEventListener("touchstart", touch);
window.addEventListener("touchmove", swipe);
window.addEventListener("touchend", move);
window.addEventListener("keypress", keyPressed);

function innerSub() {
    for (let i = 0; i < 16; i++) {
        const bone = document.createElement("div");
        const layer = document.createElement("div");
        bone.classList.add("bone");
        layer.classList.add("layer");
        gameBone.appendChild(bone);
        gameLayer.appendChild(layer);
    }
}

function getScore() {
    highPoint = localStorage.getItem("highScore");
    if (highPoint != "") highScore.textContent = highPoint;
}

function generate(times) {
    const boxes = [...document.querySelectorAll(".box")].filter(x => x.textContent == "");
    
    for (let i = 0; i < times; i++) {
        if (boxes.length == 0) break;
        let persentage = 1;
        const index = Math.floor(Math.random() * (boxes.length - 0) + 0);
        if (times == 1) persentage = Math.floor(Math.random() * (11 - 1) + 1);
        boxes[index].textContent = persentage < 10 ? 2 : 4;
        boxes[index].style.animation = "newBox .3s linear";
        boxes.splice(index, 1);
    }
}
    
function repaint() {
    [...document.querySelectorAll(".box")].forEach(x => {
        const number = Number(x.textContent);
        x.classList.remove("lock");
        x.style.boxShadow = "none";
        if (number == 2) {
            x.style.color = "#000";
            x.style.backgroundColor = "#efe7dc";
        } else if (number == 4) {
            x.style.color = "#000";
            x.style.backgroundColor = "#f3dec3";
        } else if (number == 8) {
            x.style.color = "#000";
            x.style.backgroundColor = "#fbd29c";
        } else if (number == 16) {
            x.style.color = "#000";
            x.style.backgroundColor = "#fbd173";
        } else if (number == 32) {
            x.style.color = "#fff";
            x.style.backgroundColor = "#fc744e";
        } else if (number == 64) {
            x.style.color = "#fff";
            x.style.backgroundColor = "#f74b1b";
        } else if (number == 128) {
            x.style.boxShadow = "0 0 10px #fcd988";
            x.style.color = "#fff";
            x.style.backgroundColor = "#fcd988";
        } else if (number == 256) {
            x.style.boxShadow = "0 0 10px #f7dd7e";
            x.style.color = "#fff";
            x.style.backgroundColor = "#f7dd7e";
        } else if (number == 512) {
            x.style.boxShadow = "0 0 20px #f2c659";
            x.style.color = "#fff";
            x.style.backgroundColor = "#f2c659";
        } else if (number == 1024) {
            x.style.boxShadow = "0 0 20px #fac332";
            x.style.color = "#fff";
            x.style.backgroundColor = "#fac332";
        } else if (number == 2048) {
            x.style.boxShadow = "0 0 30px #feb316";
            x.style.color = "#fff";
            x.style.backgroundColor = "#feb316";
        } else if (number > 2048) {
            x.style.color = "#fff";
            x.style.backgroundColor = "#000";
        } else {
            x.style.backgroundColor = "#ccc0b3";
        }
    });
}

function touch(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    [...document.querySelectorAll(".box")].forEach(x => x.style.animation = "none");
}

function swipe(e) {
    if (info.classList.contains("beggining")) info.style.display = "none";
    else if (info.classList.contains("win")) info.style.display = "none";
    moveX = e.touches[0].clientX;
    moveY = e.touches[0].clientY;
}

function move(e) {
    const boxes = document.querySelectorAll(".box")
    if (moveX > startX + radius) operate(boxes, [2, 6, 10, 14], 3, 1, "right");
    else if (moveX < startX - radius) operate(boxes, [1, 5, 9, 13], 3, 1, "left");
    else if (moveY > startY + radius) operate(boxes, [8, 9, 10, 11], 12, 4, "down");
    else if (moveY < startY - radius) operate(boxes, [4, 5, 6, 7], 12, 4, "up");
}

function keyPressed(e) {
    const boxes = document.querySelectorAll(".box")
    if (info.classList.contains("beggining")) info.style.display = "none";
    if (e.key == "d") operate(boxes, [2, 6, 10, 14], 3, 1, "right");
    else if (e.key == "a") operate(boxes, [1, 5, 9, 13], 3, 1, "left");
    else if (e.key == "s") operate(boxes, [8, 9, 10, 11], 12, 4, "down");
    else if (e.key == "w") operate(boxes, [4, 5, 6, 7], 12, 4, "up");
}

function operate(box, index, range, step, move) {
    const layers = document.querySelectorAll(".layer");
    console.log(layers);
    let next = false;
    for (let i of index) {
        for (let t = 0; t < 3; t++) {
            for (let j = 0; j < range; j += step) {
                if (move == "up" || move == "left") {
                    if (box[i+j].textContent == "") continue;
                    else if (box[i+j-step].textContent == "") {
                        box[i+j-step].textContent = box[i+j].textContent;
                        box[i+j].textContent = "";
                        next = true;
                    } else if (box[i+j].textContent == box[i+j-step].textContent && !box[i+j-step].classList.contains("lock")) {
                        if (box[i+j].classList.contains("lock")) continue;
                        point += Number(box[i+j].textContent);
                        box[i+j-step].textContent = Number(box[i+j].textContent) + Number(box[i+j-step].textContent);
                        box[i+j-step].classList.add("lock");
                        box[i+j].textContent = "";
                        next = true;
                    }
                } else if (move == "down" || move == "right") {
                    if (box[i-j].textContent == "") continue;
                    else if (box[i-j+step].textContent == "") {
                        box[i-j+step].textContent = box[i-j].textContent;
                        box[i-j].textContent = "";
                        next = true;
                    } else if (box[i-j].textContent == box[i-j+step].textContent && !box[i-j+step].classList.contains("lock")) {
                        if (box[i-j].classList.contains("lock")) continue;
                        point += Number(box[i-j].textContent);
                        box[i-j+step].textContent = Number(box[i-j].textContent) + Number(box[i-j+step].textContent);
                        box[i-j+step].classList.add("lock");
                        box[i-j].textContent = "";
                        next = true;
                    }
                }
            }
        }
    }
    if (next) generate(1);
    repaint();
    scoreOperate();
    finalCheck();
}

function scoreOperate() {
    score.textContent = point;
    if (highPoint < point){
        highPoint = point;
        highScore.textContent = highPoint;
    }
}

function finalCheck() {
    const boxes = document.querySelectorAll(".box");
    for (let x of boxes) {
        if (Number(x.textContent) >= 2048) {
            info.textContent = "Victorious!";
            info.setAttribute("class", "win");
            info.style.display = "block";
            return;
        }
    }
    for (let x of boxes) {
        if (x.textContent == "") return;
    } for (let i = 0; i < boxes.length; i++) {
        if (i == 3 || i == 7 || i == 11 || i == 15) continue;
        if (boxes[i].textContent == boxes[i+1].textContent) return;
    } for (let i = 0; i < boxes.length; i++) {
        if (i == 12 || i == 13 || i == 14 || i == 15) continue;
        if (boxes[i].textContent == boxes[i+4].textContent) return;
    }
    if (point > localStorage.getItem("highScore")) localStorage.setItem("highScore", point);
    info.textContent = "Game Over!";
    info.setAttribute("class", "lose");
    info.style.display = "block";
}

function reset() {
    [...document.querySelectorAll(".box")].forEach(x => {
        x.textContent = "";
        x.style.backgroundColor = "#ccc0b3";
    });
    info.textContent = "Swipe to start";
    info.setAttribute("class", "beggining");
    info.style.display = "block";
    point = 0;
    score.textContent = point;
    generate(2);
    repaint();
}