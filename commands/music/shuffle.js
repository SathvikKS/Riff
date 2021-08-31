const errormsg = require('../../botUtils/error');

module.exports = {
    name: 'shuffle',
    aliases: ['sh'],
    category: 'Music',
    utilisation: '{prefix}shuffle',
    description: 'Shuffles the tracks in the queue',
    async execute(client, message, args, Discord) {
        if(!message.guild){
            return errormsg.display(message, 'dm');
        }
        var vc = message.member.voice.channel;
        if(!vc) {
            return errormsg.display(message, 'no vc');
        }
        try {
            client.player.shuffle(message);
            const embed = new MessageEmbed()
            .setColor(client.color.green)
            .setDescription("Shuffled the queue");
            message.channel.send(embed);
        } catch (e) {
            console.log("\mShuffle error\n"+e);
        }
    }
}