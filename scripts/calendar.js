const addToCalBtns = document.querySelectorAll(".add-to-cal-btn");
const closeAddToCalPopUpBtn = document.querySelector("#close-add-to-cal-popup-btn");
const addToCalPopUp = document.querySelector("#add-to-cal-popup");

for (let i = 0; i < addToCalBtns.length; i++) {
    addToCalBtns[i].addEventListener("click", () => {
        addToCalPopUp.parentElement.classList.remove("toggle-popup-display");
    });
}

closeAddToCalPopUpBtn.addEventListener("click", () => {
    addToCalPopUp.parentElement.classList.add("toggle-popup-display");
});


const displayCalendarBtn = document.querySelector("#display-cal-btn");
const updateCalendarBtn = document.querySelector("#update-cal-btn");

const populateCalendar = new PopulateCalendar();

displayCalendarBtn.addEventListener("click", () => {
    populateCalendar.empty();
    populateCalendar.run();
})

updateCalendarBtn.addEventListener("click", () => {
    populateCalendar.numOfDays();
})
