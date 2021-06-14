const errormsg = require('../../botUtils/error');

module.exports = {
    name: 'test',
    aliases: ['t'],
    async execute(client, message, args, Discord, cmd) {

        if(!args[0]) {
            return errormsg.display(message, 'You must mention the user');
        }

        if(message.mentions.everyone) {
            return errormsg.display(message, 'You cannot mention everyone')
        }

        const user = message.mentions.users.first();
        var target;
        var done;
        

        if(user) {
            target = message.guild.member(user);
        }

        var reason = args.slice(1).join(" ");
        if(!reason) {
            reason = 'Unspecified';
        }

        const emb1 = new Discord.MessageEmbed()
        .setColor(client.color.blue)
        .addFields(
            {name: 'Reason', value: reason}
        );

        const emb2 = new Discord.MessageEmbed()
        .setColor(client.color.red);

        if(cmd === 'kick') {
            if(!message.member.hasPermission('KICK_MEMBERS')) {
                return errormsg.display(message, 'unauthorized');
            }
            if(!message.guild.me.hasPermission('KICK_MEMBERS')) {
                return errormsg.display(message, 'icant');
            }

            if(!target) {
                return errormsg.display(message, 'The mentioned user was not found');
            }

            if(target.id === message.author.id) {
                return errormsg.display(message, 'You cannot kick yourself');
            }
            
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
                        client.users.cache.get(done.user.id).send(emb2);
                    } catch (e) {
                        console.log('\nFetch error\n');
                        console.log(e);
                    }
                    emb1.setDescription("<@"+done.user.id+"> was kicked by <@"+message.author.id+">");
                    await message.channel.send(emb1);
                } else {
                    await message.channel.send('Someone got kicked');
                }
            }
        }
    }
}