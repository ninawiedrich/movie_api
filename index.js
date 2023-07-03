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

let users = [
    {
        id: 1,
        name: "John",
        favoriteMovies: []
    },
    {
        id: 2,
        name: "Jane",
        favoriteMovies: ["Joker"]
    }
    ];

    let topMovies = [
        {
         "title": "The Lord of the Rings: The Return of the King",
         "director": {
           "name": "Peter Jackson",
           "bio": "Peter Jackson is a renowned New Zealand filmmaker. He is best known for his work in directing and producing The Lord of the Rings trilogy, which garnered critical acclaim and commercial success.",
           "birth": "October 31, 1961"
         },
         "description": "The Lord of the Rings: The Return of the King is the third installment of the epic fantasy trilogy directed by Peter Jackson. It follows the journey of Frodo Baggins as he and his companions fight against the forces of evil to destroy the One Ring and save Middle-earth.",
         "genre": {
           "name": "Fantasy",
           "description": "Fantasy movies involve imaginative and often magical elements, taking viewers into fictional worlds filled with mythical creatures, supernatural powers, and epic quests."
         },
         "imageUrl": "https://example.com/lotr_return_of_the_king.jpg",
         "featured": true
     },
     {
        "title": "The Hobbit: An Unexpected Journey",
        "director": {
          "name": "Peter Jackson",
          "bio": "Peter Jackson is a renowned New Zealand filmmaker. He is best known for his work in directing and producing The Lord of the Rings trilogy, which garnered critical acclaim and commercial success.",
          "birth": "October 31, 1961"
        },
        "description": "The Hobbit: An Unexpected Journey is the first film in the three-part series directed by Peter Jackson. The movie follows Bilbo Baggins, who is thrust into an epic quest to reclaim the lost Dwarf Kingdom of Erebor from the fearsome dragon Smaug, along with the wizard Gandalf and thirteen dwarves.",
        "genre": {
          "name": "Fantasy",
          "description": "Fantasy movies involve imaginative and often magical elements, taking viewers into fictional worlds filled with mythical creatures, supernatural powers, and epic quests."
        },
        "imageUrl": "https://example.com/the_hobbit_an_unexpected_journey.jpg",
        "featured": true
      },
     {
         "title": "The Social Network",
         "director": {
           "name": "David Fincher",
           "bio": "David Fincher is an American filmmaker known for his meticulous approach to filmmaking and his visually striking style. He has directed several critically acclaimed movies across various genres.",
           "birth": "August 28, 1962"
         },
         "description": "The Social Network is a biographical drama film directed by David Fincher. It explores the founding of the social networking website Facebook and the legal battles and personal conflicts that arise among its creators.",
         "genre": {
           "name": "Biography",
           "description": "Biography movies depict the life and achievements of real people, often focusing on notable figures from history, politics, arts, sports, or other fields. They provide insights into their personal stories, struggles, and accomplishments."
         },
         "imageUrl": "https://example.com/the_social_network.jpg",
         "featured": true
     },
     {
         "title": "Whiplash",
         "director": {
           "name": "Damien Chazelle",
           "bio": "Damien Chazelle is an American filmmaker known for his passionate storytelling and his focus on music-related themes. He has received critical acclaim for his work, particularly in the realm of musical dramas.",
           "birth": "January 19, 1985"
         },
         "description": "Whiplash is an intense drama film directed by Damien Chazelle. It portrays the relationship between a young jazz drummer and his demanding music teacher, highlighting themes of ambition, obsession, and sacrifice.",
         "genre": {
           "name": "Drama",
           "description": "Drama movies delve into human emotions, conflicts, and relationships, portraying realistic and often thought-provoking narratives. They explore a wide range of themes and provide insights into the human condition."
         },
         "imageUrl": "https://example.com/whiplash.jpg",
         "featured": false
     },
     {
         "title": "The Grand Budapest Hotel",
         "director": {
           "name": "Wes Anderson",
           "bio": "Wes Anderson is an American filmmaker known for his distinctive visual style and quirky storytelling. His movies often feature eccentric characters, intricate set designs, and a whimsical blend of comedy and drama.",
           "birth": "May 1, 1969"
         },
         "description": "The Grand Budapest Hotel is a delightful comedy film directed by Wes Anderson. It revolves around the misadventures of a legendary hotel concierge and his loyal lobby boy during the 1930s in the fictional Republic of Zubrowka.",
         "genre": {
           "name": "Comedy",
           "description": "Comedy movies aim to entertain and amuse audiences through humorous situations, witty dialogue, and comedic performances. They encompass various subgenres, including romantic comedy, slapstick, satire, and more."
         },
         "imageUrl": "https://example.com/grand_budapest_hotel.jpg",
         "featured": true
     },
     {
         "title": "Moonlight",
         "director": {
           "name": "Barry Jenkins",
           "bio": "Barry Jenkins is an American filmmaker known for his emotionally resonant storytelling and his exploration of themes such as identity, race, and sexuality. He has received critical acclaim for his work.",
           "birth": "November 19, 1979"
         },
         "description": "Moonlight is a coming-of-age drama film directed by Barry Jenkins. It tells the story of a young African-American man growing up in Miami and explores themes of identity, sexuality, and self-discovery.",
         "genre": {
           "name": "Drama",
           "description": "Drama movies delve into human emotions, conflicts, and relationships, portraying realistic and often thought-provoking narratives. They explore a wide range of themes and provide insights into the human condition."
         },
         "imageUrl": "https://example.com/moonlight.jpg",
         "featured": false
     },
     {
         "title": "Joker",
         "director": {
           "name": "Todd Phillips",
           "bio": "Todd Phillips is an American filmmaker known for his work in both comedy and drama. He has directed a variety of movies, exploring different genres and styles, including the dark and psychological thriller Joker.",
           "birth": "December 20, 1970"
         },
         "description": "Joker is a psychological thriller film directed by Todd Phillips. It presents a new take on the iconic DC Comics character, delving into the origin story of the Joker and exploring themes of mental health and societal unrest.",
         "genre": {
           "name": "Crime",
           "description": "Crime movies revolve around criminal activities, heists, investigations, and the cat-and-mouse games between law enforcement and criminals. They often explore themes of morality, justice, and the human psyche."
         },
         "imageUrl": "https://th.bing.com/th/id/OIP.fL19ecp28oQxx097fTpUPQHaEK?pid=ImgDet&rs=1",
         "featured": true
     },
     {
         "title": "Gravity",
         "director": {
           "name": "Alfonso Cuarón",
           "bio": "Alfonso Cuarón is a Mexican filmmaker known for his visually stunning and thought-provoking movies. He has received critical acclaim for his work, including the sci-fi thriller Gravity.",
           "birth": "November 28, 1961"
         },
         "description": "Gravity is a thrilling sci-fi film directed by Alfonso Cuarón. It follows the harrowing journey of two astronauts stranded in space after their shuttle is destroyed, testing their will to survive in the vast and unforgiving void.",
         "genre": {
           "name": "Science Fiction",
           "description": "Science fiction movies explore imaginative and futuristic concepts, often incorporating advanced technology, space exploration, time travel, or alternative realities. They provoke thought and speculation about the possibilities of the future."
         },
         "imageUrl": "https://example.com/gravity.jpg",
         "featured": false
     },
     {
         "title": "The Shape of Water",
         "director": {
           "name": "Guillermo del Toro",
           "bio": "Guillermo del Toro is a Mexican filmmaker known for his visually striking and imaginative movies. He has directed a range of films, including the romantic fantasy The Shape of Water, which garnered critical acclaim.",
           "birth": "October 9, 1964"
         },
         "description": "The Shape of Water is a romantic fantasy film directed by Guillermo del Toro. Set during the Cold War era, it tells the story of a mute woman who forms a unique bond with an amphibious creature held captive in a secret government facility.",
         "genre": {
           "name": "Fantasy",
           "description": "Fantasy movies involve imaginative and often magical elements, taking viewers into fictional worlds filled with mythical creatures, supernatural powers, and epic quests."
         },
         "imageUrl": "https://example.com/shape_of_water.jpg",
         "featured": true
     },
     {
         "title": "Her",
         "director": {
           "name": "Spike Jonze",
           "bio": "Spike Jonze is an American filmmaker known for his unique visual style and his ability to blend reality with surrealism. He has directed a diverse range of movies, including the romantic science fiction film Her.",
           "birth": "October 22, 1969"
         },
         "description": "Her is a romantic science fiction film directed by Spike Jonze. It explores the unconventional relationship between a lonely writer and an advanced operating system with artificial intelligence, raising questions about love, connection, and the nature of humanity.",
         "genre": {
           "name": "Romance",
           "description": "Romance movies focus on love, passion, and the intricacies of relationships. They often depict the emotional journey of individuals or couples, exploring themes of attraction, desire, and the complexities of human connections."
         },
         "imageUrl": "https://example.com/her.jpg",
         "featured": false
     }
     ];

  
     
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
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.get('/movies', (req, res) => {
    res.status(200).json(topMovies);
  });

  app.get('/movies/:Title', (req, res) => {
    // const { title } = req.params;
    // const movie = topMovies.find(movie => movie.title === title);
    const movie = topMovies.find((movie) => movie.title === req.params.Title);
    
    if (movie) {res.status(200).json(movie);
    } else {
        res.status(404).send('Movie not found.');
    }
  });


  app.get('/movies/director/:Title', (req, res) => {
    const director = topMovies.find((movie) => movie.title === req.params.Title).director.name;
    
    if (director) {res.status(200).json(director);
    } else {
        res.status(404).send('Director not found.');
    }
  });

  app.get('/movies/genre/:Title', (req, res) => {
    const genre = topMovies.find((movie) => movie.title === req.params.Title).genre.name;
    
    if (genre) {res.status(200).json(genre);
    } else {
        res.status(404).send('Genre not found.');
    }
  });

  app.get('/movies/description/:Title', (req, res) => {
    const description = topMovies.find((movie) => movie.title === req.params.Title).description;
    
    if (description) {res.status(200).json(description);
    } else {
        res.status(404).send('Description not found.');
    }
  });

  app.get('/movies/image/:Title', (req, res) => {
    const image = topMovies.find((movie) => movie.title === req.params.Title).imageUrl;
    
    if (image) {res.status(200).json(image);
    } else {
        res.status(404).send('Image not found.');
    }
  });

  app.get('/movies/genre/:GenreName', (req, res) => {
    const genre = topMovies.find((movie) => movie.genre.name === req.params.GenreName).genre;
    if (genre) {res.status(200).json(genre);
    } else {
        res.status(404).send('Genre not found.');
    }  
});

