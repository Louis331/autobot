const Discord = require('discord.js');
const bot = new Discord.Client();
const fileHandle = require('./fileHandler');
const fileLocation = './config.json'
var fs = require("fs");
const db = require('./db.js');
const API = require('call-of-duty-api')();

var express = require('express');
var app = express();
var bodyParser = require('body-parser').json();

async function login(){
    try {
        await API.login(process.env.NAME, process.env.PASSWORD);
     } catch(Error) {
         console.log(Error);
     }
}

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

db.fetchAllItems(process.env.CONFIG_TABLE).then(data => {
    configObject = {}
    data.forEach((item) => {
        configObject[item.id] = item.data()['value'];
    });
    fileHandle.writeFile(fileLocation, configObject);
})

login();


bot.commands = new Discord.Collection();
getCommands();

bot.on('ready', () => {
    console.log('Bot is alive')

    app.post('/', bodyParser, (req, res) => {
        let movie = req.body.movie
        bot.channels.cache.get(fileHandle.readFile(fileLocation)['movieRoom']).send(`${movie} has been added to the list of movies`)
        return res.send('Recived post');
    })

    app.get('/', (req, res) => {
        console.log('bot is awake');
        return res.send('Bot is awoken');
    })

    app.listen(process.env.PORT, () => {
        console.log('Server is running')
    })
});

bot.on('message', async msg => {
    var prefix = fileHandle.readFile(fileLocation)['prefix']
    if (msg.author.bot) return;
    let messageContents = msg.content

    if (messageContents.startsWith(prefix)) {
        let msgArray = messageContents.toLowerCase().split(' ');
        let cmd = msgArray[0];
        let commandfile = bot.commands.get(cmd.slice(prefix.length));
        if (commandfile && `${prefix}${commandfile.help.name}` === cmd) {
            commandfile.run(bot, msg, msgArray, API).catch(function(error) {
                console.log(error);
            });
        }
    } else if (msg.channel.id === fileHandle.readFile(fileLocation).movieId) {
        var role = msg.guild.roles.cache.find(role => role.name === 'Event ticket')
        msg.member.roles.add(role);
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