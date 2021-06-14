const errormsg = require('../../botUtils/error');

module.exports = {
    name: 'lyrics',
    aliases: ['ly'],
    category: 'Music',
    utilisation: '{prefix}lyrics [song name]',
    description: 'Get the lyrics of the specified song',
    async execute(client, message, args, Discord) {
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
        var lyrics;
        try {
            lyrics = await client.player.lyrics(args.join(' '));
        } catch (e) {
            console.log("\nLyrics Error\n"+e);
        } finally {
            if(lyrics) return message.channel.send(lyrics.lyrics);
            else return message.channel.send('Unable to fetch the lyrics');
        }
    }
}