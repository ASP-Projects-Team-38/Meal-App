const addRecipeBtn = document.querySelector("#add-recipe-btn");
const closeRecipePopUpBtn = document.querySelector("#close-recipe-popup-btn");
const addRecipePopUp = document.querySelector("#add-recipe-popup");

addRecipeBtn.addEventListener("click", () => {
    addRecipePopUp.parentElement.classList.remove("toggle-popup-display");
});

closeRecipePopUpBtn.addEventListener("click", () => {
    addRecipePopUp.parentElement.classList.add("toggle-popup-display");
});

const ingredientsInputSection = document.querySelector(".recipe-ingredients");
const addIngredientBtn = document.querySelector("#add-recipe-ingredient-input-btn");
let numberOfIngredients = 1;

addIngredientBtn.addEventListener("click", addIngredientInputField);

function addIngredientInputField() {
    console.log("You clicked the add ingredient button.")
    numberOfIngredients++;

    let ingredientGroup = document.createElement("div");
    ingredientGroup.classList.add("recipe-ingredient-subgroup");

    let ingredientInput = document.createElement("input");
    ingredientInput.setAttribute("placeholder", "Ingredient (e.g. flour)");
    ingredientInput.setAttribute("name", `recipe-ingredient-${numberOfIngredients}`);
    ingredientInput.setAttribute("id", `recipe-ingredient-${numberOfIngredients}`);

    let amountInput = document.createElement("input");
    amountInput.setAttribute("placeholder", "Amount (e.g. 250g)");
    amountInput.setAttribute("name", `recipe-amount-${numberOfIngredients}`);
    amountInput.setAttribute("id", `recipe-amount-${numberOfIngredients}`);

    ingredientGroup.appendChild(ingredientInput);
    ingredientGroup.appendChild(amountInput);

    ingredientsInputSection.appendChild(ingredientGroup);
}


const estimateCostBtn = document.querySelector("#estimate-cost-btn");
const closeEstimateCostPopUpBtn = document.querySelector("#close-estimate-cost-popup-btn");
const estimateCostRecipePopUp = document.querySelector("#estimate-cost-popup");

estimateCostBtn.addEventListener("click", () => {
    estimateCostRecipePopUp.parentElement.classList.remove("toggle-popup-display");
});

closeEstimateCostPopUpBtn.addEventListener("click", () => {
    estimateCostRecipePopUp.parentElement.classList.add("toggle-popup-display");
});


const closeRecipeResultPopUpBtn = document.querySelector("#close-recipe-result-popup-btn");
const addRecipeResultPopUp = document.querySelector("#add-recipe-result-popup");

closeRecipeResultPopUpBtn.addEventListener("click", () => {
    addRecipeResultPopUp.parentElement.classList.add("toggle-popup-display");
});
