// FORM SPACING.
// ========================================================
/** All error message p tags, that display feedback to to user. */
const errorMsgs = document.querySelectorAll(".error-msg");

for (let msg of errorMsgs) {
    // Checks whether the there is an error message displayed.
    if (msg.textContent == "") {
        // Hides the error msg p tag, so that there is not a big gap between form groups.
        msg.style.display = "none";
    }
}


// CHECKING THE VALIDITY OF USER ENTRY.
// ========================================================
/** All the form inputs on the page. */
const formInputs = document.querySelectorAll("input");

for (let input of formInputs) {
    input.addEventListener("change", () => {
        console.log("Input changed."); // testing.

        /** Selects the error msg p tag associated with the input. */
        let msg = input.nextElementSibling;
        let id = input.id;

        // Only displays a message when the form input is invalid.
        if(!input.checkValidity()) {
            console.log(msg); // testing.
            console.log(id); // testing.

            // Styling the error message.
            input.classList.add("invalid");
            msg.style.display = "block";

            // Displays a message to the user depending on what input is invalid.
            if (id === "fname" || id === "lname") {
                msg.textContent = "\u26A0 Name must be between 1 and 75 characters, and can only contain letters and dashes.";
            }
            else if (id === "email") {
                msg.textContent = "\u26A0 Not a valid email. Ex: you@example.com";
            }
            else if (id === "phone-number") {
                msg.textContent = "\u26A0 Phone number must be between 11 and 15 digits (and +).";
            }
            else if (id === "username") {
                msg.textContent = "\u26A0 Username must be between 3 and 50 characters, and can contain letters, numbers, dashes, and underscores.";
            }
            else if (id === "password" || id === "re-password") {
                msg.textContent = "\u26A0 Password must contain a minimum of 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number.";
            }
            else {
                msg.textContent = "\u26A0 Invalid input!";
            }
        }
        // If the validity is not invalid, the styling is removed, and the message content is emptied.
        else {
            input.classList.remove("invalid");
            msg.textContent = "";
        }
    });
}