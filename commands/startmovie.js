const file = require('../fileHandler');
const fileLocation = './movieId.json'

module.exports.run = async (bot, msg, msgContent) =>{
    if (msg.member.hasPermission('ADMINISTRATOR')){
        if (msgContent.length > 2){
            name = msgContent.slice(2).join(' ');
            msg.channel.send(`@everyone Movie event incoming. Will be watching ${name}. Starting at ${msgContent.slice(1,2)}. Reply to this message to get a movie ticket`);
            currentFile = file.readFile(fileLocation);
            currentFile.id = msg.channel.id;
            file.writeFile(fileLocation, currentFile);
            msg.channel.overwritePermissions(msg.guild.id, {
                SEND_MESSAGES: true
            });
        }else{
            msg.author.send('Needs to be in format `!startmovie time nameofmovie`');
        }
        msg.delete();
    }
}

module.exports.help = {
    'name': 'startmovie',
    'description': 'this starts the movie event `startmovie <time> <name>`'
}