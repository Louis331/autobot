const db = require('../db.js');

const table = process.env.MOVIE_TABLE
const blackListTable = process.env.BLACK_LIST_TABLE

module.exports.getAllMovies = async function() {

    movies = {};

    await db.fetchAllItems(table).then(data => {
        data.forEach((item) => {
            movies[item.id] = item.data()['title'];
            delete movies.currentId
        });
    });

    return movies;

}

module.exports.getRandomMovie = async function() {

    movie = ''

    await module.exports.getAllMovies().then(data => {
        movies = Object.values(data);
        randomNum = Math.floor(Math.random() * movies.length);
        movie = movies[randomNum];
        // return movie
    });

    return movie;
}

module.exports.getNumberOfMovies = async function() {

    movies = await module.exports.getAllMovies();

    return Object.keys(movies).length;

}

module.exports.addMovie = async function(movie) {

    movieAdded = false

    existingId = await module.exports.checkMovieExists(movie)
    movieInNotBlackList = await module.exports.checkMovieNotInBlackList(movie)

    await module.exports.getCurrentId().then(id => {
        if (!existingId && movieInNotBlackList) {
            id = id['value'];
            db.addItem(table, id.toString(), { title: movie });
            module.exports.updateId(++id);
            movieAdded = true;
        }
    });

    return movieAdded;
}

module.exports.checkMovieExists = async function(movie) {

    id = '';

    await module.exports.getAllMovies().then(movies => {
        Object.keys(movies).forEach(key => {
            mov = movies[key].toString().toLowerCase();
            if (mov === movie.toLowerCase()) {
                id = key;
                return;
            }
        });
    });

    return id;
}

module.exports.removeMovie = async function(movie) {

    beenRemoved = false

    await module.exports.checkMovieExists(movie).then(id => {
        if (id) {
            db.deleteItem(table, id);
            beenRemoved = true;
        }
    });

    return beenRemoved;
}

module.exports.updateId = function(newId) {

    db.updateItem(table, 'currentId', { value: newId });
}


module.exports.getCurrentId = async function() {

    return await db.fetchItem(table, 'currentId');

}

module.exports.checkMovieNotInBlackList = async function(movie) {

    movieInBlackList = false;

    await module.exports.getAllBlackList().then(movies => {
        Object.keys(movies).forEach(key => {
            mov = movies[key].toString().toLowerCase();
            if (mov === movie.toLowerCase()) {
                movieInNotBlackList = true;
                return;
            }
        });
    });

    return movieInBlackList;

}

module.exports.getAllBlackList = async function() {

    movies = {};

    await db.fetchAllItems(blackListTable).then(data => {
        data.forEach((item) => {
            movies[item.id] = item.data()['title'];
            delete movies.currentId
        });
    });

    return movies;

}