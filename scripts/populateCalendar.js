class PopulateCalendar {
    constructor () {
        this.calContainer = document.querySelector(".dynamic-calendar");
        this.calBoxes = [];
        this.numOfCalBoxes = 0;
        this.addToCalPopUp = document.querySelector("#add-to-cal-popup");

        this.date = "";
        this.daysInMonth = 31;

        this.dateClicked = 0;
    }

    createCalBox = () => {
        this.numOfCalBoxes++;
    
        const dynamicDate = document.createElement("div");
        dynamicDate.setAttribute("class", "dynamic-date");
    
        const calDay = document.createElement("p");
        calDay.setAttribute("class", "cal-day");
        calDay.textContent = this.numOfCalBoxes;
    
        const currentDay = new Date().getDate();

        // Highlights the current day
        if ((this.numOfCalBoxes == currentDay) && 
        (this.getCurrentMonth() == this.getSelectedMonth()) &&
        (this.getCurrentYear() == this.getSelectedYear())) {
            dynamicDate.classList.add("current-day");
        }
    
        const addToCalBtn = document.createElement("button");
        addToCalBtn.setAttribute("class", "add-to-cal-btn");
        addToCalBtn.textContent = "+";
    
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

            this.calBoxes[i].addEventListener("click", () => {
                this.dateClicked = i+1;
                this.setFormDate();
                this.addToCalPopUp.parentElement.classList.remove("toggle-popup-display");
            })

            this.calContainer.classList.add("toggle-cal-display");
        }
    }

    setFormDate = () => {
        const formDate = document.querySelector(".box-date");
        let month = `${this.dateClicked}`;

        if (month.length == 1) {
            month = `0${month}`;
        }

        formDate.textContent = `${this.getSelectedYear()}-${this.getSelectedMonth()}-${month}`;
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
            console.log("");
        }

        return this.daysInMonth;
    }

    getSelectedDay = () => {
        const selectedDate = document.querySelector("#selected-date");
        this.date = selectedDate.value;

        return `${this.date[8]}${this.date[9]}`;
    }

    getCurrentMonth = () => {
        let date = new Date();
        let month = date.getMonth() + 1;
        let currentMonth = `${month}`;

        if (currentMonth.length == 1) {
            currentMonth = `0${month}`;
        }

        return currentMonth;
    }

    getSelectedMonth = () => {
        const selectedDate = document.querySelector("#selected-date");
        this.date = selectedDate.value;

        return `${this.date[5]}${this.date[6]}`;
    }

    getCurrentYear = () => {
        return new Date().getFullYear();
    }

    getSelectedYear = () => {
        const selectedDate = document.querySelector("#selected-date");
        this.date = selectedDate.value;

        return `${this.date[0]}${this.date[1]}${this.date[2]}${this.date[3]}`;
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
            console.log("ERROR OCCURRED.");
        }
    }

    toggleCalendarDisplay = () => {
        const displayCalendarBtn = document.querySelector("#display-cal-btn");

        if (this.calContainer.classList.contains("toggle-cal-display")) {
            this.calContainer.classList.remove("toggle-cal-display");
            displayCalendarBtn.textContent = "Hide Calendar";
        }
        else {
            this.calContainer.classList.add("toggle-cal-display");
            displayCalendarBtn.textContent = "Display Calendar";
        }
    }

    run = () => {
        this.daysInMonth = this.getDate(this.setDatePicker());
        this.buildCal();
        this.generateCal();
        this.dateClicked = this.getSelectedDay();
        this.setFormDate();
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
        this.setFormDate();
    }
}