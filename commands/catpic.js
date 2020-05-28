var request = require('request');

module.exports.run = async (bot, msg, msgArry) =>{

    if ((Math.floor(Math.random() * 2) + 1) === 1){

        request('https://api.thecatapi.com/v1/images/search', function (error, response, body){
            msg.channel.send('Your cat picture',
            {files: [JSON.parse(body)[0]['url']] }
        )
        });

    } else {
        
        request('https://aws.random.cat/meow', function(error, response, body){
            msg.channel.send('Your cat picture',
            {files: [JSON.parse(body)['file']] }
            )
            console.log(JSON.parse(body)['file'])
        });
    }
}

module.exports.help = {
    'name': 'catpic',
    'description': 'gets a cat pic'
}
