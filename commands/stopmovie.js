const file = require('../fileHandler');
const db = require('../db.js');
const fileLocation = './config.json';
const ConfigItem = require('../models/ConfigItem');

module.exports.run = async (bot, msg, msgContent) =>{

    currentFile = file.readFile(fileLocation);
    let movieChannelConfig = new ConfigItem('movieId', currentFile.movieId);

    if (msg.member.hasPermission('ADMINISTRATOR')
            && msg.channel.id === currentFile.movieId){

        var role = msg.guild.roles.cache.find(role => role.name === 'Movie ticket');
        msg.guild.members.cache.forEach(user => user.roles.remove(role));
        msg.channel.updateOverwrite(msg.guild.id, {
            SEND_MESSAGES: false
        });
        
        movieChannelConfig.v = 0;
        movieChannelConfig.addToDb();
        msg.channel.messages.fetch()
            .then(function(list){
                msg.channel.bulkDelete(list)
            });
        }
}

module.exports.help = {
    'name': 'stopmovie',
    'description': 'this stops the movie event'
}
