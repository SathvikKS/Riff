module.exports = async (client, Discord, message, query, tracks) => {
    const emb = new Discord.MessageEmbed()
    .setColor(client.color.green)
    .setDescription('Timeout searching for tracks');
    await message.channel.send(emb);
}