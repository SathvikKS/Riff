const errormsg = require('../../botUtils/error');

module.exports = {
    name: 'shuffle',
    aliases: ['sh'],
    category: 'Music',
    utilisation: '{prefix}lshuffle]',
    description: 'Shuffles the tracks in the queue',
    async execute(client, message, args, Discord) {
        if(!message.guild){
            return errormsg.display(message, 'dm');
        }
        var vc = message.member.voice.channel;
        if(!vc) {
            return errormsg.display(message, 'no vc');
        }
        try {
            client.player.shuffle(message);
        } catch (e) {
            console.log("\mShuffle error\n"+e);
        }
    }
}