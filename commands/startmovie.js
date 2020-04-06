const ConfigItem = require('../models/ConfigItem');

module.exports.run = async (bot, msg, msgContent) =>{
    if (msg.member.hasPermission('ADMINISTRATOR')){
        if (msgContent.length > 2){
            name = msgContent.slice(2).join(' ');
            msg.channel.send(`@everyone Movie event incoming. Will be watching ${name}. Starting at ${msgContent.slice(1,2)}. Reply to this message to get a movie ticket`);
            let movieChannelConfig = new ConfigItem('movieId', 0);
            movieChannelConfig.v = msg.channel.id;
            movieChannelConfig.addToDb();
            msg.channel.updateOverwrite(msg.guild.id, {
                SEND_MESSAGES: true
            });
        }else{
            msg.author.send('Needs to be in format `!startmovie time nameofmovie`');
        }
        msg.delete();
    }
}

module.exports.help = {
    'name': 'startmovie',
    'description': 'this starts the movie event `startmovie <time> <name>`'
}