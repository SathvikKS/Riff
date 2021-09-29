const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    name: 'back',
    category: 'Music',
    utilisation: '/back',
    voice: true,
    description: 'Plays the previous song',
    data: new SlashCommandBuilder()
        .setName('back')
        .setDescription('Plays the previous song'),
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

        const prevTrack = queue.previousTracks[queue.previousTracks.length - 2]
        if (!prevTrack) {
            const embed = new client.embed()
                .setColor(client.color.red)
                .setDescription('No previous song found')
            return await interaction.editReply({
                embeds: [embed],
                ephemeral: true
            })
        }

        await queue.back()
        const embed = new client.embed()
            .setColor(client.color.greed)
            .setDescription('Playing the previous song')
        await interaction.editReply({
            embeds: [embed]
        })
    }
}