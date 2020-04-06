const Discord = require('discord.js');
const fileHandle = require('./../fileHandler');
const fileLocation = './config.json'

module.exports.run = async(bot, message, msgArray) => {
    var prefix = fileHandle.readFile(fileLocation)['prefix']
    const commands = bot.commands.filter((command) => command.help.description).map((command) => `${prefix}${command.help.name}:   ${command.help.description}`);

    const helpEmbed = new Discord.MessageEmbed()
        .setColor('#ab34eb')
        .setTitle('Commands List')
        .addField('Commands:', `${commands.join("\n")}`)
        .setTimestamp();

    message.reply(helpEmbed);
    message.delete();
}

module.exports.help = {
    name: "help"
}