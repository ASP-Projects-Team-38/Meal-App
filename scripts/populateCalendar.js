class PopulateCalendar {
    constructor () {
        this.calContainer = document.querySelector(".dynamic-calendar");
        this.calBoxes = [];
        this.numOfCalBoxes = 0;
        this.addToCalPopUp = document.querySelector("#add-to-cal-popup");

        this.date = "";
        this.daysInMonth = 31;
    }

    createCalBox = () => {
        this.numOfCalBoxes++;
    
        const dynamicDate = document.createElement("div");
        dynamicDate.setAttribute("class", "dynamic-date");
    
        const calDay = document.createElement("p");
        calDay.setAttribute("class", "cal-day");
        calDay.textContent = this.numOfCalBoxes;
    
        if (this.numOfCalBoxes == 11) {
            dynamicDate.classList.add("current-day");
        }
    
        const addToCalBtn = document.createElement("button");
        addToCalBtn.setAttribute("class", "add-to-cal-btn");
        addToCalBtn.textContent = "+";
        addToCalBtn.addEventListener("click", () => {
            this.numOfDays();
            this.addToCalPopUp.parentElement.classList.remove("toggle-popup-display");
        })
    
        dynamicDate.appendChild(calDay);
        dynamicDate.appendChild(addToCalBtn);
    
        this.calBoxes.push(dynamicDate);
    }

    buildCal = () => {
        for (let i = 0; i < this.daysInMonth; i++) {
            this.createCalBox();
        }
    }
    
    generateCal = () => {
        for (let i = 0; i < this.calBoxes.length; i++) {
            this.calContainer.appendChild(this.calBoxes[i]);
        }
    }
    
    numOfDays = () => {
        const selectedDate = document.querySelector("#selected-date");
        
        if (selectedDate.value !== "") {
            console.log("I am NOT empty.");
            console.log(selectedDate.value);

            this.date = selectedDate.value;  // output format: 2023-02-17
            let month = `${this.date[5]}${this.date[6]}`;

            if ((month == 1) || (month == 3) || (month == 5) ||
                (month == 7) || (month == 8) || (month == 10) ||
                (month == 12)) {
                console.log("I have 31 days");
                this.daysInMonth = 31;
                this.regenerate();
            }

            else if ((month == 4) || (month == 6) || (month == 9) ||
                    (month == 11)) {
                console.log("I have 30 days");
                this.daysInMonth = 30;
                this.regenerate();
            }

            else if (month == 2) {
                console.log("I am feb");
                this.daysInMonth = 28;
                this.regenerate();
            }

            else {
                console.log("Invalid date");
            }
        }
        else {
            console.log("I am empty.");
        }
    }
    

    run = () => {
        this.numOfDays();
        this.buildCal();
        this.generateCal();
    }

    empty = () => {
        // Remove current boxes
        this.calContainer.innerHTML = "";
        this.calBoxes = [];
        this.numOfCalBoxes = 0;
    }

    regenerate = () => {
        this.empty();
        this.buildCal();
        this.generateCal();
    }
}