const errormsg = require('../../botUtils/error');

module.exports = {
    name: 'skip',
    aliases: ['sk'],
    category: 'Music',
    utilisation: '{prefix}skip',
    description: 'Skips the current track',
    async execute(client, message, args, Discord) {
        if(!message.guild){
            return errormsg.display(message, 'dm');
        }
        var vc = message.member.voice.channel;
        if(!vc) {
            return errormsg.display(message, 'no vc');
        }
        while(client.var.songChanged) {
            await client.sleep(250);
        }
        if(client.var.playerPaused) {
            try {
                await client.player.resume(message);
                await client.player.pause(message);
                await client.player.resume(message); 
                client.var.playerPaused = false;
                await client.sleep(750);
            } catch (e) {
                console.log('resume error skip'+e);
            }
        }
        var skip;
        try {
            console.log('now song request recieved')
            skip = await client.player.skip(message);
        } catch (e) {
            console.log("\nSkip error\n"+e);
        } finally {
            if(skip) {
                try {
                    client.var.npmsg.reactions.removeAll();
                } catch (e) {
    
                }
                client.var.songChanged = true
                setTimeout(function() {
                    client.var.songChanged = false;
                },3000)
                console.log('new song request completed');
                message.channel.send('Skipped');
            }
        }
    }
}