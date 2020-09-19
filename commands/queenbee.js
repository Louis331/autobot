const Discord = require('discord.js');

module.exports.run = async(bot, message, msgArray) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
        noTimes = msgArray[1];
        for (i = 0; i < noTimes; i++) {
            message.channel.send('<@235474857817538560> your queen is summoning you')
        }
    }
}

module.exports.help = {
    name: "queenbee",
    description: 'Call the worker bee `!queenbee number`'
}