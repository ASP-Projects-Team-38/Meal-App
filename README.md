# Meal-App

View the meal app's overall current progress [here](https://asp-projects-team-38.github.io/Meal-App-View-Frontend/).<br>

- View the current login page [here](https://asp-projects-team-38.github.io/Meal-App-View-Frontend/login.html).<br>
- View the updated add recipe pop up [here](https://asp-projects-team-38.github.io/Meal-App-View-Frontend/index.html).<br>
- View the updated theme [here](https://asp-projects-team-38.github.io/Meal-App-View-Frontend/). <br>
*The theme btn is now fully functional and the users selected theme persists/is stored in local storage.*<br>
- Completed the calendar and its functionality for now. View it [here](https://asp-projects-team-38.github.io/Meal-App-View-Frontend/planner.html).<br>
*The calendar btns are functional and display an add meal popup.*<br>
- Completed form validation, more information in the `validation-worthy.md` file.
  -  View the current signup page [here](https://asp-projects-team-38.github.io/Meal-App-View-Frontend/signup.html).<br>

  <br>
*\*I need to add comments to the PopulateCalendar class I created, to explain what each function does. I'll also be creating a summary doc on the calendar/planner to make it easier to integrate with the backend. Plus a summary doc for the functions I created in SASS for the CSS. (Worthy)\**<br>

---

## To run it on your local machine

Required binaries:
| Binary      | Development Using Version |
| ----------- | ----------- |
| `node`      | v19.6.0       |
| `npm`       | 9.4.0        |
| `docker`    | Docker version 20.10.12, build e91ed57       |
| `mysql`     | mysql  Ver 8.0.32 for macos12.6 on x86_64 (Homebrew)        |


Steps:
1. Run `mysql` container
   ```
   docker run -d -p 3306:3306 \
    --name mysql-container -e MYSQL_ROOT_PASSWORD=root \
     -e MYSQL_DATABASE=meal_app -e MYSQL_USER=sqluser \
     -e MYSQL_PASSWORD=password mysql/mysql-server:8.0.32
   ```
2. Connect to the DB
   ```
   mysql -h 127.0.0.1 -u sqluser -p
   ```
3. Switch to the application DB
   ```
   USE meal_app;
   ```
4. Create DB tables using the SQL statements [here](https://github.com/ASP-Projects-Team-38/Meal-App/blob/main/sql/db_objects.sql)
5. Clone this repo
   ```
   git clone https://github.com/ASP-Projects-Team-38/Meal-App.git
   cd Meal-App
   ```
6. Install dependencies
   ```
   npm install
   ```
7. Run the app
   ```
   npm start
   ```
8. Open the app in broswer
   ```
   http://127.0.0.1:5000
   ```

