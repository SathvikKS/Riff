const errormsg = require("../../botUtils/error");

module.exports = {
    name: 'unmute',
    category: 'Mod',
    aliases: [],
    utilisation: '{prefix}unmute <@user> [reaon]',
    description: 'Unmute a user from the voice channel',
    guildOnly: true,
    async execute(client, message, args, Discord) {
        if(message.author.id !== client.var.SKS) {
            if(!message.member.hasPermission('MUTE_MEMBERS')) return errormsg.display(message, 'unauthorized');
        }
        
        if(!message.guild.me.hasPermission('MUTE_MEMBERS')) return errormsg.display(message, 'icant');
        
        if(!args[0]) return errormsg.display(message, 'You must mention the user');
        
        if(message.mentions.everyone) return errormsg.display(message, 'You cannot mention everyone')
        
        var target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());

        if(!target) return errormsg.display(message, 'The mentioned user was not found');

        if(!target.voice.channel) return errormsg.display(message, 'The mentioned user must be connected to a voice channel')
        
        var done;

        var reasonUnmute = args.slice(1).join(" ");
        if(!reasonUnmute) {
            reasonUnmute = 'Unspecified';
        }

        const emb1 = new Discord.MessageEmbed()
        .setColor(client.color.blue)
        .addFields(
            {name: 'Reason', value: reasonUnmute}
        )
        .setTimestamp();

        const emb2 = new Discord.MessageEmbed()
        .setColor(client.color.red)
        .setTimestamp();

        try {
           done = await target.voice.setMute(false, reasonUnmute);
        } catch (e) {
            console.log(e)
        } 
    }
}