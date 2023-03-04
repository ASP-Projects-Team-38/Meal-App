const setRemaindersBtn = document.querySelector("#set-remainder-btn");
const closeSetRemaindersPopUpBtn = document.querySelector("#close-set-remainders-popup-btn");
const setRemaindersPopUp = document.querySelector("#set-remainders-popup");

setRemaindersBtn.addEventListener("click", () => {
    setRemaindersPopUp.parentElement.classList.remove("toggle-popup-display");
});

closeSetRemaindersPopUpBtn.addEventListener("click", () => {
    setRemaindersPopUp.parentElement.classList.add("toggle-popup-display");
});

const addMealBtn = document.querySelector("#add-meal-btn");
const closeAddMealPopUpBtn = document.querySelector("#close-add-meal-popup-btn");
const addMealPopUp = document.querySelector("#add-meal-popup");

addMealBtn.addEventListener("click", () => {
    addMealPopUp.parentElement.classList.remove("toggle-popup-display");
});

closeAddMealPopUpBtn.addEventListener("click", () => {
    addMealPopUp.parentElement.classList.add("toggle-popup-display");
});

const closeMealResultPopUpBtn = document.querySelector("#close-meal-result-popup-btn");
const addMealResultPopUp = document.querySelector("#add-meal-result-popup");

if (closeMealResultPopUpBtn !== null) {
    closeMealResultPopUpBtn.addEventListener("click", () => {
        addMealResultPopUp.parentElement.classList.add("toggle-popup-display");
    });
}

const closeMealPlanResultPopUpBtn = document.querySelector("#close-mealplan-result-popup-btn");
const addMealPlanResultPopUp = document.querySelector("#add-mealplan-result-popup");

if (closeMealPlanResultPopUpBtn !== null) {
    closeMealPlanResultPopUpBtn.addEventListener("click", () => {
        addMealPlanResultPopUp.parentElement.classList.add("toggle-popup-display");
    });
}
