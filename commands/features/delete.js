var {color} = require('../core/color.js');

module.exports = {
    name: 'delete',
    aliases: ['del'],
    description: "Delete messages in the guild",
    async execute(client, message, args, Discord) {
        if(!args[0]) {
            console.log();
            const error = new Discord.MessageEmbed()
            .setColor(color.red)
            .setDescription("[<@"+message.author.id+">] You need to specify the number of messages to delete.");
            return message.channel.send(error);
        } 
        if(isNaN(args[0])) {
            const error = new Discord.MessageEmbed()
            .setColor(color.red)
            .setDescription("[<@"+message.author.id+">] Please enter a valid number.");
            return message.channel.send(error);
        }
        if(args[0]>100) {
            const error = new Discord.MessageEmbed()
            .setColor(color.red)
            .setDescription("[<@"+message.author.id+">] I can only clear 100 messages at once.");
            return message.channel.send(error);
        }
        if(args[0]<=0) {
            const error = new Discord.MessageEmbed()
            .setColor(color.red)
            .setDescription("[<@"+message.author.id+">] The number should be atleast 1");
            return message.channel.send(error);
        }
        await message.channel.messages.fetch({limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages, true);
            const feature = new Discord.MessageEmbed()
            .setColor(color.green)
            .setDescription("[<@"+message.author.id+">] I have deleted "+args[0]+" message(s) that are less that 14 days old.");
            return message.channel.send(feature);
        })
    }
}