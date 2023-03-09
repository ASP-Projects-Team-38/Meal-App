class PopulateCalendar {
    /**
     * Creates the calendar and handles all its functionality:
     * ========================================================
     * @class
     * * Creates the calendar boxes.
     * * Determines the number of boxes required for each month.
     * * Syncs the calendar with the date input.
     */

    constructor () {
        /** @type {HTMLDivElement} The div the where the calendar will be populated. */
        this.calContainer = document.querySelector(".dynamic-calendar");

        /** @type {HTMLDivElement} The array that contains the created calendar boxes. */
        this.calBoxes = [];

        /** @type {number} The total number of calendar boxes. */
        this.numOfCalBoxes = 0;

        /** @type {HTMLElement} The pop up that allows users to add data to the calendar. */
        this.addToCalPopUp = document.querySelector("#add-to-cal-popup");

        /** @type {string} The date. */
        this.date = "";

        /** @type {number} The number of days in a selected month. */
        this.daysInMonth = 31;

        /** @type {string} The selected date. */
        this.dateClicked = "0";
    }


    /** Creates the calendar box. 
     * ========================================================
     * * Adds the day of the month to the calendar box.
     * * Highlights the current day.
     * * Adds the addToCalBtn to the calendar box.
    */
    createCalBox = () => {
        this.numOfCalBoxes++; // Increases the total number of boxes.

        // Creates the calendar box div.
        const dynamicDate = document.createElement("div");
        dynamicDate.setAttribute("class", "dynamic-date");

        // Creates the day text that will be in the div (i.e. 18).
        const calDay = document.createElement("p");
        calDay.setAttribute("class", "cal-day");
        calDay.textContent = this.numOfCalBoxes;

        const currentDay = new Date().getDate(); // Gets the current day of the month.

        // Highlights the current day
        if ((this.numOfCalBoxes == currentDay) &&
        (this.getCurrentMonth() == this.getSelectedMonth()) &&
        (this.getCurrentYear() == this.getSelectedYear())) {
            dynamicDate.classList.add("current-day");
        }

        // Creates the button that when clicked displays a pop up.
        const addToCalBtn = document.createElement("button");
        addToCalBtn.setAttribute("class", "add-to-cal-btn");
        addToCalBtn.textContent = "+";

        dynamicDate.appendChild(calDay);
        dynamicDate.appendChild(addToCalBtn);

        // Adds the created calendar box to the calBoxes array.
        this.calBoxes.push(dynamicDate);
    }


    /** Builds the calendar boxes. 
     * ========================================================
     * * Creates a specific number of calendar boxes.
     *    * The number of boxes is equal to the number of days in a month- for the selected month.
     * * Calls the createCalBox() function.
    */
    buildCal = () => {
        for (let i = 0; i < this.daysInMonth; i++) {
            this.createCalBox();
        }
    }


    /** Generates the calendar. 
     * ========================================================
     * * Generates the calendar boxes in the DOM.
     *    * It appends the boxes to the calendar container div.
     * * Displays the pop up if clicked.
     * * Calls the setFormDate() function.
    */
    generateCal = () => {
        for (let i = 0; i < this.calBoxes.length; i++) {
            // Appends each box to the calendar div.
            this.calContainer.appendChild(this.calBoxes[i]);

            // Displays the add to calendar pop up.
            this.calBoxes[i].addEventListener("click", () => {
                this.dateClicked = i+1;
                this.setFormDate();
                this.addToCalPopUp.parentElement.classList.remove("toggle-popup-display");
            })

            this.calContainer.classList.add("toggle-cal-display");
        }
    }


    /** Sets the form date. 
     * ========================================================
     * * Sets the form date in the format YYYY-MM-DD (matches the date object).
     * * Calls the getSelectedYear() and getSelectedMonth() functions.
    */
    setFormDate = () => {
        // Where the date will be stored.
        const formDate = document.querySelector(".box-date");
        let day = `${this.dateClicked}`;

        if (day.length == 1) {
            day = `0${day}`;
        }

        // Sets the form date.
        formDate.textContent = `${this.getSelectedYear()}-${this.getSelectedMonth()}-${day}`;
    }


    /** Sets the date picker. 
     * ========================================================
     * * Sets the date picker to the current date.
     * * Returns the current month, to be used by the getDate() function.
    */
    setDatePicker = () => {
        // Gets the date input element.
        const dateInput = document.querySelector("#selected-date");
        let date = new Date(); // gets the current date.

        let month = date.getMonth() + 1; // gets the current month.
        let currentMonth = `${month}`;

        if (currentMonth.length == 1) {
            currentMonth = `0${month}`;
        }

        let day = date.getDate();  // gets the current day.
        let currentDay = `${day}`;

        if (currentDay.length == 1) {
            currentDay = `0${day}`;
        }

        // Create a string of the date in the format YYYY-MM-DD.
        let currentDate = `${date.getFullYear()}-${currentMonth}-${currentDay}`;
        dateInput.value = currentDate; // sets the date input to the above string.

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

    /** Displays and hides the calendar based on user input.
     * ========================================================
     * * Changes the text on the button to allow the user to know the right action.
     * * Hides and displays the calendar based off whether the calendar is currently displayed or not.
     */
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

    /** Begins the populate calendar functionality. */
    run = () => {
        this.daysInMonth = this.getDate(this.setDatePicker());
        this.buildCal();
        this.generateCal();
        this.dateClicked = this.getSelectedDay();
        this.setFormDate();
    }

    /** Empties the dynamic calendar section, to ensure no duplicity. */
    empty = () => {
        // Remove current boxes
        this.calContainer.innerHTML = "";
        this.calBoxes = [];
        this.numOfCalBoxes = 0;
    }

    /** Regenerates new calendar boxes based on user input. */
    regenerate = () => {
        this.empty();
        this.numOfDays();
        this.buildCal();
        this.generateCal();
        this.setFormDate();
    }
}
