const funPanel = document.querySelector(".fun-panel");
const gifDisplay = document.getElementById("gif-display");

window.addEventListener("load", showFunPanel);

function showFunPanel() {
    const month = new Date;
    gifDisplay.src = `asset/gif/${month.getMonth()+1}.gif`;
    funPanel.classList.add("show");
}