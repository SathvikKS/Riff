module.exports = async (client, Discord, error, message) => {
    const emb = new Discord.MessageEmbed()
    .setColor(client.color.red)
    .setDescription("[<@"+message.author.id+">] "+error);
    await message.channel.send(emb);
}