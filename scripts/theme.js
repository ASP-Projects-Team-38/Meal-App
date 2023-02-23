const themeBtn = document.querySelector("#theme-btn");
const body = document.querySelector("body");
const logoImg = document.querySelector("#logo-img");
const pinIcon = document.querySelector("#pin-icon");
const calIcon = document.querySelector("#cal-icon");
const switchIcon = document.querySelector("#switch-icon");

body.classList.add("theme--light");
// logoImg.setAttribute("src", "../assets/logo-light.svg");

themeBtn.addEventListener("click", toggleTheme);

function toggleTheme() {
    console.log("You clicked the theme button!");

    if (body.classList.contains("theme--light")) {
        body.classList.remove("theme--light");
        body.classList.add("theme--dark");

        logoImg.setAttribute("src", "../assets/logo-dark.svg");

        if (pinIcon != null) {
            pinIcon.setAttribute("src", "../assets/icon-pin-dark.svg");
        }
        if (calIcon != null) {
            calIcon.setAttribute("src", "../assets/icon-calendar-dark.svg");
        }
        if (switchIcon != null) {
            switchIcon.setAttribute("src", "../assets/icon-switch-dark.svg");
        }
    }
    else {
        body.classList.remove("theme--dark");
        body.classList.add("theme--light");

        logoImg.setAttribute("src", "../assets/logo-light.svg");

        if (pinIcon != null) {
            pinIcon.setAttribute("src", "../assets/icon-pin-light.svg");
        }
        if (calIcon != null) {
            calIcon.setAttribute("src", "../assets/icon-calendar-light.svg");
        }
        if (switchIcon != null) {
            switchIcon.setAttribute("src", "../assets/icon-switch-light.svg");
        }  
    }
}