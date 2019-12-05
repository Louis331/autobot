const file = require('../fileHandler');
const fileLocation = './movieId.json';
const purge = require('./purge');

module.exports.run = async (bot, msg, msgContent) =>{
    currentFile = file.readFile(fileLocation);
    if (msg.member.hasPermission('ADMINISTRATOR')
            && msg.channel.id === currentFile.id){
        var role = msg.guild.roles.find(role => role.name === 'Movie ticket');
        msg.guild.members.forEach(user => user.removeRole(role));
        msg.channel.overwritePermissions(msg.guild.id, {
            SEND_MESSAGES: false
        });
        currentFile.id = 0
        file.writeFile(fileLocation, currentFile);
        msg.channel.fetchMessages()
            .then(function(list){
                msg.channel.bulkDelete(list)
            });
        }
}

module.exports.help = {
    'name': 'stopmovie',
    'description': 'this stops the movie event'
}