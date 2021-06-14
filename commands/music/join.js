const errormsg = require('../../botUtils/error');

module.exports = {
    name: 'join',
    aliases: ['j'],
    category: 'Music',
    utilisation: '{prefix}join',
    description: 'Connects the bot the voice channel',
    async execute(client, message, args, Discord) {
        if(!message.guild){
            return errormsg.display(message, 'dm');
        }
        var vc = message.member.voice.channel;
        if(!vc) {
            return errormsg.display(message, 'no vc');
        }
        try {
            client.player.moveTo(message, message.member.voice.channel);
        } catch (e) {
            console.log("\nMove error\n"+e);
        }
    }
}