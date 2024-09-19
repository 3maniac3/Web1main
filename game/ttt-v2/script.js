// importments
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";

import { getDatabase, ref, set, get, child, update, onValue, remove } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDpSwD1-OYix6Q4xFbGilpDC1GANcFpIdw",
  authDomain: "tic-tac-toe-134f5.firebaseapp.com",
  databaseURL: "https://tic-tac-toe-134f5-default-rtdb.firebaseio.com",
  projectId: "tic-tac-toe-134f5",
  storageBucket: "tic-tac-toe-134f5.appspot.com",
  messagingSenderId: "282110701941",
  appId: "1:282110701941:web:ca9743ec5fd428775e633c"
};

// initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// elements
const menuBox = document.querySelector(".menu-box");
const createRoom = document.querySelector(".create-room");
const joinRoom = document.querySelector(".join-room");
const back = document.querySelectorAll(".back");

const createBox = document.querySelector(".create-box");
const idVal = document.querySelector(".id");
const nameVal = document.querySelector(".create-name");
const generate = document.querySelector(".generate");
const create = document.querySelector(".create");

const joinBox = document.querySelector(".join-box");
const idInput = document.querySelector(".id-input");
const joinName = document.querySelector(".join-name");
const roomInfo = document.querySelector(".room-info");
const join = document.querySelector(".join");

const waitBox = document.querySelector(".wait-box");

const container = document.querySelector(".container");
const tttBox = document.querySelector(".ttt-box");
const squares = document.querySelectorAll(".square");

const playerBox = document.querySelectorAll(".player-box");
const persons = document.querySelectorAll(".person");
const iconYou = document.querySelector(".icon-you")
const nameYou = document.querySelector(".name-you");
const iconElse = document.querySelector(".icon-else")
const nameElse = document.querySelector(".name-else");
const turnBox = document.querySelector(".turn-box");
const returnBox = document.querySelector(".return-box");

// variables
let player, idVar, icon, turn;

// event handlers
window.addEventListener("load", () => {
  generateId();
});

createRoom.addEventListener("click", () => {
  menuBox.style.display = "none";
  createBox.style.display = "flex";
});

joinRoom.addEventListener("click", () => {
  menuBox.style.display = "none";
  joinBox.style.display = "flex";
});

generate.addEventListener("click", () => {
  generateId();
});

nameVal.addEventListener("focus", () => {
  nameVal.classList.remove("error");
  nameVal.placeholder = "enter your name"
});

idInput.addEventListener("focus", () => {
  roomInfo.style.display = "none";
  roomInfo.textContent = "room is not found!";
  idInput.classList.remove("error");
  idInput.placeholder = "enter room id";
});

joinName.addEventListener("focus", () => {
  joinName.classList.remove("error");
  joinName.placeholder = "enter your name";
});

create.addEventListener("click", () => {
  if(nameVal.value == ""){
    nameVal.classList.add("error");
    nameVal.placeholder = "name cannot be empty!";
  } else createRoomDb();
});

join.addEventListener("click", () => {
  if(idInput.value == ""){
    roomInfo.style.display = "none";
    roomInfo.textContent = "room is not found!";
    idInput.classList.add("error");
    idInput.placeholder = "this cannot be empty!"
  }
  if(joinName.value == ""){
    roomInfo.style.display = "none";
    roomInfo.textContent = "room is not found!";
    joinName.classList.add("error");
    joinName.placeholder = "this cannot be empty!"
    return;
  }
  getRoomDb();
})

back.forEach(i => {
  i.addEventListener("click", () => {
    player = "";
    idVar = "";
    nameVal.value = "";
    idInput.value = "";
    joinName.value = "";
    roomInfo.style.display = "none";
    createBox.style.display = "none";
    joinBox.style.display = "none";
    menuBox.style.display = "flex";
  });
});

returnBox.addEventListener("click", () => {
  player = "";
  idVar = "";
  nameVal.value = "";
  idInput.value = "";
  joinName.value = "";
  roomInfo.style.display = "none";
  createBox.style.display = "none";
  joinBox.style.display = "none";
  container.style.display = "none";
  returnBox.style.display = "none";
  menuBox.style.display = "flex";
  persons.forEach(person => {
    person.classList.remove("win");
    person.classList.remove("lose");
  });
  squares.forEach(sqr => {
    sqr.style.background = "transparent";
  });
  generateId();
});

// functions
function randNum(min, max){
  return Math.floor(Math.random() * (max - min) + min);
}

