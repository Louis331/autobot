const ConfigItem = require('../models/ConfigItem');

module.exports.run = async(bot, msg, msgContent) => {

    if (msg.member.hasPermission('ADMINISTRATOR')) {

        let prefixConfigItem = new ConfigItem('movieRoom', msg.channel.id);
        prefixConfigItem.addToDb();

    }
}

module.exports.help = {
    'name': 'setmovieroom',
    'description': 'admin only. use to set the movie room'
}