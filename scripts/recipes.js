const addRecipeBtn = document.querySelector("#add-recipe-btn");

const addRecipePopUp = document.querySelector("#add-recipe-popup");

addRecipeBtn.addEventListener("click", () => {
    addRecipePopUp.parentElement.classList.remove("toggle-popup-display");
});