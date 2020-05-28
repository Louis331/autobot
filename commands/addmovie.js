const Discord = require('discord.js');
const movieList = require('../models/MovieList');

module.exports.run = async (bot, msg, msgArray) => {
    if (msgArray.length > 1){
        name = msg.content.split(' ').slice(1).join(' ');

        movieList.addMovie(name).then(added => {
            if (added){
                msg.reply(`${name} has been added to the movie list`);
            } else{
                msg.reply('Movie already exists');
            }
        })
        
    } else {
        msg.reply('Give me a movie you idiot');
    }
}

module.exports.help = {
	name: "addmovie",
	description: '`addmovie <moviename>`'
}
