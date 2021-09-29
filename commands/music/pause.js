const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    name: 'pause',
    category: 'Music',
    utilisation: '/pause',
    voice: true,
    description: 'Pause the music playback',
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause the music playback'),
    async execute(interaction, client) {

        const queue = client.player.getQueue(interaction.guildId)
        if (!queue) {
            const embed = new client.embed()
                .setColor(client.color.red)
                .setDescription('The queue is empty')
            return await interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
        }
        const song = queue.nowPlaying()

        const paused = client.var.get(interaction.guildId).pausedState

        if (paused === true) {
            const embed = new client.embed()
                .setColor(client.color.red)
                .setDescription('The song is already paused')
            return await interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
        }
        await interaction.deferReply()
        const pauseSuccess = queue.setPaused(true)
        if (pauseSuccess) {
            const embed = new client.embed()
                .setColor(client.color.yellow)
                .setDescription('Paused... ' + song.title)
            try {
                client.var.get(interaction.guildId).nowPlaying.delete()
            } catch (e) {}
            client.var.set(queue.guild.id, {
                ...client.var.get(queue.guild.id),
                nowPaused: await interaction.editReply({
                    embeds: [embed],
                    ephemeral: false
                }),
                pausedState: pauseSuccess
            })
        } else {
            const embed = new client.embed()
                .setColor(client.color.red)
                .setDescription('Pause failed')
            return await interaction.editReply({
                embeds: [embed],
                ephemeral: true
            })
        }
    }
}