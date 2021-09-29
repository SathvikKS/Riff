const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    name: 'seek',
    category: 'Music',
    utilisation: '/seek [Seconds to seek]',
    description: 'Seek the song to the specified seconds',
    data: new SlashCommandBuilder()
        .setName('seek')
        .setDescription('Seek the song to the specified seconds')
        .addIntegerOption(option =>
            option.setName('seconds')
            .setDescription('Seconds to seek')
            .setRequired(true)),
    async execute(interaction, client) {
        const seconds = interaction.options.get('seconds').value
        if (seconds <= 0) {
            const embed = new client.embed()
                .setColor(client.color.red)
                .setDescription('The seconds must be non zero and positive')
            return await interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
        }
        const queue = client.player.getQueue(interaction.guildId)
        if (!queue || !queue.playing) {
            const embed = new client.embed()
                .setColor(client.color.red)
                .setDescription('The queue is empty or no song is being played')
            return await interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
        }
        const seekSuccess = await queue.seek(seconds * 1000)
        if (seekSuccess) {
            const embed = new client.embed()
                .setColor(client.color.green)
                .setDescription('Seeked to ' + seconds + ' second(s)')
            await interaction.reply({
                embeds: [embed]
            })
        } else {
            const embed = new client.embed()
                .setColor(client.color.red)
                .setDescription('Seek failed')
            await interaction.replyEdit({
                embeds: [embed],
                ephemeral: true
            })
        }
    }
}