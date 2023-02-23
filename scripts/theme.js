const themeBtn = document.querySelector("#theme-btn");
const body = document.querySelector("body");

themeBtn.addEventListener("click", toggleTheme);

function toggleTheme() {
    console.log("You clicked the theme button!");

    if (body.classList.contains("theme--light")) {
        body.classList.remove("theme--light");
        body.classList.add("theme--dark");
    }
    else {
        body.classList.remove("theme--dark");
        body.classList.add("theme--light");
    }
}