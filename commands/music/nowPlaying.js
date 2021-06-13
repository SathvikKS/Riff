const {color} = require('../core/color');
const {variables} = require('../core/variables.js')

module.exports = {
    name: 'now',
    aliases: ['n', 'np'],
    description: 'Get the current song playing',
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
        
        let song = await client.player.nowPlaying(message);
        if(song) {
            try {
                variables.playingmsg.delete();
                variables.playingmsg = await message.channel.send(variables.playingmsgembed);
            } catch (e) {
                console.log(e);
            }
        } 
    }
};