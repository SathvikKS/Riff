module.exports = async (client, queue, track) => {
    const embed = new client.embed()
        .setColor(client.color.green)
        .setDescription("Added to the queue")
        .addFields({
            name: 'Song',
            value: `[${track.title}](${track.url})`,
            inline: true
        }, {
            name: 'Artist',
            value: track.author,
            inline: true
        }, )
    const interaction = client.var.get(queue.guild.id).playInteraction || client.var.get(queue.guild.id).insertInteraction
    await interaction.editReply({
        embeds: [embed]
    })
}