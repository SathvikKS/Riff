const errormsg = require('../../botUtils/error');

module.exports = {
    name: 'clear',
    aliases: ['cq'],
    category: 'Music',
    utilisation: '{prefix}clear',
    description: 'Clears the upcoming songs',
    async execute(client, message, args, Discord) {
        if(!message.guild){
            return errormsg.display(message, 'dm');
        }
        var vc = message.member.voice.channel;
        if(!vc) {
            return errormsg.display(message, 'no vc');
        }
        try {
            client.player.clearQueue(message);
        } catch (e) {
            console.log("\nClear queue error\n"+e);
        }
    }
}