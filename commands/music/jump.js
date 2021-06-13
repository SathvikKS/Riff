const errormsg = require('../../botUtils/error');

module.exports = {
    name: 'jump',
    aliases: ['j'],
    category: 'Music',
    utilisation: '{prefix}jump [song number]',
    description: 'Jumps to the specified track',
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
        if(isNaN(args[0])) {
            return errormsg.display(message, 'no num');
        }
        if(client.var.playerPaused) {
            try {
                await client.player.resume(message);
                await client.player.pause(message);
                await client.player.resume(message); 
                client.var.playerPaused = false;
                await client.sleep(750);
            } catch (e) {
                console.log('resume error jump'+e);
            }
        }
        var jump;
        try {
            jump = await client.player.jump(message, parseInt(args[0] - 1));
        } catch (e) {
            console.log("\nJump error\n"+e);
        } finally {
            if(jump) return message.channel.send('Jumped');
        }
    }
}