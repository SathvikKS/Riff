module.exports = async (client, Discord, message, queue) => {
    const emb = new Discord.MessageEmbed()
    .setColor(client.color.green)
    .setDescription('Done playing all songs');
    try {
        client.var.npmsg.delete();
    } finally {
        await message.channel.send(emb);
    }
}