function generateId(){
  let id = "";
  const numbers = "0123456789";
  for(let i = 0; i < 5; i++){
    id += numbers[randNum(0, numbers.length - 1)];
  }
  idVal.value = id;
}

function createRoomDb(){
  player = nameVal.value;
  idVar = idVal.value;
  set(ref(db, `server/room-${idVar}`), {
    "turn": "player1",
    "player1": {
      "name": nameVal.value,
      "icon": "x"
    },
    "map": [
      "", "", "",
      "", "", "",
      "", "", ""
    ]
  });
  createBox.style.display = "none";
  waitBox.style.display = "flex";
}

function getRoomDb(){
  idVar = idInput.value;
  player = joinName.value;
  const stCheck = new Promise(y => {
    onValue(ref(db, `server/room-${idVar}`), ss => {
      if(!ss.exists()){
        roomInfo.style.display = "block";
      } else y(true);
    });
  });
  const ndCheck = new Promise(y => {
    onValue(ref(db, `server/room-${idVar}/player2`), ss => {
      if(ss.exists()){
        roomInfo.textContent = "room is full!";
        roomInfo.style.display = "block";
      } else y(true);
    });
  });
  
  stCheck.then(() => { return ndCheck; })
  .then(() => updateDb())
  .catch(() => idVar = "");
  
  function updateDb(){
    update(ref(db, `server/room-${idVar}`), {
      "player2": {
        "name": player,
        "icon": "o"
      }
    })
    roomInfo.textContent = "joined!";
    roomInfo.style.color = "#1cc31c";
    setTimeout(() => {
      joinBox.style.display = "none";
      container.style.display = "flex";
      turnBox.style.display = "flex";
    }, 300);
  }
}

function waitForDb(){
  const joinBoxDis = joinBox.style.display;
  if(joinBoxDis == "flex") return;
  onValue(ref(db, `server/room-${idVar}/player2`), ss => {
    if(ss.exists()){
      waitBox.style.display = "none";
      container.style.display = "flex";
      turnBox.style.display = "flex";
    }
  });
}

function doActionDb(e){
  const id = Number(e.srcElement.id);
  get(child(ref(db), `server/room-${idVar}/map`)).then(ss => {
    const data = ss.val()[id];
    if(data == ""){
      if(id == "0"){
        update(ref(db, `server/room-${idVar}/map`), { "0": icon });
        nxTurn();
      }
      else if(id == "1"){
        update(ref(db, `server/room-${idVar}/map`), { "1": icon });
        nxTurn();
      }
      else if(id == "2"){
        update(ref(db, `server/room-${idVar}/map`), { "2": icon });
        nxTurn();
      }
      else if(id == "3"){
        update(ref(db, `server/room-${idVar}/map`), { "3": icon });
        nxTurn();
      }
      else if(id == "4"){
        update(ref(db, `server/room-${idVar}/map`), { "4": icon });
        nxTurn();
      }
      else if(id == "5"){
        update(ref(db, `server/room-${idVar}/map`), { "5": icon });
        nxTurn();
      }
      else if(id == "6"){
        update(ref(db, `server/room-${idVar}/map`), { "6": icon });
        nxTurn();
      }
      else if(id == "7"){
        update(ref(db, `server/room-${idVar}/map`), { "7": icon });
        nxTurn();
      }
      else if(id == "8"){
        update(ref(db, `server/room-${idVar}/map`), { "8": icon });
        nxTurn();
      }
    } 
  });
  function nxTurn(){
    get(child(ref(db), `server/room-${idVar}/turn`)).then(ss => {
      if(ss.exists()){
        if(turn == "player1"){
          update(ref(db, `server/room-${idVar}`), {
            "turn": "player2"
          });
        }
        else if(turn == "player2"){
          update(ref(db, `server/room-${idVar}`), {
            "turn": "player1"
          });
        }
      }
    });
  }
  squares.forEach(sqr => {
    sqr.removeEventListener("click", doActionDb);
  });
}

function gameRunDb(){
  onValue(ref(db, `server/room-${idVar}`), ss => {
    const data = ss.val();
    if(ss.exists()){
      try{
        if(data.player1.name == player){
          turn = "player1";
          icon = data.player1.icon;
          iconYou.textContent = data.player1.icon;
          nameYou.textContent = data.player1.name;
          iconElse.textContent = data.player2.icon;
          nameElse.textContent = data.player2.name;
        }
        else if(data.player2.name == player){
          turn = "player2";
          icon = data.player2.icon;
          iconYou.textContent = data.player2.icon;
          nameYou.textContent = data.player2.name;
          iconElse.textContent = data.player1.icon;
          nameElse.textContent = data.player1.name;
        }
      } catch(e){}
    }
  })
}

