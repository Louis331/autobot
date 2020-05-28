const Discord = require('discord.js');
const movieList = require('../models/MovieList');

module.exports.run = async (bot, msg, msgArray) => {
    if (msg.member.hasPermission('ADMINISTRATOR')){
        if (msgArray.length > 1){
            name = msg.content.split(' ').slice(1).join(' ');

            movieList.removeMovie(name).then(removed => {
                if (removed){
                    msg.reply(`${name} has been removed from the movie list`);
                } else{
                    msg.reply('Movie doesn\'t exists');
                }
            })
            
        } else {
            msg.reply('Give me a movie you idiot');
        }
    }
}

module.exports.help = {
	name: "removemovie",
	description: '`removemovie <moviename>`'
}