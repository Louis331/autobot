const Discord = require('discord.js')
const client = new Discord.Client()
var fs = require("fs")
var request = require('request')

var prefix = '!'
var jokeList = require('./joke.json')
var newJokeList = {}
var userTimeList = {}

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
            msg.reply('your next message will be the joke set up. What is the set up?')
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

                if (!newJoke.setUp){

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
