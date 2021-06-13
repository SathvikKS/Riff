const {color} = require('../core/color.js');
const {variables} = require('../core/variables.js');

module.exports = {
    name: 'queue',
    aliases: ['gq', 'get', 'list', 'q'],
    description: 'List of tracks currently in the queue',
    async execute (client, message, args, Discord, cmd) {
        if(!message.guild) {
            const error = new Discord.MessageEmbed()
            .setColor(color.red)
            .setDescription("[<@"+message.author.id+">] This command works only in guilds.")
            return message.channel.send(error);
        }

        const vc = message.member.voice.channel;

        if(!vc) {
            const error = new Discord.MessageEmbed()
            .setColor(color.red)
            .setDescription("[<@"+message.author.id+">] You need to be in a Voice Channel to do this.")
            return message.channel.send(error);
        }

        let queue = client.player.getQueue(message);
        
        if(queue){
            const feature = new Discord.MessageEmbed()
            .setColor(color.green)
            .setTitle('Tracks');
            (queue.songs.map((song, i) => {
                feature.addFields({name: '\u200b', value: `${i === 0 ? 'Now Playing' : `${i+1}`} | [${song.name}](${song.url}) | ${song.author} | ${song.duration}`})
            }));
            if(variables.getqueuemsg === false) {
                try {
                    variables.getqueuemsg = await message.channel.send(feature);
                } finally {}
            }
            else {
                try {
                    variables.getqueuemsg.delete();
                } finally {
                    variables.getqueuemsg = await message.channel.send(feature);
                }
            }
        } else {
            const errorEmbed = new Discord.MessageEmbed()
            .setColor(color.red)
            .setDescription("[<@"+message.author.id+">] No songs currently in the queue");
            await message.channel.send(errorEmbed);
        }
    }
}