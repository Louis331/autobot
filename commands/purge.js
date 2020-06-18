module.exports.run = async(bot, msg, msgArray) => {

    if (msg.member.hasPermission('ADMINISTRATOR')) {
        msgsToDelete = 20;
        if (msgArray.length > 1) {
            msgsToDelete = parseInt(msgArray[1]) + 1
        }


        msg.channel.bulkDelete(msgsToDelete)
    }
};

module.exports.help = {
    'name': 'purge',
    'description': 'this deletes 100 messages'
}