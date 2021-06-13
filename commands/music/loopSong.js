const {color} = require('../core/color.js');
const {variables} = require('../core/variables.js');
let song;

module.exports = {
    name: 'loopsong',
    aliases: ['ls'],
    description: 'Loop current song',
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
        
        let toggle = client.player.toggleLoop(message);

        const feature = new Discord.MessageEmbed()
            .setColor(color.green);
            
        if(client.player.isPlaying(message)) {
        song = await client.player.nowPlaying(message);
        }

        if(toggle === null){
            return;
        } else if(toggle) {
            feature.setDescription("[<@"+message.author.id+">] I will repeat "+`[${song.name}](${song.url}) | ${song.author} indifinitely`);
        } else {
            feature.setDescription("[<@"+message.author.id+">] I will no longer repeat "+`[${song.name}](${song.url}) | ${song.author}`);
        }

        if(variables.loopsongmsg === false) return variables.loopsongmsg = await message.channel.send(feature);
        
        else {
            try {
                variables.loopsongmsg.delete();
            } finally {
                variables.loopsongmsg = await message.channel.send(feature);
            }
        }
    }
};