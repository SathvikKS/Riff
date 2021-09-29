const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    name: 'resume',
    category: 'Music',
    utilisation: '/resume',
    voice: true,
    description: 'Resumes the music playback',
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resumes the music playback'),
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

        if (client.var.get(interaction.guildId).pausedState === undefined) {
            const embed = new client.embed()
                .setColor(client.color.red)
                .setDescription('The song is not paused')
            return await interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
        }
        await interaction.deferReply()
        const resumeSuccess = queue.setPaused(false)
        if (resumeSuccess) {
            const embed = new client.embed()
                .setColor(client.color.green)
                .setDescription('Resumed... ' + queue.nowPlaying().title)

            try {
                client.var.get(interaction.guildId).nowPaused.delete()
            } catch (e) {}
            client.var.set(queue.guild.id, {
                ...client.var.get(queue.guild.id),
                nowResumed: await interaction.editReply({
                    embeds: [embed],
                    ephemeral: false
                }),
                pausedState: undefined
            })

            require('../../botUtils/nowPlaying')(client, queue, queue.nowPlaying())

            setTimeout(() => {
                try {
                    client.var.get(interaction.guildId).nowResumed.delete()
                } catch (e) {

                }
            }, 5000)
        } else {
            const embed = new client.embed()
                .setColor(client.color.red)
                .setDescription('Resume failed')
            return await interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
        }
    }
}