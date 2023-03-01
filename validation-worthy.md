# Validation
### Sign Up Page
For the sign up form I made sure that all the inputs were required, and wrote the following regex patterns to validate the users input:<br>
*The logic that checks these patterns is in the `signup.js` file.*

#### First name
`[(A-Z)|(a-z)|\-]{1,75}`<br>
Checks whether the users input is between 1 and 75 characters, and only contains letters and dashes.

#### Last name
`[(A-Z)|(a-z)|\-]{1,75}`<br>
Checks whether the users input is between 1 and 75 characters, and only contains letters and dashes.

#### Phone number
`[0-9|+]{11,15}`<br>
Checks whether the users input is between 11 and 15 characters, and only contains numbers and +.

#### Email
`^[(A-Z)|(a-z)|_|\d]{1,50}@[(A-Z)|(a-z)]{1,20}\.[(A-Z)|(a-z)|\.]{1,8}$`<br>
Checks whether the users input is a valid email.

#### Username
`[(A-Z)|(a-z)|_|\-|\d]{3,50}`<br>
Checks whether the users input is between 3 and 50 characters, and only contains letters, numbers, underscores and dashes.

#### Passwords
`^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$`<br>
Checks whether the users input contains a minimum of 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number.
