const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.static('public'));
app.use(morgan('common'));

let topMovies = [
   {
    "title": "The Lord of the Rings: The Return of the King",
    "director": "Peter Jackson"
},
{
    "title": "No Country for Old Men",
    "director": "Joel Coen, Ethan Coen"
},
{
    "title": "The Social Network",
    "director": "David Fincher"
},
{
    "title": "Whiplash",
    "director": "Damien Chazelle"
},
{
    "title": "The Grand Budapest Hotel",
    "director": "Wes Anderson"
},
{
    "title": "Moonlight",
    "director": "Barry Jenkins"
},
{
    "title": "Joker",
    "director": "Todd Phillips"
},
{
    "title": "Gravity",
    "director": "Alfonso Cuarón"
},
{
    "title": "The Shape of Water",
    "director": "Guillermo del Toro"
},
{
    "title": "Her",
    "director": "Spike Jonze"
},
  ];

const http = require('http');


app.get('/movies', (req, res) => {
    res.json(topMovies);
  });


  app.get('/', (req, res) => {
    res.send('The whole of life is just like watching a film. Only it is as though you always get in ten minutes after the big picture has started, and no-one will tell you the plot, so you have to work it out all yourself from the clues. - Terry Pratchett');
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