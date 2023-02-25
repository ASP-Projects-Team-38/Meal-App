// const addToCalBtns = document.querySelectorAll(".add-to-cal-btn");
const closeAddToCalPopUpBtn = document.querySelector("#close-add-to-cal-popup-btn");
const addToCalPopUp = document.querySelector("#add-to-cal-popup");

// for (let i = 0; i < addToCalBtns.length; i++) {
//     addToCalBtns[i].addEventListener("click", () => {
//         addToCalPopUp.parentElement.classList.remove("toggle-popup-display");
//         populateCalendar.dateClicked = i+1;
//         populateCalendar.setFormDate();

//         console.log("I am working");
//     });
// }

closeAddToCalPopUpBtn.addEventListener("click", () => {
    addToCalPopUp.parentElement.classList.add("toggle-popup-display");
});


const displayCalendarBtn = document.querySelector("#display-cal-btn");
const updateCalendarBtn = document.querySelector("#update-cal-btn");

const populateCalendar = new PopulateCalendar();
populateCalendar.empty();
populateCalendar.run();

displayCalendarBtn.addEventListener("click", () => {
    populateCalendar.toggleCalendarDisplay();
})

updateCalendarBtn.addEventListener("click", () => {
    populateCalendar.regenerate();
    populateCalendar.toggleCalendarDisplay();
})

// console.log(populateCalendar.getSelectedDay());