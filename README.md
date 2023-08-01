# Angular 2° Project by Brian Moretti

Welcome to my 2° Angular Project made for the Front-End Master of Star2Impact University.

## :technologist: Try now

If you wanna put your hand right now to my project just go there [City Clue](https://city-clue.web.app/cities)

## City Clue - Application

Welcome to my 'City Clue' application. This application is build using the API available at [Teleport API](https://developers.teleport.org/api/getting_started/)

### :computer: Main functionality

- **Input Textbox:** The application opens with a input textbox, used by the users to search cities.
- As the user start to digit some characters below the input will appear a window with several button. Each button represent a specific city filtered by the key typed.
- The user can navigate through the buttons even with the keyboard arrows
- Once decided the user can click the button or press 'Enter' to submit and return all the information about the choosen city.
  ![Screenshots of the application](/src/assets/github-screenshot/Screenshot%202023-08-01%20203756.png)
  ![Screenshots of the window after the user types characters](/src/assets/github-screenshot/Screenshot%202023-08-01%20203820.png)

- **City information :** Once submitted the application will show you:
- An image of the city, with it's name and it's continent's name;
- A description of the city
- The total score provided by the Teleport API
- A list of catagory with their relative scores

Coming back to the input texbox you can search another city and the view will automatically updated

![Screenshots of the city's informations](/src/assets/github-screenshot/Screenshot%202023-08-01%20203952.png)

- **Other functionality:**:
- If the name in the texbox is wrong or does not exist a message error will appear inviting the user to try again.
- If a view is active showing a city the user can reset the view by clicking the title on the top of the page.

### :hammer: How is build:

The applications is build using:

- Angular
- SCSS
- Bootstrap
- PrimeNG
- Firebase (Hosting)

The application has the following features:

- Test Code-Coverage greater than 60%
- 2 NGModules: 'Cities' and 'App'. Cities Module is configured to be Lazy-Load. You can see the process spying the Devs tools of your Browser.

## :gear: Config the application on locale

Copy the repository from my Github  
Run `npm install` to install all the modules needed to use the application  
Run `ng serve -o` or `ng serve open` to launch the app locally and open immediately `http://localhost:4200/`.  
Run `ng test` to execute the unit tests via Karma

## :incoming_envelope: Contact me

If you find some bugs to fix or simply you want to send me a message please write me at [brianmoretti2512@gmail.com](mailto:brianmoretti2512@gmail.com)
