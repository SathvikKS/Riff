const { replace } = require('ffmpeg-static');
const errormsg = require('../../botUtils/error');

module.exports = {
    name: 'play',
    aliases: ['p'],
    category: 'Music',
    utilisation: '{prefix}play [Songname/URL]',
    description: 'Play song/s',
    async execute(client, message, args, Discord){
        if(!message.guild){
            return errormsg.display(message, 'dm');
        }
        var vc = message.member.voice.channel;
        if(!vc) {
            return errormsg.display(message, 'no vc');
        }
        if(!args.length){
            return errormsg.display(message, 'no song arg');
        }
        if(client.util.isURL(args[0])){
            client.player.play(message, args[0].replace('music.youtube.com', 'youtube.com'))
        } else {
            client.player.play(message, args.join(' '), true);
        }
    }
}