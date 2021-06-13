const {color} = require('../core/color')

module.exports = {
    name: 'ping',
    description: "this is a ping command",
    execute(client, message, args, Discord) {
        const feature = new Discord.MessageEmbed()
        .setColor(color.green)
        .setTitle('🏓')
        .setDescription("<@"+message.author.id+"> This is between you and the bot")
        .addFields(
            {name: 'Latency', value: `${Date.now() - message.createdTimestamp}ms`},
            {name: 'API Latency', value: `${Math.round(client.ws.ping)}ms`}
        );
        message.channel.send(feature);
    }
}