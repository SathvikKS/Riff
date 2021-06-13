const errormsg = require('../../botUtils/error');
const { MessageEmbed } = require("discord.js");
var tracksArr = [];
var queue;

async function paginate(client, message, array, perpage = 10, forward = "▶", backward = "◀",) {

    let first = 0;
    let second = perpage;

    const embed = new MessageEmbed()
    .setColor(client.color.green)
    .setTitle('Tracks')
    .setDescription(`${array.slice(0, perpage).join("\n")}`);

    let pageno = 1;
    client.var.queuemsg = await message.channel.send(embed);

    if (array.length > perpage) {
        await client.var.queuemsg.react(backward);
        await client.var.queuemsg.react(forward);
        var reacteduser;
        const collector = client.var.queuemsg.createReactionCollector((reaction, user) => reacteduser = user, {
            time: 600000
        });
        collector.on('collect', async(r) => {
            try {
                await getQueue(message, client)
            } finally {
                if(!queue) return;
            }
            const reactionadd = array.slice(first + perpage, second + perpage).length;
            const reactionremove = array.slice(first - perpage, second - perpage).length;
            if (r.emoji.name === forward && reactionadd !== 0) {
                try {
                    if(!reacteduser.bot){
                        r.users.remove(reacteduser);
                    }
                } catch (e) { console.log ("Reaction remove get Queue 52 "+e) }
                pageno = pageno + 1
                first += perpage;
                second += perpage;
                embed.setDescription(`${array.slice(first, second).join("\n")}`);
                client.var.queuemsg.edit({
                    embed: embed
                });
            }
            else if (r.emoji.name === backward && reactionremove !== 0) {
                try {
                    if(!reacteduser.bot){
                        r.users.remove(reacteduser);
                    }
                } catch (e) { console.log ("Reaction remove get Queue 64 "+e) }
                pageno = pageno - 1
                first -= perpage;
                second -= perpage;
                embed.setDescription(`${array.slice(first, second).join("\n")}`);
                client.var.queuemsg.edit({
                    embed: embed
                })
            }
        });
        collector.on('end', () => {
            try {
                client.var.queuemsg.reactions.removeAll();
            } catch (e) {};
        })
    }
}
async function getQueue(message, client) {
    tracksArr.length = 0;
    try {
        queue = await client.player.getQueue(message);
    } catch (e) {
        console.log("\nget queue error 84 \n"+e);
    } finally {
        if(queue) {
            var count = 0;
            if(queue.previousTracks.length>0) {
                tracksArr.push(`*) [${queue.previousTracks[queue.previousTracks.length-1].title}](${queue.previousTracks[queue.previousTracks.length-1].url}) - ${queue.previousTracks[queue.previousTracks.length-1].author}`)
            }
            (queue.tracks.map((track, index) => {
                if(index === 0) { 
                    tracksArr.push(`<:Blank:850603065760284722><:Blank:850603065760284722>Now Playing ⬎\n${++count}) [${track.title}](${track.url}) - ${track.author}\n<:Blank:850603065760284722><:Blank:850603065760284722>Now Playing ⬏`);
                } else {
                    tracksArr.push(`${++count}) [${track.title}](${track.url}) - ${track.author}`);
                }
            }));
        } else {
            errormsg.display(message, 'Queue is empty');
            try {
                client.var.queuemsg.delete();
            } catch (e) {}
        }
    }
}

module.exports = {
    name: 'queue',
    aliases: ['q'],
    category: 'Music',
    utilisation: '{prefix}queue',
    description: 'Get the list of songs added to the queue',
    async execute(client, message, args, Discord) {
        if(!message.guild){
            return errormsg.display(message, 'dm');
        }
        var vc = message.member.voice.channel;
        if(!vc) {
            return errormsg.display(message, 'no vc');
        }
        await getQueue(message, client);
        if(client.var.queuemsg){
            try {
                await client.var.queuemsg.delete()
            } catch (e) {}
        }
        if(queue) paginate(client, message, tracksArr);
    }
}