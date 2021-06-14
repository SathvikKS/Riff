const errormsg = require("../../botUtils/error");


module.exports = {
    name: 'move',
    category: 'Mod',
    aliases: [],
    utilisation: '{prefix}move <@user> [#channelID or channel name]',
    description: 'Move a user accross voice channel or disconnect',
    guildOnly: true,
    async execute(client, message, args, Discord) {
        if(message.author.id !== client.var.SKS) {
            if(!message.member.hasPermission('MOVE_MEMBERS')) return errormsg.display(message, 'unauthorized');
        }
            
        if(!message.guild.me.hasPermission('MOVE_MEMBERS')) return errormsg.display(message, 'icant');
        
        if(!args[0]) return errormsg.display(message, 'You must mention the user');

        if(message.mentions.everyone) return errormsg.display(message, 'You cannot mention everyone')
        
        var target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());

        if(!target) return errormsg.display(message, 'The mentioned user was not found');

        if(!target.voice.channel) return errormsg.display(message, 'The mentioned user must be connected to a voice channel')

        var channel;

        if(args[1]) {
            channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[1]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.slice(1).join(' ').toLocaleLowerCase());
            try {
                if (channel.type !== "voice") return errormsg.display(message, 'Unable to locate the specified channel')
            } catch (e) {
                console.log('get channel error'+e);
            }
        }
        
        if(!channel) {
            channel = null;
        }

        if(channel === target.voice.channel) return errormsg.display(message, 'The user is aleady present in the specified channel')

        var done;

        const emb1 = new Discord.MessageEmbed()
        .setColor(client.color.blue)
        .setTimestamp();

        const emb2 = new Discord.MessageEmbed()
        .setColor(client.color.red)
        .setTimestamp();

        try {
           done = await target.voice.setChannel(channel);
        } catch (e) {
            console.log(e)
        } finally {
            if(done.user) {
                if(channel) {
                    emb1
                    .setDescription("<@"+done.user.id+"> was moved by <@"+message.author.id+">");
                } else {
                    emb1.setDescription("<@"+done.user.id+"> was disconncted by <@"+message.author.id+">");
                }
                await message.channel.send(emb1);
            }
        }
    }
}