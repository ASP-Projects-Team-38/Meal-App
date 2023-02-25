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
            this.calContainer.classList.add("toggle-cal-display");
        }
    }

    setDatePicker = () => {
        // Set the date picker to the current date
        const dateInput = document.querySelector("#selected-date");
        let date = new Date();
        let month = date.getMonth() + 1;
        let currentMonth = `${month}`;

        if (currentMonth.length == 1) {
            currentMonth = `0${month}`;
        }

        let currentDate = `${date.getFullYear()}-${currentMonth}-${date.getDate()}`;
        dateInput.value = currentDate;

        return currentMonth;
    }

    getDate = (month) => {
        if ((month == 1) || (month == 3) || (month == 5) ||
            (month == 7) || (month == 8) || (month == 10) ||
            (month == 12)) {
            this.daysInMonth = 31;
        }

        else if ((month == 4) || (month == 6) || (month == 9) ||
                (month == 11)) {
            this.daysInMonth = 30;
        }

        else if (month == 2) {
            let year = `${this.date[0]}${this.date[1]}${this.date[2]}${this.date[3]}`;
            const leap = new Date(year, 1, 29).getDate() === 29; // checking if its a leap year

            if (leap)
                this.daysInMonth = 29;
            else
                this.daysInMonth = 28;
        
        }

        else {
            console.log("Invalid date");
        }



        return this.daysInMonth;
    }
    
    numOfDays = () => {
        const selectedDate = document.querySelector("#selected-date");
        
        if (selectedDate.value !== "") {
            console.log("I am NOT empty.");
            console.log(selectedDate.value);

            this.date = selectedDate.value;  // output format: 2023-02-17
            let month = `${this.date[5]}${this.date[6]}`;

            this.daysInMonth = this.getDate(month);
        }
        else {
            console.log("I am empty.");
        }
    }

    toggleCalendarDisplay = () => {
        if (this.calContainer.classList.contains("toggle-cal-display")) {
            this.calContainer.classList.remove("toggle-cal-display");
        }
        else {
            this.calContainer.classList.add("toggle-cal-display");
        }
    }
    

    run = () => {
        this.daysInMonth = this.getDate(this.setDatePicker());
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
        this.numOfDays();
        this.buildCal();
        this.generateCal();
    }
}