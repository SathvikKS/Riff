module.exports = async (client, queue, error) => {
    const embed = new client.embed()
        .setColor(client.color.red)
        .setDescription('Error '+error);
    console.log('conn error' + error + ' '+ queue)
    const interaction = client.var.get(queue.guild.id).playInteraction || client.var.get(queue.guild.id).insertInteraction
    await interaction.channel.send({
        embeds: [embed]
    })
}