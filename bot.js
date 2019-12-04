const Discord = require('discord.js')
const client = new Discord.Client()
var fs = require("fs")
var request = require('request')

var prefix = '!'
var jokeList = require('./joke.json')
var newJokeList = {}
var userTimeList = {}
var queue_of_users = []
var movieChannelId = 0

class Joke {
    constructor(){
        this.setUp = ''
        this.punchLine = ''
    }
    
    addJoke(){
        if (this.setUp && this.punchLine){
            //add joke
            console.log('adding new joke')
            var id = jokeList[jokeList.length - 1]['id'] + 1
            jokeList.push({'id': id, type: 'general', 'setUp': this.setUp, 'punchLine': this.punchLine})
        }else{
            throw Error('incorrect format');
        }
    }
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

  client.on('message', msg => {
        if (msg.channel.id != '598806292156514335'){
            if (msg.content.toLowerCase().startsWith(`${prefix}startmovie`) && !msg.author.bot && msg.member.hasPermission('ADMINISTRATOR')){
                command = msg.content.split(' ')
                if (command.length > 2){
                    msg.channel.send(`Movie event incoming. Will be watching ${command.slice(2)}. Starting at ${command.slice(1,2)}. Reply to this message to get a movie ticket`)
                }else{
                    msg.author.send('Needs to be in format `!startmovie time nameofmovie`')
                }
                movieChannelId = msg.channel.id
                msg.channel.overwritePermissions(msg.guild.id, {
                    SEND_MESSAGES: true
                })
            }
            else if (msg.channel.id === movieChannelId && !msg.author.bot){
                console.log('given role')
                var role = msg.guild.roles.find(role => role.name === 'Movie ticket')
                msg.member.addRole(role);
            }
            if (msg.content.toLowerCase() === `${prefix}stopmovie` && msg.member.hasPermission('ADMINISTRATOR') && msg.channel.id === movieChannelId){
                console.log('stopping movie')
                var role = msg.guild.roles.find(role => role.name === 'Movie ticket')
                msg.guild.members.forEach(user => user.removeRole(role))
                msg.channel.overwritePermissions(msg.guild.id, {
                    SEND_MESSAGES: false
                })
                movieChannelId = 0
                msg.channel.fetchMessages()
                    .then(function(list){
                        msg.channel.bulkDelete(list)
                    })
            }
            if (msg.content.toLowerCase() === `${prefix}purge` && msg.member.hasPermission('ADMINISTRATOR')){
                msg.channel.fetchMessages()
                    .then(function(list){
                        msg.channel.bulkDelete(list)
                    })
            }
            if (msg.channel.id != movieChannelId){
                switch(msg.content.toLowerCase()){
                    case 'health':
                        msg.reply(msg.content)
                    break
                    case prefix + 'joke':
                        if (! (msg.author in userTimeList) || Date.now() - userTimeList[msg.author] > 30000){

                            var joke = jokeList[random(jokeList.length)]
                            msg.channel.send(joke['setup'])

                            sleep(5000).then(() =>{ 
                                msg.channel.send(joke['punchline'])
                            })
                            
                            userTimeList[msg.author] = Date.now()
                        }else{
                            msg.author.send('You can get another joke in ' +  - Math.floor(((Date.now() - userTimeList[msg.author]) - 30000)/1000) + ' seconds')
                        }
                    break
                    case prefix +'add joke':
                        newJokeList[msg.author] = new Joke()
                        msg.reply('your next message will be the joke set up. What is the set up? Type cancel to stop adding the joke')
                    break
                    case prefix+'cat picture':
                        if ((Math.floor(Math.random() * 2) + 1) === 1){
                            request('https://api.thecatapi.com/v1/images/search', function (error, response, body){
                                msg.channel.send('Your cat picture',
                                {file: JSON.parse(body)[0]['url'] }
                            )
                            })
                        }else{
                            request('https://aws.random.cat/meow', function(error, response, body){
                                console.log(JSON.parse(body))
                                msg.channel.send('Your cat picture',
                                {file: JSON.parse(body)['file'] }
                                )
                            })
                        }
                    break
                    default:

                        if (msg.author in newJokeList){
                            var newJoke = newJokeList[msg.author]

                            if(msg.content.toLowerCase() === 'cancel'){
                                delete newJokeList[msg.author]
                                msg.reply("joke has been canceled")
                            }else if (!newJoke.setUp){

                                newJoke.setUp = msg.content
                                msg.reply('your next message will be the joke punchline. What is the punchline?')

                            }else{

                                newJoke.punchLine = msg.content
                                newJoke.addJoke()
                                delete newJokeList[msg.author]
                                msg.reply('joke has been added')
                                writeToFile()

                            }
                        }
                    break
                }
            }
    }else{
        if (msg.author.id != '365975655608745985'){
            queue_of_users.push(msg.author.id)
        }else if (msg.embeds[0] && !msg.embeds[0].description.includes('Congratulations')) {
            user = queue_of_users.shift()
            var message = new Discord.RichEmbed()
                .setTitle(msg.embeds[0].title)
                .setDescription(msg.embeds[0].description)
            client.users.get(user).send(message)
        }
        msg.delete()
    }
  })

function random(number){
    return Math.floor(Math.random()*number)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function writeToFile(){
    fs.writeFile("joke.json", JSON.stringify(jokeList), (err) => {
        if (err) console.log(err);
        console.log('written to file')
    })
}
client.login(process.env.BOT_TOKEN)
