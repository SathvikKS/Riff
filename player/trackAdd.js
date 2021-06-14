module.exports = async (client, Discord, message, queue, track) => {
    const emb = new Discord.MessageEmbed()
    .setColor(client.color.green)
    .setDescription("[<@"+message.author.id+">] Added to the queue ")
    .addFields(
        {name: 'Song', value: `[${track.title}](${track.url})`, inline: true},
        {name: 'Artist', value: track.author, inline: true},
    )
    await message.channel.send(emb);
}