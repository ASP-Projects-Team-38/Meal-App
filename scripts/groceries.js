const addListBtn = document.querySelector("#add-list-btn");
const generateListBtn = document.querySelector("#generate-list-btn");

const addListPopUp = document.querySelector("#add-list-popup");
const generateListPopUp = document.querySelector("#generate-list-popup");

addListBtn.addEventListener("click", () => {
    console.log("clo");
    addListPopUp.parentElement.classList.remove("toggle-popup-display");
});

generateListBtn.addEventListener("click", () => {
    generateListPopUp.parentElement.classList.remove("toggle-popup-display");
});
