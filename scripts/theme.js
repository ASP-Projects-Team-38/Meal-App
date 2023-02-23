const themeBtn = document.querySelector("#theme-btn");
const body = document.querySelector("body");
const logoImg = document.querySelector("#logo-img");
const pinIcon = document.querySelector("#pin-icon");
const calIcon = document.querySelector("#cal-icon");
const switchIcon = document.querySelector("#switch-icon");

themeBtn.addEventListener('click', toggleTheme);
document.addEventListener('DOMContentLoaded', defaultTheme, false);

// Sets the default theme, if the user has chosen a setting before, it picks that.
function defaultTheme() {
    if (localStorage.getItem('theme') === 'theme--dark') {
        setTheme('theme--dark');
    } else {
        setTheme('theme--light');
    }
};

//  Sets the theme based on the stored theme.
function setTheme(themeName) {
    localStorage.setItem("theme", themeName);
    body.className = themeName;

    if (themeName == 'theme--dark') {
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

// Toggles between the light theme and dark theme.
function toggleTheme(e) {
    e.preventDefault();
    console.log("You clicked the theme button!"); // testing
    console.log(body.classList); // testing

    if (localStorage.getItem('theme') === "theme--dark")
        setTheme("theme--light");
    else 
        setTheme("theme--dark"); 
}