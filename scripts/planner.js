// SET REMAINDERS FUNCTIONALITY.
// ========================================================
/** Displays the set remainders pop up when clicked. */
const setRemaindersBtn = document.querySelector("#set-remainder-btn");

/** Closes the set remainders pop up when clicked. */
const closeSetRemaindersPopUpBtn = document.querySelector("#close-set-remainders-popup-btn");

/** The set remainders pop up. */
const setRemaindersPopUp = document.querySelector("#set-remainders-popup");

setRemaindersBtn.addEventListener("click", () => {
    // Displays the set remainders pop up when the set remainder button is clicked.
    setRemaindersPopUp.parentElement.classList.remove("toggle-popup-display");
});

closeSetRemaindersPopUpBtn.addEventListener("click", () => {
    // Hides the set remainders pop up when the close button is clicked.
    setRemaindersPopUp.parentElement.classList.add("toggle-popup-display");
});


// ADD MEAL FUNCTIONALITY.
// ========================================================
/** Displays the add meal pop up when clicked. */
const addMealBtn = document.querySelector("#add-meal-btn");

/** Closes the add meal pop up when clicked. */
const closeAddMealPopUpBtn = document.querySelector("#close-add-meal-popup-btn");

/** The add meal pop up. */
const addMealPopUp = document.querySelector("#add-meal-popup");

addMealBtn.addEventListener("click", () => {
    // Displays the add meal pop up when the add meal button is clicked.
    addMealPopUp.parentElement.classList.remove("toggle-popup-display");
});

closeAddMealPopUpBtn.addEventListener("click", () => {
    // Hides the add meal pop up when the close button is clicked.
    addMealPopUp.parentElement.classList.add("toggle-popup-display");
});


// MEAL RESULT FUNCTIONALITY.
// ========================================================
/** Closes the meal result pop up when clicked. */
const closeMealResultPopUpBtn = document.querySelector("#close-meal-result-popup-btn");

/** The add meal result pop up. */
const addMealResultPopUp = document.querySelector("#add-meal-result-popup");

if (closeMealResultPopUpBtn !== null) {
    closeMealResultPopUpBtn.addEventListener("click", () => {
        // Closes the add meal result popup.
        addMealResultPopUp.parentElement.classList.add("toggle-popup-display");
    });
}


// MEAL PLAN RESULT FUNCTIONALITY.
// ========================================================
/** Closes the meal plan result pop up when clicked. */
const closeMealPlanResultPopUpBtn = document.querySelector("#close-mealplan-result-popup-btn");

/** The add meal plan result pop up. */
const addMealPlanResultPopUp = document.querySelector("#add-mealplan-result-popup");

// First checks whether the button exists, to prevent an error.
if (closeMealPlanResultPopUpBtn !== null) {
    closeMealPlanResultPopUpBtn.addEventListener("click", () => {
        // Closes the add meal plan result popup.
        addMealPlanResultPopUp.parentElement.classList.add("toggle-popup-display");
    });
}
