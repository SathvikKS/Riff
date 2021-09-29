const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const voice = require('@discordjs/voice');


module.exports = {
    name: 'leave',
    category: 'Music',
    utilisation: '/leave',
    voice: true,
    description: 'Disconnect from Voice Channel',
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Disconnect from Voice Channel'),
    async execute(interaction, client) {
        await interaction.deferReply()

        client.var.set(interaction.guildId, {
            ...client.var.get(interaction.guildId),
            leaveInteraction: interaction
        })

        if (interaction.guild.me.voice.channelId) {
            try {
                await voice.getVoiceConnection(interaction.guildId).disconnect()
            } catch (e) {
                console.log('disconnect error' + e)
            }
            try {
                await client.var.get(interaction.guildId).nowPlaying.delete()
            } catch (e) {}
            const embed = new client.embed()
                .setColor(client.color.green)
                .setDescription('Bye...')
            await interaction.editReply({
                embeds: [embed],
                ephemeral: false
            })
        } else {
            const embed = new client.embed()
                .setColor(client.color.red)
                .setDescription('I am not connected to a Voice Channel')
            await interaction.editReply({
                embeds: [embed],
                ephemeral: true
            })
        }
    }
}