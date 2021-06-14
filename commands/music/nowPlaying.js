const errormsg = require('../../botUtils/error');
const currentSong = require('../utils/currentSong');

module.exports = {
    name: 'now',
    aliases: ['np'],
    category: 'Music',
    utilisation: '{prefix}now',
    description: 'Displays the current song',
    async execute(client, message, args, Discord) {
        if(!message.guild){
            return errormsg.display(message, 'dm');
        }
        var vc = message.member.voice.channel;
        if(!vc) {
            return errormsg.display(message, 'no vc');
        }
        var track;
        try {
            track = await client.player.nowPlaying(message);
        } catch (e) {
            console.log("\nNow playing error\n"+e);
        } finally {
            if(track) {
                if(client.var.npmsg) {
                    client.var.songChanged = true
                    setTimeout(function() {
                        client.var.songChanged = false;
                    },2750)
                    await currentSong.execute(client, message, Discord, track)                    
                }
            }
        }
    }
}