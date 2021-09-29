const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    name: 'clear',
    category: 'Music',
    utilisation: '/clear',
    voice: true,
    description: 'Clears the songs in the queue',
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clears the songs in the queue'),
    async execute(interaction, client) {
        await interaction.deferReply();
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

        queue.clear()
        const embed = new client.embed()
            .setColor(client.color.green)
            .setDescription('Cleared the queue')
        await interaction.editReply({
            embeds: [embed],
            ephemeral: false
        })
    }
}