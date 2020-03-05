var dateFormat = require('dateformat')

module.exports.run = async (bot, msg, msgContent) =>{
    if (msg.member.hasPermission('ADMINISTRATOR')){
        if (msgContent.length > 2){
            let channel = msg.channel;
            let game = msgContent.slice(1,2);
            var botMessage;
            let aDate = msgContent.slice(2);
            day = aDate[0];
            aDate[0] = aDate[1];
            aDate[1] = day;
            eventTime = Date.parse(aDate.join(' '));
            timeToRun = eventTime - Date.now();

            if (timeToRun > 0 && timeToRun < 2147483627){
                msg.channel.send(`${game} event is incomming. Event will be starting at ${dateFormat(eventTime, "dddd, mmmm dS, yyyy, h:MM:ss TT")}.`).then(function(){
                    channel.messages.fetch({ limit: 1 }).then(messages => {
                        botMessage = messages.first();
                    })
    
                    setTimeout(function(){
                        let reactions = botMessage.reactions.cache;
                        var users = [];
                        reactions.forEach(function(reaction){
                            reaction.users.cache.forEach(function(user){
                                if (!(users.includes(user.id))){
                                    users.push(user.id);
                                    user = bot.users.cache.get(user.id)
                                    user.send(`${game} event is starting now`);
                                }
                            })
                        });
                        botMessage.delete();
                    }, timeToRun)
                });
            } else{
                msg.author.send('Invalid time');
            }
        } else{
            msg.author.send('Needs to be in format `!startevent nameofgame date time timezone`');
        }
        msg.delete();
    }
}

module.exports.help = {
    'name': 'startevent',
    'description': 'this starts a game event `startevent nameofgame date time timezone`'
}