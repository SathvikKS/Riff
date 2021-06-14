const errormsg = require('../../botUtils/error');
const ms = require('pretty-ms');

module.exports = {
    name: 'stats',
    aliases: ['stt'],
    sks: true,
    utilisation: '{prefix}stats',
    async execute(client, message, args, Discord) {
        var stats;
        try {
            stats = await client.player.getStats(message);
        } catch (e) {
            console.log("\nget stats error\n"+e);
        } finally {
            if(stats) {
                const emb = new Discord.MessageEmbed()
                .setColor(client.color.green)
                .setTitle('Bot Stats')
                .setDescription("[<@"+message.author.id+">]")
                .addFields(
                    {name: 'Uptime', value: ms(stats.uptime), inline: true},
                    {name: 'Connections', value: stats.connections, inline: true},
                    {name: 'Users', value: stats.users, inline: true},
                    {name: 'Queues', value: stats.queues, inline: true},
                    {name: 'System CPU', value: stats.system.cpu, inline: true},
                );
                await message.channel.send(emb);
            }
        }
    }
}