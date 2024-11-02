const copyrightYear = document.getElementById("copyright");

window.addEventListener("load", () => {
    const date = new Date;
    
    copyrightYear.textContent = `© ${date.getFullYear()} Berkilau`;
});
