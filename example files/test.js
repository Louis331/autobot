require('dotenv').config();
const movieList = require('../models/MovieList');

// movieList.removeMovie('0').then(bol => {
//   console.log(bol)
// });

movieList.getNumberOfMovies().then(movies => {
    console.log(movies)
});