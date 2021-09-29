const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    name: 'shuffle',
    category: 'Music',
    utilisation: '/shuffle',
    voice: true,
    description: 'Shuffle the queue',
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Shuffle the queue'),
    async execute(interaction, client) {

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
        await interaction.deferReply()

        const shuffleSuccess = queue.shuffle();
        if (shuffleSuccess) {
            const embed = new client.embed()
                .setColor(client.color.green)
                .setDescription('Shuffled...')
            await interaction.editReply({
                embeds: [embed],
                ephemeral: false
            })
        } else {
            const embed = new client.embed()
                .setColor(client.color.green)
                .setDescription('Shuffle failed')
            await interaction.editReply({
                embeds: [embed],
                ephemeral: false
            })
        }
    }
}