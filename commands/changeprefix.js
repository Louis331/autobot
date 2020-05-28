const ConfigItem = require('../models/ConfigItem');

module.exports.run = async(bot, msg, msgContent) => {

    if (msg.member.hasPermission('ADMINISTRATOR')) {

        msg.delete();
        if (msgContent.length > 1) {

            let prefixConfigItem = new ConfigItem('prefix', msgContent.slice(1).join(' '));
            prefixConfigItem.addToDb();
        } else {
            
            msg.author.send('You forgot the new prefix');
        }
    }
}

module.exports.help = {
    'name': 'changeprefix',
    'description': 'use to change the prefix'
}
