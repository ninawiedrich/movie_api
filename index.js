const express = require('express');
const morgan = require('morgan'),
bodyParser = require('body-parser'),
uuid = require('uuid');

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/MovieMaven', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


//READ DATA
app.get('/', (req, res) => {
    res.send('The whole of life is just like watching a film. Only it is as though you always get in ten minutes after the big picture has started, and no-one will tell you the plot, so you have to work it out all yourself from the clues. - Terry Pratchett');
  });

  // Get all users -> add in documentation!
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get a user by username -> add in documentation!
app.get('/users/:username', (req, res) => {
  Users.findOne({ username: req.params.username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get all movies
app.get('/movies', (req, res) => {
  Movies.find()
  .then((movies) => {
  res.status(200).json(movies);
  })
  .catch((err) => {
  console.error(err);
  res.status(500).send('Error: ' + err);
  });
  });

// Get a movie by title
app.get('/movies/:Title', (req, res) => {
  Movies.findOne({ title: req.params.Title })
  .then((movie) => {
  res.status(200).json(movie);
  })
  .catch((err) => {
  console.error(err);
  res.status(500).send('Error: ' + err);
  });
  });


// Get the director of a movie
app.get('/movies/director/:Title', (req, res) => {
  Movies.findOne({ title: req.params.Title })
  .then((movie) => {
  res.status(200).json(movie.director);
  })
  .catch((err) => {
  console.error(err);
  res.status(500).send('Error: ' + err);
  });
  });

 // Get the genre of a movie
app.get('/movies/genre/:Title', (req, res) => {
  console.log(req.params.Title)
  Movies.findOne({ title: req.params.Title })
  .then((movie) => {
    console.log("movie", movie.genre)
  res.status(200).json(movie.genre);
  })
  .catch((err) => {
  console.error(err);
  res.status(500).send('Error: ' + err);
  });
  });

  // Get the description of a movie
app.get('/movies/description/:Title', (req, res) => {
  Movies.findOne({ title: req.params.Title })
  .then((movie) => {
  res.status(200).json(movie.description);
  })
  .catch((err) => {
  console.error(err);
  res.status(500).send('Error: ' + err);
  });
  });

 // Get the image URL of a movie
app.get('/movies/image/:Title', (req, res) => {
  Movies.findOne({ title: req.params.Title })
  .then((movie) => {
  res.status(200).json(movie.imageUrl);
  })
  .catch((err) => {
  console.error(err);
  res.status(500).send('Error: ' + err);
  });
  });

 // Get movies by genre
 app.get('/movies/genres/:GenreName', (req, res) => {
  Movies.find({ "genre.name": req.params.GenreName })
  .then((movies) => {
  res.status(200).json(movies);
  })
  .catch((err) => {
  console.error(err);
  res.status(500).send('Error: ' + err);
  });
  });

// Get movies by director
app.get('/movies/directors/:DirectorName', (req, res) => {
  Movies.find({ 'director.name': req.params.DirectorName })
  .then((movies) => {
  res.status(200).json(movies);
  })
  .catch((err) => {
  console.error(err);
  res.status(500).send('Error: ' + err);
  });
  });

//Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  username: String,
  password: String,
  email: String,
  birthday: Date
}*/
app.post('/users', (req, res) => {
  Users.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.username + 'already exists');
      } else {
        Users
          .create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            birthday: req.body.birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Update a user's info, by username
/* We’ll expect JSON in this format
{
  username: String,
  (required)
  password: String,
  (required)
  email: String,
  (required)
  birthday: Date
}*/
app.put('/users/:username', (req, res) => {
  Users.findOneAndUpdate(
		{ username: req.params.username },
		{
			$set: {
				username: req.body.username,
				password: req.body.password,
				email: req.body.email,
				birthday: req.body.birthday,
			},
		},
		{ new: true }
	)
		.then((user) => {
			if (!user) {
				return res.status(404).send('Error: No user was found');
			} else {
				res.json(user);
			}
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
  });

// Add a movie to a user's list of favorites
app.post('/users/:username/movies/:objectId', (req, res) => {
  Users.findOneAndUpdate(
    { username: req.params.username },
    { $push: { favoriteMovies: req.params.objectId } },
    { new: true }
  )
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// Delete a movie from a user's list of favorites
app.delete('/users/:username/movies/:objectId', (req, res) => {
  Users.findOneAndUpdate(
  { username: req.params.username },
  { $pull: { favoriteMovies: req.params.objectId } },
  { new: true }
  )
  .then((updatedUser) => {
  res.status(200).json(updatedUser);
  })
  .catch((err) => {
  console.error(err);
  res.status(500).send('Error: ' + err);
  });
  });

// Delete a user by username
app.delete('/users/:username', (req, res) => {
  Users.findOneAndRemove({ username: req.params.username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.username + ' was not found');
      } else {
        res.status(200).send(req.params.username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


  // Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);  // Log error stack to terminal
    res.status(500).send('Something went wrong!');  // Send error message to client
});

// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });