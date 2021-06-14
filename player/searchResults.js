module.exports = async (client, Discord, message, query, tracks, collector) => {
    const emb = new Discord.MessageEmbed()
    .setColor(client.color.yellow)
    .setDescription('Waiting for search results');
    await message.channel.send(emb);
}