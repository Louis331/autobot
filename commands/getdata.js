const Discord = require('discord.js');

knownUsers = {
    'louis': {'name': 'Louis331#2877', 'platform': 'battle'},
    'joe': {'name': 'JOE#26910', 'platform': 'battle'},
    'harry': {'name': 'Pokepunch#2651', 'platform': 'battle'},
    'sellars': {'name': 'jsellars97', 'platform': 'psn'}
}

class CodData {
    constructor(data) {
        data = data['br']
        this.wins = `Wins: ${data['wins']}`;
        this.kdRatio = `KD: ${Math.floor(Number(data['kdRatio'])*10000)/10000}`;
        this.kills = `Kills: ${data['kills']}`;
        this.downs = `Downs: ${data['downs']}`;
        this.contracts = `Contracts completed: ${data['contracts']}`;
        this.revives = `Revies: ${data['revives']}`;
        this.gamesPlayed = `Games played: ${data['gamesPlayed']}`;
        this.topFive = `Top fives: ${data['topFive']}`;
        this.topTen = `Top tens: ${data['topTen']}`;
        this.timePlayed = `Time played: ${this.covertTime(Number(data['timePlayed']))}`;
    }

    formatdata(){
        var data = [];
        for(var prop in this){
            data.push(this[prop]);
        }
        return data;
    }

    covertTime(seconds){
        var d = Math.floor(seconds / (3600*24));
        var h = Math.floor(seconds % (3600*24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);

        return  `${d} days ${h} hours ${m} minutes ${s} seconds`
    }

}

module.exports.run = async (bot, message, msgArray, API) => {
    try {
        let username = msgArray[1];
        let platform = msgArray[2];

        if (username in knownUsers){
            platform = knownUsers[username]['platform'];
            username = knownUsers[username]['name'];
        }
        
        //TODO get data for users with no platform
        // if(platform == null){
        //     let data = await API.FuzzySearch(username); 
        //     platform = data['platform'];
        // }

        if (username == null || platform == null){
            message.reply('No username or playform. Known platforms are: psn, xbl, battle and acti')

        } else {
            let rawData = await API.MWBattleData(username, platform);
            let data = new CodData(rawData)

            const dataEmbed = new Discord.MessageEmbed()
            .setColor('#ab34eb')
            .setTitle(`Stats for ${message.content.split(' ')[1]}`)
            .addField('Stats:', `${data.formatdata().join('\n')}`);
            message.channel.send(dataEmbed)
        }
    }catch (error){
        console.log(error);
        message.reply('Something went wrong');

    }

}

module.exports.help = {
	name: "getdata",
	description: 'getting warzone data'
}


///psn
//steam
//xbl
//battle
//acti
//uno ( numerical identifier )
///
///