module.exports = async (client, Discord, message, query, tracks) => {
    const emb = new Discord.MessageEmbed()
    .setColor(client.color.red)
    .setDescription('Invalid response recieved for the search result');
    await message.channel.send(emb);
}