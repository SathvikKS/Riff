module.exports = async (client, Discord, message, queue) => {
    const emb = new Discord.MessageEmbed()
    .setColor(client.color.red)
    .setDescription("Voice Channel is empty. I'm leaving...");
    await message.channel.send(emb);
}