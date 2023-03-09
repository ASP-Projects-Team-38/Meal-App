// VARIABLES NEEDED FOR THEME FUNCTIONALITY.
// ========================================================
/** Toggles between the themes when clicked. */
const themeBtn = document.querySelector("#theme-btn");

/** The body element of the page. */
const body = document.querySelector("body");

/** The Plan2Eat brand logo. */
const logoImg = document.querySelector("#logo-img");

/** The pin icon. */
const pinIcon = document.querySelector("#pin-icon");

/** The calendar icon. */
const calIcon = document.querySelector("#cal-icon");

/** The switch icon. */
const switchIcon = document.querySelector("#switch-icon");

/** The theme icon. */
const themeIcon = document.querySelector("#theme-icon");

// The theme button calls the toggleTheme() function when clicked.
themeBtn.addEventListener('click', toggleTheme);
// Calls the defaultTheme() function when the DOM is loaded.
document.addEventListener('DOMContentLoaded', defaultTheme, false);


// SETS THE DEFAULT THEME.
/** Sets the default theme
 * ========================================================
 * * If the user has chosen a setting before, it picks that.
 * * It calls the setTheme() function. */
function defaultTheme() {
    // Compares the value stored to determine what theme to pick.
    if (localStorage.getItem('theme') === 'theme--dark') {
        setTheme('theme--dark');
    } else {
        setTheme('theme--light');
    }
};


// USING THE STORED THEME.
/** Sets the theme based on the stored theme. 
 * ========================================================
 * @param {string} themeName - The type of theme (light or dark).
 * * Sets the theme based on the value passed in.
 * * Changes the src for various elements based on the theme.
*/
function setTheme(themeName) {
    localStorage.setItem("theme", themeName);
    // Sets the body element's class name to the theme name.
    body.className = themeName;

    if (themeName == 'theme--dark') {
        logoImg.setAttribute("src", "../assets/logo-dark.svg");

        // Checks whether each icon exists before setting its src attribute.
        if (pinIcon != null) {
            pinIcon.setAttribute("src", "../assets/icon-pin-dark.svg");
        }
        if (calIcon != null) {
            calIcon.setAttribute("src", "../assets/icon-calendar-dark.svg");
        }
        if (switchIcon != null) {
            switchIcon.setAttribute("src", "../assets/icon-switch-dark.svg");
        }
        if (themeIcon != null) {
            themeIcon.setAttribute("src", "../assets/icon-theme-dark.svg");
        }
    }
    else {
        logoImg.setAttribute("src", "../assets/logo-light.svg");

        // Checks whether each icon exists before setting its src attribute.
        if (pinIcon != null) {
            pinIcon.setAttribute("src", "../assets/icon-pin-light.svg");
        }
        if (calIcon != null) {
            calIcon.setAttribute("src", "../assets/icon-calendar-light.svg");
        }
        if (switchIcon != null) {
            switchIcon.setAttribute("src", "../assets/icon-switch-light.svg");
        }  
        if (themeIcon != null) {
            themeIcon.setAttribute("src", "../assets/icon-theme-light.svg");
        }  
    }
}


// TOGGLING BETWEEN THE THEMES.
/** Toggles between the light theme and dark theme. 
 * ========================================================
 * * Sets the theme based on what the theme previously was.
*/
function toggleTheme(e) {
    e.preventDefault();
    console.log("You clicked the theme button!"); // testing
    console.log(body.classList); // testing

    // Toggling between the two themes, based on the current theme.
    if (localStorage.getItem('theme') === "theme--dark")
        setTheme("theme--light");
    else 
        setTheme("theme--dark"); 
}