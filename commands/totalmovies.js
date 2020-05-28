const Discord = require('discord.js');
const movieList = require('../models/MovieList');

module.exports.run = async (bot, msg, msgArray) => {
    numMovies = await movieList.getNumberOfMovies();
    msg.reply(`Total number of movies is: ${numMovies}`);
}

module.exports.help = {
	name: "totalmovies",
	description: 'number of total movies'
}