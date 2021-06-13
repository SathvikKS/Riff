require('dotenv').config();
const prefix = process.env.prefix;
const {color} = require('../core/color.js');
const {variables} = require('../core/variables.js')
module.exports = {
    name: 'help',
    aliases: ['hp'],
    description: "List of commands",
    execute(client, message, args, Discord) {
        const desc = new Discord.MessageEmbed()
        .setColor(color.blue)
        .setTitle('Bot Commands')
        .setDescription("Bot by [<@"+variables.me+">]")
        .addFields(
            {name: prefix+'ping', value: 'Latency check'},
            {name: prefix+'delete', value: 'Delete messages in the channel'},
            {name: prefix+'image', value: 'Search for an image online'},
            {name: prefix+'play', value: 'Play a song'},
            {name: prefix+'dc', value: 'Disconnect from voice channel'},
            {name: prefix+'now', value: 'Get the current song playing'},
            {name: prefix+'clear',value: 'Clear the tracks queued' },
            {name: prefix+'queue',value: 'List of tracks queued' },
            {name: prefix+'loopsong',value: 'Toggle loop for current song' },
            {name: prefix+'loopqueue',value: 'Toggle loop for entire queue' },
            {name: prefix+'pause',value: 'Pause current song' },
            {name: prefix+'resume',value: 'Resume current song playback' },
            {name: prefix+'remove',value: 'Remove a track from the queue' },
            {name: prefix+'skip',value: 'Skip the current track from the queue' },
            {name: prefix+'skip',shuffle: 'Shuffle tracks in the queue' },
            {name: prefix+'seek',value: 'Seek current song playing' },
            {name: prefix+'stop',value: 'Stop music playback and clear the queue' },

        )
        .setFooter("List of available commands");
        message.channel.send(desc);
    }
}