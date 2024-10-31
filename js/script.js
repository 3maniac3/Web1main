const funPanel = document.querySelector(".fun-panel");
const gifDisplay = document.getElementById("gif-display");
const appContainer = document.querySelector(".app-container");
const gameContainer = document.querySelector(".game-container");

window.addEventListener("load", showFunPanel);

function showFunPanel() {
    const month = new Date;
    
    gifDisplay.style.background = `url("asset/gif/${month.getMonth()+1}.gif")`;
    gifDisplay.style.backgroundSize = "100% 100%";
    gifDisplay.style.backgroundRepeat = "no-repeat";
    funPanel.classList.add("show");
    
    loadFeatures();
}

function loadFeatures() {
    const features = fetch("../collection/data.json").then(data => data.json());
    features.then(item => {
        const apps = item.apps;
        const games = item.games;
        
        apps.forEach(list => {
            console.log(list);
            const app = document.createElement("div");
            app.classList.add("app");
            app.innerHTML = `
                <div class="description">
                    <img src="${list.icon}">
                    <h2>${list.name}</h2>
                </div>
                <p>${list.description}</p>
                <a href="${list.link}">Try it</a>
            `;
            appContainer.appendChild(app);
        });
        
        games.forEach(list => {
            console.log(list);
            const game = document.createElement("div");
            game.classList.add("game");
            game.innerHTML = `
                <div class="description">
                    <img src="${list.icon}">
                    <h2>${list.name}</h2>
                </div>
                <p>${list.description}</p>
                <a href="${list.link}">Play</a>
            `;
            gameContainer.appendChild(game);
        });
    });
}