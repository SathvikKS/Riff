const errormsg = require('../../botUtils/error');

module.exports = {
    name: 'repeat',
    aliases: ['r'],
    category: 'Music',
    utilisation: '{prefix}repeat [true/false]',
    description: 'Set the player to repeat the current song',
    async execute(client, message, args, Discord) {
        if(!message.guild){
            return errormsg.display(message, 'dm');
        }
       var vc = message.member.voice.channel;
        if(!vc) {
            return errormsg.display(message, 'no vc');
        }
        if(!args.length){
            return errormsg.display(message, 'Required argument: true or false');
        }
        var repeat;
        try {
            repeat = await client.player.setRepeatMode(message, args[0].toLowerCase());
        } catch (e) {
            console.log("\nRepeat error\n"+e);
        } finally {
            console.log("\nRepeat: "+repeat);
        }
    }
}