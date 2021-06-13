const errormsg = require('../../botUtils/error');
const current = require('../utils/currentSong')

module.exports = {
    name: 'resume',
    aliases: ['pr'],
    category: 'Music',
    utilisation: '{prefix}resume',
    description: 'Resume the player',
    async execute(client, message, args, Discord) {
        if(!message.guild){
            return errormsg.display(message, 'dm');
        }
        var vc = message.member.voice.channel;
        if(!vc) {
            return errormsg.display(message, 'no vc');
        }
        if(!client.var.playerPaused) {
            return errormsg.display(message, 'No Song Paused')
        }
        var resume, track;
        try {
            resume = await client.player.resume(message);
            resume = await client.player.pause(message);
            resume = await client.player.resume(message);
        } catch (e) {
            console.log("\nResume Error\n"+e);
        } finally {
            if(resume) {
                try {
                    track = await client.player.nowPlaying(message);
                } catch (e) {
                    console.log("\nresume get track error\n"+e);
                }
                client.var.playerPaused = false;
                current.execute(client, message, Discord, track)
            }
        }
    }
}