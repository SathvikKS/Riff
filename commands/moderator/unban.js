const errormsg = require("../../botUtils/error");


module.exports = {
    name: 'unban',
    category: 'Mod',
    aliases: [],
    utilisation: '{prefix}unban <@user> [reason]',
    description: 'Un ban a user from the server',
    guildOnly: true,
    async execute(client, message, args, Discord) {
        if(!message.member.hasPermission('BAN_MEMBERS')) return errormsg.display(message, 'unauthorized');
        
        if(!message.guild.me.hasPermission('BAN_MEMBERS')) return errormsg.display(message, 'icant');
        
        if(!args[0]) return errormsg.display(message, 'You must mention the user');
        
        if(message.mentions.everyone) return errormsg.display(message, 'You cannot mention everyone')

        let bannedMemberInfo = await message.guild.fetchBans()

        let bannedMember = bannedMemberInfo.find(b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || bannedMemberInfo.get(args[0]) || bannedMemberInfo.find(bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase());
        
        if (!bannedMember) return errormsg.display(message, 'Wrong user provided, or the user is not banned');
        
        var done;
        var target;

        var reasonUnban = args.slice(1).join(" ");
        if(!reasonUnban) {
            reasonUnban = 'Unspecified';
        }

        const emb1 = new Discord.MessageEmbed()
        .setColor(client.color.blue)
        .addFields(
            {name: 'Reason', value: reasonUnban}
        )
        .setTimestamp();

        const emb2 = new Discord.MessageEmbed()
        .setColor(client.color.green)
        .setTimestamp();

        try {
           done = await message.guild.members.unban(bannedMember.user.id, reasonUnban);
           target = await client.users.fetch(bannedMember.user.id).catch(() => null);
        } catch (e) {
            console.log(e)
        } finally {
            if(done) {
                try {
                    emb2.setDescription("You were Un-banned!!");
                    emb2.addFields(
                        {name: 'Server', value: message.guild.name},
                        {name: 'By', value: "<@"+message.author.id+">"},
                        {name: 'Reason', value: reasonUnban}
                    );
                    if(target) {
                        target.send(emb2);
                    }
                } catch (e) {
                    console.log('\nFetch error\n');
                    console.log(e);
                }
                emb1.setDescription("<@"+done.id+"> was Un-banned by <@"+message.author.id+">");
                await message.channel.send(emb1);
            }
        }
    }
}