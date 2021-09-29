module.exports = async (client, queue, error) => {
    const embed = new client.embed()
        .setColor(client.color.red)
        .setDescription("Error: " + error);
    const interaction = client.var.get(queue.guild.id).playInteraction || client.var.get(queue.guild.id).insertInteraction
    await interaction.editReply({
        embeds: [embed]
    })
    console.log('Error event\n' + error)
}