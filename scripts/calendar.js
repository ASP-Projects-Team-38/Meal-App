const closeAddToCalPopUpBtn = document.querySelector("#close-add-to-cal-popup-btn");
const addToCalPopUp = document.querySelector("#add-to-cal-popup");

closeAddToCalPopUpBtn.addEventListener("click", () => {
    addToCalPopUp.parentElement.classList.add("toggle-popup-display");
});


const populateCalendar = new PopulateCalendar();

populateCalendar.empty();
populateCalendar.run();


const displayCalendarBtn = document.querySelector("#display-cal-btn");
const updateCalendarBtn = document.querySelector("#update-cal-btn");

displayCalendarBtn.addEventListener("click", () => {
    populateCalendar.toggleCalendarDisplay();
})

updateCalendarBtn.addEventListener("click", () => {
    populateCalendar.regenerate();
    populateCalendar.toggleCalendarDisplay();
})