const {color} = require('../core/color.js');
const {variables} = require('../core/variables.js');

module.exports = {
    name: 'shuffle',
    aliases: ['sh'],
    description: 'Shuffle songs in the queue',
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
        
        let songs = client.player.shuffle(message);

        if(songs) {
            const feature = new Discord.MessageEmbed()
            .setColor(color.green)
            .setDescription("[<@"+message.author.id+">] Server Queue was shuffled.");
            if(variables.shufflemsg === false) return variables.shufflemsg = await message.channel.send(feature);
            else {
                try {
                    variables.shufflemsg.delete();
                } finally {
                    variables.shufflemsg = message.channel.send(feature);
                }
            }
        }
    }
};