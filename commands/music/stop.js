const errormsg = require('../../botUtils/error');

module.exports = {
    name: 'stop',
    aliases: ['s'],
    category: 'Music',
    utilisation: '{prefix}stop',
    description: 'Stops the music playback and clears the queue',
    async execute(client, message, args, Discord) {
        if(!message.guild){
            return errormsg.display(message, 'dm');
        }
        var vc = message.member.voice.channel;
        if(!vc) {
            return errormsg.display(message, 'no vc');
        }
        var stop;
        try {
            stop = await client.player.stop(message);
        } catch (e) {
            console.log("\nSkip error\n"+e);
        } finally {
            if(stop) return message.channel.send('Stopped');
            else return message.channel.send('Unable to stop');
        }
    }
}