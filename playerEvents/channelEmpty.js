const voice = require('@discordjs/voice');
module.exports = async (client, queue) => {
    const embed = new client.embed()
        .setColor(client.color.green)
        .setDescription("Voice Channel is empty. I'm leaving...");
    const interaction = client.var.get(queue.guild.id).playInteraction || client.var.get(queue.guild.id).insertInteraction
    try {
        await client.var.get(queue.guild.id).nowPlaying.delete()
    } catch (e) {

    }
    try {
        await voice.getVoiceConnection(queue.guild.id).disconnect()
    } catch (e) {

    }
    await interaction.channel.send({
        embeds: [embed]
    })
}