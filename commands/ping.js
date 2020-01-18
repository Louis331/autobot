const Discord = require('discord.js');

module.exports.run = async (bot, message, msgArray) => {
    message.reply('pong');
}

module.exports.help = {
	name: "ping",
	description: 'this is for ponging a ping'
}