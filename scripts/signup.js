const errorMsgs = document.querySelectorAll(".error-msg");

for (let msg of errorMsgs) {
    // So that there is not a big gap between form groups
    if (msg.textContent == "") {
        msg.style.marginTop = "-20px";
    }
    else {
        msg.style.marginBottom = "-10px";
        msg.style.marginTop = "100px";
        msg.style.marginLeft = "16px";
        msg.style.fontWeight = "bold";
        msg.style.fontSize = "1.1rem";
    }
}

// Checking the validity of user entry
const formInputs = document.querySelectorAll("input");

for (let input of formInputs) {
    input.addEventListener("change", () => {
        console.log("Input changed.");

        let msg = input.nextElementSibling;
        let id = input.id;

        if(!input.checkValidity()) {
            console.log(msg);
            console.log(id);

            if (id === "fname") {
                msg.textContent = "\u26A0 First name must be between 1 and 75 characters.";
            }
            else if (id === "lname") {
                msg.textContent = "\u26A0 Last name must be between 1 and 100 characters.";
            }
            else if (id === "email") {
                msg.textContent = "\u26A0 Not a valid email. Ex: you@example.com";
            }
            else if (id === "phone-number") {
                msg.textContent = "\u26A0 Phone number must be between 11 and 15 digits (and +).";
            }
            else if (id === "username") {
                msg.textContent = "\u26A0 Username must be between 1 and 50 characters, and can contain letters, numbers, dashes, and underscores.";
            }
            else if ((id === "password") || id === "re-password") {
                msg.textContent = "\u26A0 Password must contain a minimum of 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number.";
            }
            else {
                msg.textContent = "\u26A0 Invalid input!";
            }
        }
        else {
            msg.textContent = "";
        }
    });
}