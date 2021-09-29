const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    name: 'nowplaying',
    category: 'Music',
    utilisation: '/nowpllaying',
    description: 'Get the current song being played',
    data: new SlashCommandBuilder()
        .setName('nowplaying')
        .setDescription('Get the current song being played'),
    async execute(interaction, client) {
        const queue = await client.player.getQueue(interaction.guildId)

        if (!queue || !queue.playing) {
            const embed = new client.embed()
                .setColor(client.color.red)
                .setDescription('The queue is empty or no song is being played')
            await interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
        }
        const embed = new client.embed()
            .setColor(client.color.green)
            .setDescription('Displaying the current playing song')
            await interaction.reply({
            embeds: [embed],
        })
        setTimeout(async () => {
            try {
                interaction.deleteReply()
            } catch (e) {
            }
        }, 10000)
        await require('../../botUtils/nowPlaying')(client, queue, queue.nowPlaying())
    }
}