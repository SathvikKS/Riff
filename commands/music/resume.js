const {color} = require('../core/color.js');
const {variables} = require('../core/variables.js');

module.exports = {
    name: 'resume',
    aliases: ['pr'],
    description: 'Resume paused song',
    async execute(client, message, args, Discord, cmd){
        let song = client.player.resume(message);

        if(song) {
            const feature = new Discord.MessageEmbed()
            .setColor(color.green)
            .setDescription("[<@"+message.author.id+">] "+`[${song.name}](${song.url}) | ${song.author} resumed!`);
            if(variables.resumemsg === false) return variables.resumemsg = await message.channel.send(feature);
            else {
                try {
                    variables.resumemsg.delete();
                } finally {
                    variables.resumemsg = await message.channel.send(feature);
                }
            }
        }
    }
};