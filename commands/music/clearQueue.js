const {color} = require('../core/color.js');
const {variables} = require('../core/variables.js'); 
const { execute } = require('./play.js');

module.exports = {
    name: 'clear',
    aliases: ['clr', 'cl', 'c'],
    description: 'Clear the current queue',
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
        
        try {
            let clearqueue = client.player.clearQueue(message);
            if(clearqueue){
                const feature = new Discord.MessageEmbed()
                .setColor(color.green)
                .setDescription("[<@"+message.author.id+">] The Queue has been cleared");
                await message.channel.send(feature)
            }
        } finally {}
    }
};