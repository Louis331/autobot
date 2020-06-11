const ConfigItem = require('../models/ConfigItem');
const movieList = require('../models/MovieList');

module.exports.run = async(bot, msg, msgContent) => {
    name = await movieList.getRandomMovie();
    msg.reply(name);
}

module.exports.help = {
    'name': 'randommovie',
    'description': 'returns a random movie'
}