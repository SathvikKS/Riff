const {color} = require('../core/color.js');
const {variables} = require('../core/variables.js');

module.exports = {
    name: 'stop',
    aliases: ['sp'],
    description: 'Stops the playback and clears the queue',
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
        
        let stop = client.player.stop(message);

        if(stop) {
            const feature = new Discord.MessageEmbed()
            .setColor(color.green)
            .setDescription("[<@"+message.author.id+">] Music stopped, the Queue was cleared!");
            await message.channel.send(feature);
        }
    }
};