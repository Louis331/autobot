module.exports.run = async (bot, msg) =>{
    msg.channel.fetchMessages()
        .then(function(list){
            msg.channel.bulkDelete(list)
        });
};

module.exports.help = {
    'name': 'purge',
    'description': 'this deletes 100 messages'
}
