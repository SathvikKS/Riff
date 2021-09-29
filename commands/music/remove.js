const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    name: 'remove',
    category: 'Music',
    utilisation: '/remove [Song Number]',
    voice: true,
    description: 'Removes the specified song from the queue',
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Removes the specified song from the queue')
        .addIntegerOption(option =>
            option.setName('song')
            .setDescription('The song to be removed')
            .setRequired(true)),
    async execute(interaction, client) {
        const song = interaction.options.get('song').value

        if (song <= 0) {
            const embed = new client.embed()
                .setColor(client.color.red)
                .setDescription('The number must be non zero and positive')
            return await interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
        }

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

        const trackRemoved = queue.tracks[song - 1]
        queue.remove(song - 1);


        const embed = new client.embed()
            .setColor(client.color.green)
            .setDescription('Removed... ' + trackRemoved.title)
        await interaction.editReply({
            embeds: [embed],
            ephemeral: false
        })
    }
}