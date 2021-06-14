const errormsg = require('../../botUtils/error');
const playerControl = require('../utils/playerControl');

module.exports = {
    name: 'pause',
    aliases: ['pp'],
    category: 'Music',
    utilisation: '{prefix}pause',
    description: 'Pause the player',
    async execute(client, message, args, Discord) {
        if(!message.guild){
            return errormsg.display(message, 'dm');
        }
        var vc = message.member.voice.channel;
        if(!vc) {
            return errormsg.display(message, 'no vc');
        }
        if(client.var.playerPaused) {
            return errormsg.display(message, 'Song is already paused');
        }
        var pause;
        try {
            pause = await client.player.pause(message);
        } catch (e) {
            console.log("\nPause error\n"+e);
        } finally {
            if(pause) {
                client.var.playerPaused = true;
                client.var.currentSongEmbed.setTitle('Paused');
                try {
                    await client.var.npmsg.reactions.removeAll();
                    await client.var.npmsg.delete()
                } catch (e) {
                    console.log('\npause current del error\n'+e);
                } finally {

                    client.var.npmsg = await message.channel.send(client.var.currentSongEmbed);
                    playerControl.execute(client, message, Discord)
                    
                }
            }
        }
    }
}