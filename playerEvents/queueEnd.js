module.exports = async (client, queue) => {
    const embed = new client.embed()
        .setColor(client.color.green)
        .setDescription('Finished playing all songs in the queue');
    const interaction = client.var.get(queue.guild.id).playInteraction || client.var.get(queue.guild.id).insertInteraction
    try {
        await client.var.get(queue.guild.id).nowPlaying.delete()
    } catch (e) {

    }
    await interaction.channel.send({
        embeds: [embed]
    })
}