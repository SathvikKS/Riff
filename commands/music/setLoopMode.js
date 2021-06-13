const errormsg = require('../../botUtils/error');

module.exports = {
    name: 'loop',
    aliases: ['l'],
    category: 'Music',
    utilisation: '{prefix}loop [true/false]',
    description: 'Set the player to loop the queue',
    async execute(client, message, args, Discord) {
        if(!message.guild){
            return errormsg.display(message, 'dm');
        }
        var vc = message.member.voice.channel;
        if(!vc) {
            return errormsg.display(message, 'no vc');
        }
        if(!args.length){
            return errormsg.display(message, 'Require argument: true or false');
        }
        var loop = 1;
        try {
            loop = await client.player.setLoopMode(message, args[0].toLowerCase());
        } catch (e) {
            console.log("\nLoop error\n"+e);
        } finally {
            console.log("loop: "+loop+" "+args[0].toLowerCase());
        }
    }
}