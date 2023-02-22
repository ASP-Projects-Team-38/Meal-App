const setRemaindersBtn = document.querySelector("#set-remainder-btn");
const closeSetRemaindersPopUpBtn = document.querySelector("#close-set-remainders-popup-btn");
const setRemaindersPopUp = document.querySelector("#set-remainders-popup");

setRemaindersBtn.addEventListener("click", () => {
    setRemaindersPopUp.parentElement.classList.remove("toggle-popup-display");
});

closeSetRemaindersPopUpBtn.addEventListener("click", () => {
    setRemaindersPopUp.parentElement.classList.add("toggle-popup-display");
});
