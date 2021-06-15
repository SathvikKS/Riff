const errormsg = require("../../botUtils/error");
const pb = require('../music/createProgressBar');
const time = require('../music/getTimeCode');


async function getStats(client, message, Discord,) {
    while(client.var.songChanged) {
        await client.sleep(250)
    }
    while(client.player.isPlaying(message) && !client.var.playerPaused && !client.var.songChanged) {
        var pbarCurrent, pbarQueue, stats;
        try {
            pbarCurrent = await pb.execute(client, message, Discord, {queue: false});
            pbarQueue = await pb.execute(client, message, Discord, {queue: true})
            stats = await time.execute(client, message, Discord);
        } catch(e) { 
           console.log('\nGet stats error\n'+e)
           return;
        }

        client.var.currentSongEmbed.fields[2] = {name: 'Current', value: pbarCurrent};
        client.var.currentSongEmbed.fields[3] = {name: 'Duration', value: `${stats.current} | ${stats.end}`};
        client.var.currentSongEmbed.fields[4] = {name: 'Queue', value: pbarQueue}

        try {
            client.var.npmsg = await client.var.npmsg.edit(client.var.currentSongEmbed);
        } catch (e) {
            console.log('\ncurrent error 12');
            console.log(e)
        }
        await client.sleep(2000);
    }
}

module.exports = {
 async execute(client, message, Discord) {
    await client.var.npmsg.react('⏮️');
    await client.var.npmsg.react('⏯️')
    await client.var.npmsg.react('⏭️');

    var reacteduser;
    const collector = client.var.npmsg.createReactionCollector((reaction, user) => reacteduser = user, {
        time: 600000
    });

    collector.on('collect', async(r) => {
        if(client.var.controlPause === true && !reacteduser.bot) {
            return message.reply('You are using the controls too quick.')
        }

        client.var.controlPause = true;

        setTimeout(function() {
            client.var.controlPause = false
        }, 2000);

        if(r.emoji.name === '⏮️' && !reacteduser.bot) {
            try {
                    r.users.remove(reacteduser);
            } catch (e) { 
                console.log ("Reaction remove get Queue 52 "+e) 
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
                    console.log('resume error control back'+e);
                }
            }
            try {
                try {
                    client.var.npmsg.reactions.removeAll();
                } catch (e) {
    
                }
                back = client.player.back(message);
            } catch (e) {
                console.log("\nBack error\n"+e);
            }
            if(back) {
                client.var.songChanged = true
                setTimeout(function() {
                    client.var.songChanged = false;
                },2750)
            } else {
                await client.var.npmsg.react('⏮️');
                await client.var.npmsg.react('⏯️')
                await client.var.npmsg.react('⏭️');
            }
        } 

        else if(r.emoji.name === '⏯️' && !reacteduser.bot) {
            try {
                    r.users.remove(reacteduser);
            } catch (e) { 
                console.log ("Reaction remove get Queue 52 "+e) 
            }
            if(client.var.playerPaused === true) {
                try {
                    client.var.currentSongEmbed.setTitle('Now Playing');
                    client.var.npmsg = await client.var.npmsg.edit(client.var.currentSongEmbed);
                    await client.player.resume(message);
                    await client.player.pause(message);
                    await client.player.resume(message);                        
                    client.var.playerPaused = false
                    //getStats(client, message, Discord);
                } catch (e) {
                    console.log('\n Control resume error\n'+e)
                }
            } else if(client.var.playerPaused === false) {
                try {
                    client.var.currentSongEmbed.setTitle('Paused');
                    await client.player.pause(message);
                    client.var.npmsg = await client.var.npmsg.edit(client.var.currentSongEmbed);
                    client.var.playerPaused = true;
                } catch (e) {
                    console.log('\nControl pause error\n'+e)
                }
            }
        }

        else if(r.emoji.name === '⏭️' && !reacteduser.bot) {
            try {
                    r.users.remove(reacteduser);
            } catch (e) { 
                console.log ("Reaction remove get Queue 52 "+e) 
            }
            if(client.var.playerPaused) {
                try {
                    await client.player.resume(message);
                    await client.player.pause(message);
                    await client.player.resume(message); 
                    client.var.playerPaused = false;
                    await client.sleep(750);
                } catch (e) {
                    console.log('resume error control skip'+e);
                }
            }
            var skipsong;
            try {
                try {
                    client.var.npmsg.reactions.removeAll();
                } catch (e) {
    
                }
                skipsong = await client.player.skip(message);
            } catch (e) {
                console.log("\nSkip error\n"+e);
            }
            if(skipsong) {
                client.var.songChanged = true
                setTimeout(function() {
                    client.var.songChanged = false;
                },3000)
            } else {
                await client.var.npmsg.react('⏮️');
                await client.var.npmsg.react('⏯️')
                await client.var.npmsg.react('⏭️');
            }
        }
        
    });
    collector.on('end', () => {
        try {
            client.var.npmsg.reactions.removeAll();
        } catch (e) {

        }
    })
 }
}