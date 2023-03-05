const addListBtn = document.querySelector("#add-list-btn");
const closeAddListPopUpBtn = document.querySelector("#close-add-list-popup-btn");
const addListPopUp = document.querySelector("#add-list-popup");

const generateListBtn = document.querySelector("#generate-list-btn");
const closeGenerateListPopUpBtn = document.querySelector("#close-generate-list-popup-btn");
const generateListPopUp = document.querySelector("#generate-list-popup");

addListBtn.addEventListener("click", () => {
    addListPopUp.parentElement.classList.remove("toggle-popup-display");
});

closeAddListPopUpBtn.addEventListener("click", () => {
    addListPopUp.parentElement.classList.add("toggle-popup-display");
});

generateListBtn.addEventListener("click", () => {
    generateListPopUp.parentElement.classList.remove("toggle-popup-display");
});

closeGenerateListPopUpBtn.addEventListener("click", () => {
    generateListPopUp.parentElement.classList.add("toggle-popup-display");
});

const closeGLResultPopUpBtn = document.querySelector("#close-grocerylist-result-popup-btn");
const addGLResultPopUp = document.querySelector("#add-grocerylist-result-popup");

if (closeGLResultPopUpBtn !== null) {
    closeGLResultPopUpBtn.addEventListener("click", () => {
        addGLResultPopUp.parentElement.classList.add("toggle-popup-display");
    });
}
