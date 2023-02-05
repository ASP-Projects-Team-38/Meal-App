const addRecipeBtn = document.querySelector("#add-recipe-btn");
const closeRecipePopUpBtn = document.querySelector("#close-recipe-popup-btn");

const addRecipePopUp = document.querySelector("#add-recipe-popup");

addRecipeBtn.addEventListener("click", () => {
    addRecipePopUp.parentElement.classList.remove("toggle-popup-display");
});

closeRecipePopUpBtn.addEventListener("click", () => {
    addRecipePopUp.parentElement.classList.add("toggle-popup-display");
});