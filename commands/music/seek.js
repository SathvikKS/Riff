const errormsg = require('../../botUtils/error');

module.exports = {
    name: 'seek',
    aliases: ['sk'],
    category: 'Music',
    utilisation: '{prefix}seek [time in seconds]',
    description: 'Forward or rewind the current song to the specified time duration',
    async execute(client, message, args, Discord) {
        if(!message.guild){
            return errormsg.display(message, 'dm');
        }
        var vc = message.member.voice.channel;
        if(!vc) {
            return errormsg.display(message, 'no vc');
        }
        if(!args.length){
            return errormsg.display(message, 'Please enter the time to seek to');
        }
        if(isNaN(args[0])) {
            return errormsg.display(message, 'no num')
        }
        try {
            client.player.seek(message, parseInt(args[0]*1000));
        } catch (e) {
            console.log("\nSeek error\n"+e);
        }
    }
}