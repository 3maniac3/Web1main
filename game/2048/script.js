const info = document.getElementById("info");

const radius = 50;
let startX, startY, moveX, moveY;

window.addEventListener("load", () => { generate(2); repaint() });
window.addEventListener("touchstart", touch);
window.addEventListener("touchmove", swipe);
window.addEventListener("touchend", move);
window.addEventListener("keypress", keyPressed);

function generate(times) {
    const boxes = [...document.querySelectorAll(".box")].filter(x => x.textContent == "");
    
    for (let i = 0; i < times; i++) {
        if (boxes.length == 0) break;
        const index = Math.floor(Math.random() * (boxes.length - 0) + 0);
        boxes[index].textContent = 2;
        boxes.splice(index, 1);
    }
}
    
function repaint() {
    [...document.querySelectorAll(".box")].forEach(x => {
        const number = x.textContent;
        x.classList.remove("lock");
        x.style.color = "#000";
        x.style.backgroundColor = "#eaeaea";
        
        switch (number) {
            case "2":
                x.style.backgroundColor = "#efe7dc";
                break;
            case "4":
                x.style.backgroundColor = "#f3dec3";
                break;
            case "8":
                x.style.backgroundColor = "#fbd29c";
                break;
            case "16":
                x.style.backgroundColor = "#fbd173";
                break;
            case "32":
                x.style.backgroundColor = "#fc744e";
                break;
            case "64":
                x.style.backgroundColor = "#f74b1b";
                break;
            case "128":
                x.style.backgroundColor = "#fcd988";
                break;
            case "256":
                x.style.backgroundColor = "#f7dd7e";
                break;
            case "512":
                x.style.backgroundColor = "#f2c659";
                break;
            case "1024":
                x.style.backgroundColor = "#fac332";
                break;
            case "2048":
                x.style.backgroundColor = "#feb316";
                break;
        }
    });
}

function touch(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
}

function swipe(e) {
    if (info.classList.contains("beggining")) info.style.display = "none";
    document.querySelector("body").requestFullscreen();
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
    if (info.style.display != "none") info.style.display = "none";
    
    if (e.key == "d") operate(boxes, [2, 6, 10, 14], 3, 1, "right");
    else if (e.key == "a") operate(boxes, [1, 5, 9, 13], 3, 1, "left");
    else if (e.key == "s") operate(boxes, [8, 9, 10, 11], 12, 4, "down");
    else if (e.key == "w") operate(boxes, [4, 5, 6, 7], 12, 4, "up");
}

function operate(box, index, range, step, move) {
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
                        box[i-j+step].textContent = Number(box[i-j].textContent) + Number(box[i-j+step].textContent);
                        box[i-j+step].classList.add("lock");
                        box[i-j].textContent = "";
                        next = true;
                    }
                }
            }
        }
    }
    
    repaint();
    if (next) generate(1);
    finalCheck();
}

function finalCheck() {
    const boxes = document.querySelectorAll(".box");
    
    for (let x of boxes) {
        if (Number(x.textContent) >= 2048) {
            info.textContent = "Victorious!";
            info.setAttribute("class", "win");
            info.style.display = "block";
        }
    }
    
    for (let x of boxes) {
        if (x.textContent == "") return;
    }
    
    for (let i = 0; i < boxes.length; i++) {
        if (i == 3 || i == 7 || i == 11 || i == 15) continue;
        if (boxes[i].textContent == boxes[i+1].textContent) return;
    } 
    for (let i = 0; i < boxes.length; i++) {
        if (i == 12 || i == 13 || i == 14 || i == 15) continue;
        if (boxes[i].textContent == boxes[i+4].textContent) return;
    }
    
    info.textContent = "Game Over!";
    info.setAttribute("class", "lose");
    info.style.display = "block";
}

function reset() {
    [...document.querySelectorAll(".box")].forEach(x => {
        x.textContent = "";
        x.style.backgroundColor = "#eaeaea";
    });
    generate(2);
}