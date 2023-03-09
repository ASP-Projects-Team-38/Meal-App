// ADD TO CALENDAR POP UP FUNCTIONALITY.
// ========================================================
/** The button used to close the popup generated from the calendar. */
const closeAddToCalPopUpBtn = document.querySelector("#close-add-to-cal-popup-btn");

/** The popup that is generated from the calendar. */
const addToCalPopUp = document.querySelector("#add-to-cal-popup");

// When the user clicks the 'X' the popup will be hidden.
closeAddToCalPopUpBtn.addEventListener("click", () => {
    // Adds the class that hides the popup.
    addToCalPopUp.parentElement.classList.add("toggle-popup-display");
});


// BUILDING THE CALENDAR.
// ========================================================
/** Creating an instance of the populate calendar class. */
const populateCalendar = new PopulateCalendar();

populateCalendar.empty(); // empties the dynamic calendar section, to ensure no duplicity.
populateCalendar.run(); // begins the populate calendar functionality.


// DISPLAY CALENDAR FUNCTIONALITY.
// ========================================================
/** The button that toggles the display of the calendar. */
const displayCalendarBtn = document.querySelector("#display-cal-btn");

/** The button that updates the calendar based of the date input. */
const updateCalendarBtn = document.querySelector("#update-cal-btn");

displayCalendarBtn.addEventListener("click", () => {
    // Displays or hides the calendar based on user input, when the display button is clicked..
    populateCalendar.toggleCalendarDisplay();
})

updateCalendarBtn.addEventListener("click", () => {
    // Regenerates new calendar boxes based on user input.
    populateCalendar.regenerate();
    // Displays or hides the calendar.
    populateCalendar.toggleCalendarDisplay();
})