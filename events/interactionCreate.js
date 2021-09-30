module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {

        if (interaction.isButton()) {
            require('../botUtils/buttonPlayback')(interaction, client)
        }
        const command = client.commands.get(interaction.commandName)

        if (!command) return;

        if (command.voice === true && !interaction.member.voice.channelId) {
            const embed = new client.embed()
                .setColor(client.color.red)
                .setDescription('You need to be connected to a Voice Channel to use this command')

            return await interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
        }

        if (command.sks === true && interaction.user.id !== process.env.SKS) {
            const embed = new client.embed()
                .setColor(client.color.red)
                .setDescription('You are not authorized to use admin commands')

            return await interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
        }

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true
            });
        }
    },
};