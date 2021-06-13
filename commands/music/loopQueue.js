const {color} = require('../core/color.js');
const {variables} = require('../core/variables.js');

module.exports = {
    name: 'loopqueue',
    aliases: ['lq'],
    description: 'Loop entire queue',
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
        
        let toggle = client.player.toggleQueueLoop(message);

        const feature = new Discord.MessageEmbed()
            .setColor(color.green);

        if(toggle === null){
            return;
        } else if(toggle) {
            feature.setDescription("[<@"+message.author.id+">] I will now repeat the full queue indefinitely.");
        } else {
            feature.setDescription("[<@"+message.author.id+">] I will no longer repeat the full queue indefinitely.");
        }

        if(variables.loopqueuemsg === false) return variables.loopqueuemsg = await message.channel.send(feature);
        
        else {
            try {
                variables.loopqueuemsg.delete();
            } finally {
                variables.loopqueuemsg = await message.channel.send(feature);
            }
        }
    }
};