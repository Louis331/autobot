var request = require('request');

module.exports.run = async (bot, msg, msgArry) =>{
    
    request('https://api.punkapi.com/v2/beers/random', function(error, response, body){
        res = JSON.parse(body)[0]
        msg.channel.send(`Your beer is ${res['name']}\nAlc content ${res['abv']}%.`);
        msg.channel.send({files: [res['image_url']] });
        msg.channel.send("Description:\n```" + res['description'] + "```");
    });
}

module.exports.help = {
    'name': 'getbeer',
    'description': 'gets a beer'
}