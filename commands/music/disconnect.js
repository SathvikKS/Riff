var {variables} = require('./../core/variables.js');
var {color} = require('../core/color.js');

module.exports = {
    name: 'disconnect',
    aliases: ['dc', 'leave'],
    description: 'Disconnect the bot from channel',
    async execute(client, message, args, Discord) {
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

        if(variables.playingmsg){
            variables.playingmsg.delete();
        }

        if(variables.nowplayingmsg){
            variables.nowplayingmsg.delete();
        }

        const feature = new Discord.MessageEmbed()
        .setColor(color.green)
        .setDescription("[<@"+message.author.id+">] See ya next time");

        await message.channel.send(feature);

        try {
            await vc.leave();
        } finally {};
    }
}