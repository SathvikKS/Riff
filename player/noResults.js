module.exports = async (client, Discord, message, query) => {
    const emb = new Discord.MessageEmbed()
    .setColor(client.color.red)
    .setDescription('I was not able to find any results');
    await message.channel.send(emb);
}