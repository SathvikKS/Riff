const {color} = require('../core/color.js');
const {variables} = require('../core/variables.js');

module.exports = {
    name: 'remove',
    aliases: ['r', 'rm'],
    description: 'Remove a song from the queue',
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
        
        let SongID = parseInt(args[0])-1;

        let song = client.player.remove(message, SongID);

        if(song) {
            const feature = new Discord.MessageEmbed()
            .setColor(color.green)
            .setDescription("[<@"+message.author.id+">] "+`Removed song [${song.name}](${song.url}) | ${song.author} from the Queue!`);
            if(variables.removemsg === false) return variables.removemsg = await message.channel.send(feature);
            else {
                try {
                    variables.removemsg.delete();
                } finally {
                    variables.removemsg = await message.channel.send(feature);
                }
            }
        }
    }
};