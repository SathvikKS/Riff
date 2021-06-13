const errormsg = require("../../botUtils/error")

module.exports = {
    name: 'delete',
    aliases: ['del'],
    args: true,
    category: 'Mod',
    utilization: '{prefix}delete <number of messages less than 100>',
    description: 'Delete message from the channel that are less tham 14 days old',
    async execute(client, message, args, Discord) {
        if(message.author.id !== client.var.SKS) {
            if(!message.member.hasPermission('MANAGE_MESSAGES')) return errormsg.display(message, 'unauthorized');
        }
        
        if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return errormsg.display(message, 'icant');

        if(isNaN(args[0])) return errormsg.display(message, 'Enter a number');
        
        if(args[0]<=0 || args[0]>100) return errormsg.display(message, 'Enter a number between 0 and 100');

        try {
            await message.channel.messages.fetch({limit: args[0]}).then(messages => {
                message.channel.bulkDelete(messages, true);
                const feature = new Discord.MessageEmbed()
                .setColor(client.color.green)
                .setDescription("[<@"+message.author.id+">] I have deleted "+args[0]+" message(s) that are less that 14 days old.");
                return message.channel.send(feature);
            })
        } catch (e) {}
    }
}