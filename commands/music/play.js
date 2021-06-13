var {color} = require('../core/color.js');
let pause = false;
const isUrl = require('is-url');

function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
}

module.exports = {
    name: 'play',
    aliases: ['p'],
    description: 'Play song',
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

        if(!args.length){
            const error = new Discord.MessageEmbed()
            .setColor(color.red)
            .setDescription( "[<@"+message.author.id+">]  Specify a song name or url to play.");
            return message.reply(error);
        }

        if(cmd == 'play' || cmd == 'p') {
            if(isUrl(args.join(' ')) && args.join(' ').includes('playlist')) {
                await client.player.playlist(message, {
                    search: args.join(' ').replace('music.', ''),
                    maxSongs: 20
                });
            } else {
                if(pause === true) {
                    while(!client.player.isPlaying(message)){
                        await sleep(100);
                    }
                    pause = false;
                }
                if(client.player.isPlaying(message) ) {
                    await client.player.addToQueue(message, args.join(' '));
                } else {
                    pause = true;
                    await client.player.play(message, args.join(' '));
                    setTimeout(function(){
                        pause = false;
                    }, 10000);
                }
            }
        }
    }
}