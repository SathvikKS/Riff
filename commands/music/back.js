const errormsg = require('../../botUtils/error');

module.exports = {
    name: 'back',
    aliases: ['bk'],
    category: 'Music',
    utilisation: '{prefix}back',
    description: 'Plays the previous track in the queue',
    async execute(client, message, args, Discord) {
        if(!message.guild){
            return errormsg.display(message, 'dm');
        }
        var vc = message.member.voice.channel;
        if(!vc) {
            return errormsg.display(message, 'no vc');
        }
        var queue, back;
        try {
            queue = await client.player.getQueue(message);
        } catch (e) {
            console.log("\nget queue error 84 \n"+e);
        }
        if(queue) {
            if(queue.previousTracks.length == 0 ) {
                return errormsg.display(message, 'No track available');
            }
        }
        if(client.var.playerPaused) {
            try {
                await client.player.resume(message);
                await client.player.pause(message);
                await client.player.resume(message); 
                client.var.playerPaused = false;
                await client.sleep(750);
            } catch (e) {
                console.log('resume error back'+e);
            }
        }
        try {
            back = client.player.back(message);
        } catch (e) {
            console.log("\nBack error\n"+e);
        }
        if(back) {
            try {
                client.var.npmsg.reactions.removeAll();
            } catch (e) {

            }
            client.var.songChanged = true;
            setTimeout(function() {
                client.var.songChanged = false;
            },2750)
            message.channel.send('Playing previous track');
        }
    }
}