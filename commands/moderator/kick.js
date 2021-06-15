const errormsg = require("../../botUtils/error");

module.exports = {
    name: 'kick',
    category: 'Mod',
    aliases: [],
    utilisation: '{prefix}kick <@user> [reason]',
    description: 'Kick a user from the server',
    guildOnly: true,
    async execute(client, message, args, Discord) {
        if(message.author.id !== client.var.SKS) {
            if(!message.member.hasPermission('KICK_MEMBERS')) return errormsg.display(message, 'unauthorized');
        }

        if(!message.guild.me.hasPermission('KICK_MEMBERS')) return errormsg.display(message, 'icant');
        
        if(!args[0]) return errormsg.display(message, 'You must mention the user');
        
        if(message.mentions.everyone) return errormsg.display(message, 'You cannot mention everyone')
        
        var target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());

        if(!target) return errormsg.display(message, 'The mentioned user was not found');
        
        if(target.id === message.author.id) return errormsg.display(message, 'You cannot kick yourself');

        if(target.user.bot) return errormsg.display(message, 'I cannot kick a bot');

        if(!target.kickable) return errormsg.display(message, 'The user cannot be kicked');

        
        var done;

        var reason = args.slice(1).join(" ");
        if(!reason) {
            reason = 'Unspecified';
        }

        const emb1 = new Discord.MessageEmbed()
        .setColor(client.color.blue)
        .addFields(
            {name: 'Reason', value: reason}
        )
        .setTimestamp();

        const emb2 = new Discord.MessageEmbed()
        .setColor(client.color.red)
        .setTimestamp();

        try {
           done = await target.kick(reason);
        } catch (e) {
            console.log(e)
        } finally {
            if(done.user) {
                try {
                    emb2.setDescription("You were kicked!!");
                    emb2.addFields(
                        {name: 'Server', value: message.guild.name},
                        {name: 'By', value: "<@"+message.author.id+">"},
                        {name: 'Reason', value: reason}
                    );
                    target.send(emb2);
                } catch (e) {
                    console.log('\nFetch error\n');
                    console.log(e);
                }
                emb1.setDescription("<@"+done.user.id+"> was kicked by <@"+message.author.id+">");
                await message.channel.send(emb1);
            }
        }
    }
}