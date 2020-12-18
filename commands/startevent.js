const ConfigItem = require('../models/ConfigItem');
const movieList = require('../models/MovieList');

module.exports.run = async(bot, msg, msgContent) => {
    if (msg.member.hasPermission('ADMINISTRATOR')) {
        if (msgContent.length > 2) {

            if (msgContent.length === 3 && msgContent[2] === 'random') {
                name = await movieList.getRandomMovie();
                name = 'watching ' + name
            } else {
                name = msg.content.split(' ').slice(2).join(' ');
            }

            msg.channel.send(`@everyone Event incoming. ${name}. Starting at ${msgContent.slice(1,2)}. Reply to this message to show interest`);

            let movieChannelConfig = new ConfigItem('movieId', 0);
            movieChannelConfig.v = msg.channel.id;
            movieChannelConfig.addToDb();

            msg.channel.updateOverwrite(msg.guild.id, {
                SEND_MESSAGES: true
            });

        } else {
            msg.author.send('Needs to be in format `!startevent time nameofmovie`');
        }

        msg.delete();
    }
}

module.exports.help = {
    'name': 'startevent',
    'description': 'admin only. This starts the event `event <time> <name>`'
}