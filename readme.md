# MovieMaven Movie App

MovieMaven is a movie web application that provides users with access to information about different movies, directors, and genres. Users can sign up, update their personal information, and create a list of their favorite movies.

## Features

### Essential Features
- Return a list of ALL movies to the user.
- Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user.
- Return data about a genre (description) by name/title (e.g., “Thriller”).
- Return data about a director (bio, birth year, death year) by name.
- Allow new users to register.
- Allow users to update their user info (username, password, email, date of birth).
- Allow users to add a movie to their list of favorites.
- Allow users to remove a movie from their list of favorites.
- Allow existing users to deregister.

### "Cherry on the top" Features
- Allow users to see which actors star in which movies.
- Allow users to view information about different actors.
- Allow users to view more information about different movies, such as the release date and the movie rating.
- Allow users to create a “To Watch” list in addition to their “Favorite Movies” list.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to install Node.js and MongoDB on your machine to run this project.

### Installing

Clone this repository to your local machine and install all the dependencies.

```bash
git clone https://github.com//ninawiedrich/movie_api
cd movie_api
npm install
Running the App
To start the app, run the following command in your terminal:

bash
Copy code
npm start
This will run the app in the development mode. Open http://localhost:5000 to view it in the browser.

Running the tests
Explain how to run the automated tests for this system.

Built With
Node.js
Express
MongoDB
Mongoose