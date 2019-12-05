const Discord = require('discord.js');

module.exports.run = async (bot, message, msgArray) => {
    const commands = bot.commands.filter((command) => command.help.description).map((command) => `!${command.help.name}:   ${command.help.description}`);

    const helpEmbed = new Discord.RichEmbed()
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