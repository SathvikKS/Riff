const pb = require('../music/createProgressBar');
const time = require('../music/getTimeCode');
const playerControl = require('./playerControl');

module.exports = {
    getStats: async function(client, message, Discord,) {
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
    },

    execute: async function(client, message, Discord, track) {
        count = 0;
        if(client.var.npmsg) {
            try {
                await client.var.npmsg.reactions.removeAll();
                await client.var.npmsg.delete();
            } catch (e) {
                console.log('npmsg delete error\n'+e)
            }
        }
        
        client.var.currentSongEmbed = new Discord.MessageEmbed()
        .setTitle('Now Playing')
        .setThumbnail(track.thumbnail)
        .setColor(client.color.yellow)
        .setDescription("[<@"+message.author.id+">]")
        .addFields(
            {name: 'Song', value: `[${track.title}](${track.url})`},
            {name: 'Artist', value: track.author},
        );

        client.var.npmsg = await message.channel.send(client.var.currentSongEmbed);
        await playerControl.execute(client, message, Discord)
        //await this.getStats(client, message, Discord);
    }
}