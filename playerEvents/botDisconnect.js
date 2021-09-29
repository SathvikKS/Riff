module.exports = async (client, queue) => {
    if (client.var.get(queue.guild.id).leaveInteraction) return
    const embed = new client.embed()
        .setColor(client.color.red)
        .setDescription('I got disconnected from the voice channel. Clearing the queue');
    const interaction = client.var.get(queue.guild.id).playInteraction || client.var.get(queue.guild.id).insertInteraction || client.var.get(queue.guild.id).leaveInteraction
    await interaction.channel.send({
        embeds: [embed]
    })
    client.var.set(queue.guild.id, {
        ...client.var.get(queue.guild.id),
        playbackButtonId: undefined
    })
}