app.get('/movies/directors/:DirectorName', (req, res) => {
    const director = topMovies.find((movie) => movie.director.name === req.params.DirectorName).director;
    if (director) {res.status(200).json(director);
    } else {
        res.status(404).send('Director not found.');
    }  
});

//Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
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

// //UPDATE USER INFO
// app.put('/users/:id', (req, res) => {
//     const user = users.find((user) => user.id == req.params.id)

//     if(user) {
//     user.name = req.body.name;
//         res.status(200).json(user);
//     } else {
//         res.status(404).send('User not found.');
//     }

// });

// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// //ADD MOVIE TO FAVORITES
// app.post('/users/:id/:MovieTitle', (req, res) => {
//     const user = users.find((user) => user.id == req.params.id)

//     if(user) {
//     user.favoriteMovies.push(req.params.MovieTitle);
//         res.status(200).send(`Movie ${req.params.MovieTitle} has been added to user ${req.params.id}'s array.`);
//     } else {
//         res.status(404).send('User not found.');
//     }
// });

//DELETE MOVIE FROM FAVORITES
app.delete('/users/:id/:MovieTitle', (req, res) => {
    const user = users.find((user) => user.id == req.params.id)
    
        if(user) {
        user.favoriteMovies = user.favoriteMovies.filter((movie) => movie !== req.params.MovieTitle);
            res.status(200).send(`Movie ${req.params.MovieTitle} has been deleted from user ${req.params.id}'s array.`);
        } else {
            res.status(404).send('User not found.');
        }
})

// //DELETE USER
// app.delete('/users/:id', (req, res) => {
//     const user = users.find((user) => user.id == req.params.id)
    
//         if(user) {
//         users = users.filter((user) => user.id !== req.params.id);
//             res.status(200).send(`User ${req.params.id} has been deleted.`);
//         } else {
//             res.status(404).send('User not found.');
//         }
// });

// Delete a user by username
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
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