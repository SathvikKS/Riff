module.exports = async (client, Discord, message) => {
    const emb = new Discord.MessageEmbed()
    .setColor(client.color.red)
    .setDescription('I got disconnected from the voice channel. Clearing the queue');
    await message.channel.send(emb);
}