function gamePlayDb(){
  onValue(ref(db, `server/room-${idVar}/map`), ss => {
    if(ss.exists()){
      ss.val().forEach((d, i) => {
        squares[i].textContent = d;
      });
    }
  });
  onValue(ref(db, `server/room-${idVar}/turn`), ss => {
    if(ss.val() == turn){
      squares.forEach(sqr => {
        sqr.addEventListener("click", doActionDb);
      });
    } else{
      squares.forEach(sqr => {
        sqr.removeEventListener("click", doActionDb);
      });
    }
    if(ss.val() == "player1") turnBox.textContent = "x's turn";
    else if(ss.val() == "player2") turnBox.textContent = "o's turn";
    if(ss.val() == turn){
      playerBox[0].style.background = "#87fb87";
      playerBox[1].style.background = "";
    } 
    else if(ss.val() != "none"){
      playerBox[1].style.background = "#87fb87";
      playerBox[0].style.background = "";
    }
  });
}

function checkWinnerDb(){
  onValue(ref(db, `server/room-${idVar}`), ss => {
    if(!ss.exists()) return;
    const data = ss.val().map;
    // horizontal
    if(data[0] == "x" && data[1] == "x" && data[2] == "x") 
    winner([0, 1, 2], "x");
    else if(data[3] == "x" && data[4] == "x" && data[5] == "x") 
    winner([3, 4, 5], "x");
    else if(data[6] == "x" && data[7] == "x" && data[8] == "x")
    winner([6, 7, 8], "x");
    // vertical
    if(data[0] == "x" && data[3] == "x" && data[6] == "x") 
    winner([0, 3, 6], "x");
    else if(data[1] == "x" && data[4] == "x" && data[7] == "x") 
    winner([1, 4, 7], "x");
    else if(data[2] == "x" && data[5] == "x" && data[8] == "x")
    winner([2, 5, 8], "x");
    // diagonal
    if(data[0] == "x" && data[4] == "x" && data[8] == "x") 
    winner([0, 4, 8], "x");
    else if(data[2] == "x" && data[4] == "x" && data[6] == "x") 
    winner([2, 4, 6], "x");
    
    // horizontal
    if(data[0] == "o" && data[1] == "o" && data[2] == "o") 
    winner([0, 1, 2], "o");
    else if(data[3] == "o" && data[4] == "o" && data[5] == "o") 
    winner([3, 4, 5], "o");
    else if(data[6] == "o" && data[7] == "o" && data[8] == "o")
    winner([6, 7, 8], "o");
    // vertical
    if(data[0] == "o" && data[3] == "o" && data[6] == "o") 
    winner([0, 3, 6], "o");
    else if(data[1] == "o" && data[4] == "o" && data[7] == "o") 
    winner([1, 4, 7], "o");
    else if(data[2] == "o" && data[5] == "o" && data[8] == "o")
    winner([2, 5, 8], "o");
    // diagonal
    if(data[0] == "o" && data[4] == "o" && data[8] == "o") 
    winner([0, 4, 8], "o");
    else if(data[2] == "o" && data[4] == "o" && data[6] == "o") 
    winner([2, 4, 6], "o");
  });
  function winner(li, icn){
    if(icn == icon){
      squares[li[0]].style.background = "#87fb87";
      squares[li[1]].style.background = "#87fb87";
      squares[li[2]].style.background = "#87fb87";
      persons[0].classList.add("win");
      persons[1].classList.add("lose");
      playerBox[0].style.background = "transparent";
      playerBox[1].style.background = "transparent";
    } else{
      squares[li[0]].style.background = "#ff0000";
      squares[li[1]].style.background = "#ff0000";
      squares[li[2]].style.background = "#ff0000";
      persons[1].classList.add("win");
      persons[0].classList.add("lose");
      playerBox[0].style.background = "transparent"
      playerBox[1].style.background = "transparent"
    }
    turnBox.style.display = "none";
    returnBox.style.display = "flex";
  }
}

// main function
function main(){
  requestAnimationFrame(main);
  
  // code
  waitForDb();
  gameRunDb();
  gamePlayDb();
  checkWinnerDb();
}

main();