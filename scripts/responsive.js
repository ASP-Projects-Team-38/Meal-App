const toggleNavBtn = document.querySelector(".nav-toggle-btn");
const navGroup = document.querySelector(".nav-toggle-group");
const closeNavBtn = document.querySelector(".close-nav-btn");

if (toggleNavBtn !== null) {
    toggleNavBtn.addEventListener('click', () => {
        console.log("I have been clicked");

        navGroup.classList.remove("hide-nav");
    })
}

if (closeNavBtn !== null) {
    closeNavBtn.addEventListener("click", () => {
        navGroup.classList.add("hide-nav");
    })
}