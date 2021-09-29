const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    name: 'stop',
    category: 'Music',
    utilisation: '/stop',
    voice: true,
    description: 'Stops the music playback',
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops the music playback'),
    async execute(interaction, client) {
        await interaction.deferReply();
        const queue = client.player.getQueue(interaction.guildId)
        if (!queue || !queue.playing) {
            const embed = new client.embed()
                .setColor(client.color.red)
                .setDescription('The queue is empty or no song is being played')
            return await interaction.editReply({
                embeds: [embed],
                ephemeral: true
            })
        }
        try {
            await client.var.get(queue.guild.id).nowPlaying.delete()
        } catch (e) {

        }
        queue.destroy()
        const embed = new client.embed()
            .setColor(client.color.green)
            .setDescription('Stopped the music playback')
        await interaction.editReply({
            embeds: [embed],
            ephemeral: false
        })
    }
}