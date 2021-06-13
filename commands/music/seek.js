const {color} = require('../core/color.js');

module.exports = {
    name: 'seek',
    aliases: ['sk'],
    async execute(client, message, args, Discord, cmd) {
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
        
        let song = await client.player.seek(message, parseInt(args[0] * 1000)).catch(err => {
            const errorEmbed = new Discord.MessageEmbed()
            .setColor(color.red)
            .setDescription("[<@"+message.author.id+">] "+error.message);
            message.channel.send(errorEmbed);
        }); 
        if (song) {
            const feature = new Discord.MessageEmbed()
            .setColor(color.green)
            .setDescription("[<@"+message.author.id+">] "+`Seeked to ${args[0]} second of [${song.name}](${song.url}).`);
            await message.channel.send(feature);
        }
    } 
};