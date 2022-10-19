# My second fullstack project

## About
- An online scheduler app that allows users to login and schedule their own activities for the next month by completing a form with the activity details (name, date, space, floor).
- The data are sent to a MySQL database and displayed in a table back in the application, so the users can see their activities.

## Stack-used:
- Front-end: JavaScript, React, CSS;
- Back-end: JavaScript, Node.js;
- Database: MySQL;
- Deployment: GitHub, Heroku(for backend), Netlify(for frontend);

- App link: https://schedule-app-frontend.netlify.app/

- Note: I am still working on some bugs

- This is the main page of the app, where users can choose between entering the form page to schedule their activity and entering the table page to view their activity
![2022-08-20](https://user-images.githubusercontent.com/91996303/194409929-3cfc56a2-f0bf-43d1-8cc2-e18d48a89940.png)

- This is the schedule page where users can schedule their activities
![2022-10-06 (6)](https://user-images.githubusercontent.com/91996303/194410666-1d137ba8-6806-4099-8678-8d5bdca87e9a.png)

- By clicking the "Insert date" field, a chalendar and a spaces table
- The users can select the date, the time interval and the spaces available in that interval
![2022-10-06 (4)](https://user-images.githubusercontent.com/91996303/194412702-b6530818-8d7f-4303-85d3-d9f30c92666b.png)

- And this is the table where the activities returned from the database are organised
- User can filter the data by searcing for a specific criteria in the table
![2022-10-06 (9)](https://user-images.githubusercontent.com/91996303/194413026-a987756c-d063-46b4-84e4-f9d6d766e9cb.png)

- The user's password is sent to the database as hashed data with bcrypt
- The user need to confirm his/her email address to authenticate
- The user can reset their passwords by requesting an email containing a password reset link to be sent to their address

- The project is not finished yet, I'm still working on it
- The project can be used for various pusposes like managing activities in a school or another institution that requires a good time management.
