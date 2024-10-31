const funPanel = document.querySelector(".fun-panel");
const gifDisplay = document.getElementById("gif-display");

window.addEventListener("load", showFunPanel);

function showFunPanel() {
    const month = new Date;
    gifDisplay.style.background = `url("asset/gif/${month.getMonth()+1}.gif")`;
    gifDisplay.style.backgroundSize = "100% 100%";
    gifDisplay.style.backgroundRepeat = "no-repeat";
    funPanel.classList.add("show");
}