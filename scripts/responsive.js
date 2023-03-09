// RESPONSIVE NAVBAR FUNCTIONALITY.
// ========================================================
/** The nav menu button, that allows users on smaller screens to hide and view the nav. */
const toggleNavBtn = document.querySelector(".nav-toggle-btn");

/** The group that contains all the nav links. */
const navGroup = document.querySelector(".nav-toggle-group");

/** Closes the nav menu when clicked. */
const closeNavBtn = document.querySelector(".close-nav-btn");

// Checks whether the toggle nav button exists, to prevent an error.
if (toggleNavBtn !== null) {
    toggleNavBtn.addEventListener('click', () => {
        console.log("I have been clicked"); // testing.
        // Displays the nav menu.
        navGroup.classList.remove("hide-nav");
    })
}

// Checks whether the close nav button exists, to prevent an error.
if (closeNavBtn !== null) {
    closeNavBtn.addEventListener("click", () => {
        // Hides the nav menu.
        navGroup.classList.add("hide-nav");
    })
}