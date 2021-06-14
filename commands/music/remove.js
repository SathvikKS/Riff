const errormsg = require('../../botUtils/error');

module.exports = {
    name: 'remove',
    aliases: ['rm'],
    category: 'Music',
    utilisation: '{prefix}remove [Song number]',
    description: 'Remove a track from the queue',
    async execute(client, message, args, Discord) {
        if(!message.guild){
            return errormsg.display(message, 'dm');
        }
        var vc = message.member.voice.channel;
        if(!vc) {
            return errormsg.display(message, 'no vc');
        }
        if(!args.length){
            return errormsg.display(message, 'no song arg');
        }
        var remove;
        try {
            remove = await client.player.remove(message, parseInt(args[0] - 1));
        } catch (e) {
            console.log("\nRemove error\n"+e);
        } finally {
            if(remove) return message.channel.send('Removed '+remove);
            else return message.reply('Unable to remove the song');
        }
    }
}