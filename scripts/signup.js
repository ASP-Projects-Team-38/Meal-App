const errorMsgs = document.querySelectorAll(".error-msg");

for (let msg of errorMsgs) {
    if (msg.textContent == "") {
        msg.style.marginTop = "-20px";
        msg.style.backgroundColor = "red";
    }
    else {
        msg.style.marginBottom = "-10px";
        msg.style.marginLeft = "16px";
        msg.style.color = "red";
        msg.style.fontWeight = "bold";
        msg.style.fontSize = "1.1rem";
    }
}