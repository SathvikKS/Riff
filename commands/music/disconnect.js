const errormsg = require("../../botUtils/error");

module.exports = {
    name: 'disconnect',
    aliases: ['dc'],
    category: 'Music',
    utilization: '{prefix}disconnect',
    description: 'Disconnect the bot from the voice channel and clear the queue if any',
    async execute(client, message, args, Discord) {
        if(!message.guild){
            return errormsg.display(message, 'dm');
        }
        var vc = message.member.voice.channel;
        if(!vc) {
            return errormsg.display(message, 'no vc');
        }
        const emb = new Discord.MessageEmbed()
        .setColor(client.color.green)
        .setDescription("[<@"+message.author.id+">] Bye...");
        await message.channel.send(emb);
        try {
            await vc.leave();
        } catch (e) {
            console.log(e);
        }
        if(client.var.npmsg) {
            if(client.var.npmsg.reactions) {
                try {
                    await client.var.npmsg.reactions.removeAll();
                } finally {};
            }
            try {
                await client.var.npmsg.delete();
            } finally {
                client.var.npmsg = false;
            }
        }
        if(client.var.queuemsg) {
            if(client.var.queuemsg.reactions) {
                try {
                    await client.var.queuemsg.reactions.removeAll();
                } finally {};
            }
            try {
                await client.var.queuemsg.delete();
            } finally {
                 client.var.queuemsg = false;
            }
        }
    }
}