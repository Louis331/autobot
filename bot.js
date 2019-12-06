const Discord = require('discord.js');
const bot = new Discord.Client();
const fileHandle = require('./fileHandler');
const fileLocation = './movieId.json'
var fs = require("fs");
var request = require('request');
var prefix = '!';

bot.commands = new Discord.Collection();
getCommands();

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`)
});

bot.on('message', async msg => {
    if (msg.author.bot) return;
    let messageContents = msg.content

    if (messageContents.startsWith(prefix)){
        let msgArray = messageContents.toLowerCase().split(' ');
        let cmd = msgArray[0];
        let commandfile = bot.commands.get(cmd.slice(prefix.length));
        if (commandfile && `${prefix}${commandfile.help.name}` === cmd) {
            commandfile.run(bot, msg, msgArray).catch(function(error){
                console.log(error);
            });
        }
    }else if (msg.channel.id === fileHandle.readFile(fileLocation).id){
        var role = msg.guild.roles.find(role => role.name === 'Movie ticket')
        msg.member.addRole(role);
    }
});

function getCommands() {
    fs.readdir("./commands", (err, files) => {
        if (err) console.log(err);

        let jsfile = files.filter(f => f.split('.').pop() === "js");

        if (jsfile.length <= 0) {
            console.log('No commands found.');
            return;
        };

        jsfile.forEach((f, i) => {
            let props = require(`./commands/${f}`);
            console.log(`${f} loaded!`);
            bot.commands.set(props.help.name, props);
        });
    });
};

bot.login(process.env.BOT_TOKEN);
