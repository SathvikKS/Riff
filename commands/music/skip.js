const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    name: 'skip',
    category: 'Music',
    utilisation: '/skip',
    voice: true,
    description: 'Skip the current track',
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip the current track'),
    async execute(interaction, client) {
        await interaction.deferReply()

        const queue = client.player.getQueue(interaction.guildId)
        if (!queue) {
            const embed = new client.embed()
                .setColor(client.color.red)
                .setDescription('The queue is empty')
            return await interaction.editReply({
                embeds: [embed],
                ephemeral: true
            })
        }

        queue.skip();

        const embed = new client.embed()
            .setColor(client.color.green)
            .setDescription('Skipped...')
        await interaction.editReply({
            embeds: [embed],
            ephemeral: false
        })
    }
}