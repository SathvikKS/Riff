const {color} = require('../core/color.js');
const {variables} = require('../core/variables.js');

module.exports = {
    name: 'pause',
    aliases: ['pp'],
    description: 'Pause current song',
    async execute(client, message, args, Discord, cmd){
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
        let song = client.player.pause(message);

        if(song) {
            const feature = new Discord.MessageEmbed()
            .setColor(color.green)
            .setDescription("[<@"+message.author.id+">] "+`[${song.name}](${song.url}) | ${song.author} paused!`);
            if(variables.pausemsg === false) return variables.pausemsg = await message.channel.send(feature);
            else {
                try {
                    variables.pausemsg.delete();
                } finally {
                    variables.pausemsg = await message.channel.send(feature);
                }
            }
        }
    }
};