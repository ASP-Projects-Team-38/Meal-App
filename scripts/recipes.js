// ADD RECIPE FUNCTIONALITY.
// ========================================================
/** Displays the add recipe pop up when clicked. */
const addRecipeBtn = document.querySelector("#add-recipe-btn");

/** Closes the add recipe pop up when clicked. */
const closeRecipePopUpBtn = document.querySelector("#close-recipe-popup-btn");

/** The add recipe pop up. */
const addRecipePopUp = document.querySelector("#add-recipe-popup");

addRecipeBtn.addEventListener("click", () => {
    // Displays the add recipe pop up when the add recipe button is clicked.
    addRecipePopUp.parentElement.classList.remove("toggle-popup-display");
});

closeRecipePopUpBtn.addEventListener("click", () => {
    // Hides the add recipe pop up when the close button is clicked.
    addRecipePopUp.parentElement.classList.add("toggle-popup-display");
});


// ADD INGREDIENT INPUT FUNCTIONALITY.
// ========================================================
/** The recipe ingredient section, where all add ingredients will go. */
const ingredientsInputSection = document.querySelector(".recipe-ingredients");

/** Adds two more input fields when clicked, to allow the user to add another ingredient. */
const addIngredientBtn = document.querySelector("#add-recipe-ingredient-input-btn");

/** The current number of ingredients that the user has added.
 * Always starts as 1, since the user must add at least 1 ingredient. */
let numberOfIngredients = 1;

// The addIngredientInputField() called when the add ingredient button is clicked.
addIngredientBtn.addEventListener("click", addIngredientInputField); 


/**
 * Adds ingredient input field.
 * ========================================================
 * * Creates two input fields:
 *   * 1 for the ingredient name.
 *   * 1 for the ingredient amount.
 * * The fields are add as a group.
 */
function addIngredientInputField() {
    console.log("You clicked the add ingredient button.") // testing.
    // Increased so that number of ingredients match the number of input field groups.
    numberOfIngredients++;

    /** The group that will contain the two inputs. */
    let ingredientGroup = document.createElement("div");
    ingredientGroup.classList.add("recipe-ingredient-subgroup");

    /** The ingredient name input. */
    let ingredientInput = document.createElement("input");
    // Adding the necessary attributes for styling and identification.
    ingredientInput.setAttribute("placeholder", "Ingredient (e.g. flour)");
    ingredientInput.setAttribute("name", `recipe-ingredient-${numberOfIngredients}`);
    ingredientInput.setAttribute("id", `recipe-ingredient-${numberOfIngredients}`);

    /** The ingredient amount input. */
    let amountInput = document.createElement("input");
    // Adding the necessary attributes for styling and identification.
    amountInput.setAttribute("placeholder", "Amount (e.g. 250g)");
    amountInput.setAttribute("name", `recipe-amount-${numberOfIngredients}`);
    amountInput.setAttribute("id", `recipe-amount-${numberOfIngredients}`);

    // Adding both inputs to the group created earlier.
    ingredientGroup.appendChild(ingredientInput);
    ingredientGroup.appendChild(amountInput);

    // Adding the group to the recipe ingredient section.
    ingredientsInputSection.appendChild(ingredientGroup);
}


// ESTIMATE COST FUNCTIONALITY.
// ========================================================
/** Displays the estimate cost pop up when clicked. */
const estimateCostBtn = document.querySelector("#estimate-cost-btn");

/** Closes the estimate cost pop up when clicked. */
const closeEstimateCostPopUpBtn = document.querySelector("#close-estimate-cost-popup-btn");

/** The estimate cost pop up. */
const estimateCostRecipePopUp = document.querySelector("#estimate-cost-popup");

estimateCostBtn.addEventListener("click", () => {
    // Displays the estimate cost pop up when the estimate cost button is clicked.
    estimateCostRecipePopUp.parentElement.classList.remove("toggle-popup-display");
});

closeEstimateCostPopUpBtn.addEventListener("click", () => {
    // Hides the estimate cost pop up when the close button is clicked.
    estimateCostRecipePopUp.parentElement.classList.add("toggle-popup-display");
});


// RECIPE RESULT FUNCTIONALITY.
// ========================================================
/** Closes the recipe result pop up when clicked. */
const closeRecipeResultPopUpBtn = document.querySelector("#close-recipe-result-popup-btn");

/** Add recipe result pop up. */
const addRecipeResultPopUp = document.querySelector("#add-recipe-result-popup");

// First checks whether the button exists, to prevent an error.
if (closeRecipeResultPopUpBtn !== null) {
    closeRecipeResultPopUpBtn.addEventListener("click", () => {
        // Closes the recipe result popup.
        addRecipeResultPopUp.parentElement.classList.add("toggle-popup-display");
    });
}


// STYLING THE RECIPE CARDS.
// ========================================================
const recipeIngredientsElement = document.querySelector(".user-input-recipe-ingredients");
const recipeIngredients = JSON.parse(recipeIngredientsElement.innerHTML);

recipeIngredientsElement.innerHTML = ""; // empty
let ingredientsContainer = document.createElement("ul"); // contains all the ingredients

for (let property in recipeIngredients) {
    console.log(`${property}: ${recipeIngredients[property]}`);

    let li = document.createElement("li");
    li.innerHTML = `<span>${property}:</span> ${recipeIngredients[property]}`;

    ingredientsContainer.appendChild(li);
}

recipeIngredientsElement.appendChild(ingredientsContainer);
