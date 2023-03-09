// ADD GROCERY LIST FUNCTIONALITY.
// ========================================================
/** Displays the add list pop up when clicked. */
const addListBtn = document.querySelector("#add-list-btn");

/** Closes the add list pop up when clicked. */
const closeAddListPopUpBtn = document.querySelector("#close-add-list-popup-btn");

/** The add list pop up. */
const addListPopUp = document.querySelector("#add-list-popup");

addListBtn.addEventListener("click", () => {
    // Displays the add list pop up when the add list button is clicked.
    addListPopUp.parentElement.classList.remove("toggle-popup-display");
});

closeAddListPopUpBtn.addEventListener("click", () => {
    // Hides the add list pop up when the close button is clicked.
    addListPopUp.parentElement.classList.add("toggle-popup-display");
});


// GENERATE GROCERY LIST FUNCTIONALITY.
// ========================================================
/** Displays the generate list pop up when clicked. */
const generateListBtn = document.querySelector("#generate-list-btn");

/** Closes the generate list pop up when clicked. */
const closeGenerateListPopUpBtn = document.querySelector("#close-generate-list-popup-btn");

/** The generate list pop up. */
const generateListPopUp = document.querySelector("#generate-list-popup");

generateListBtn.addEventListener("click", () => {
    // Displays the generate list pop up when the generate list button is clicked.
    generateListPopUp.parentElement.classList.remove("toggle-popup-display");
});

closeGenerateListPopUpBtn.addEventListener("click", () => {
    // Hides the generate list pop up when the close button is clicked.
    generateListPopUp.parentElement.classList.add("toggle-popup-display");
});


// DISPLAY GROCERY LISTS ON PAGE.
// ========================================================
/** Closes the generate grocery list pop up when clicked. */
const closeGLResultPopUpBtn = document.querySelector("#close-grocerylist-result-popup-btn");

/** Generate grocery list pop up. */
const addGLResultPopUp = document.querySelector("#add-grocerylist-result-popup");

// First checks whether the button is exist, to prevent an error.
if (closeGLResultPopUpBtn !== null) {
    closeGLResultPopUpBtn.addEventListener("click", () => {
        // Closes the add grocery list popup.
        addGLResultPopUp.parentElement.classList.add("toggle-popup-display");
    });
}
