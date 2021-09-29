const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    name: 'restart',
    category: 'Admin',
    utilisation: '/restart',
    sks: true,
    description: 'Restart the bot',
    data: new SlashCommandBuilder()
        .setName('restart')
        .setDescription('Restarts the bot'),
    async execute(interaction, client) {
        const embed = new client.embed()
            .setColor(client.color.yellow)
            .setDescription('The bot is restarting...')
        await interaction.reply({embeds: [embed]})
        client.destroy()
        client.login(process.env.token)
        const embedRestart = new client.embed()
            .setColor(client.color.yellow)
            .setDescription('Bot restarted ')
        await interaction.editReply({embeds: [embedRestart]})
    }
}