const {
    QueueRepeatMode
} = require('discord-player');
module.exports = async (client, queue, tracks) => {
    const embed = new client.embed()
        .setColor(client.color.green)
        .setDescription("Added playlist to the queue ")
        .addField('No of tracks', tracks.length.toString(), true)
    const interaction = client.var.get(queue.guild.id).playInteraction || client.var.get(queue.guild.id).insertInteraction
    await interaction.editReply({
        embeds: [embed]
    })

    if (queue.repeatMode === QueueRepeatMode.AUTOPLAY) {
        try {
            queue.setRepeatMode(QueueRepeatMode.OFF)
        } catch (e) {

        }
        const embed = new client.embed()
            .setColor(client.color.yellow)
            .setDescription('The repeat mode and been set to Off (Autopplay is not supported with playlists)')
        await interaction.followUp({
            embeds: [embed],
            ephemeral: true
        })
        require('../botUtils/nowPlaying')(client, queue, queue.nowPlaying())
    }
}