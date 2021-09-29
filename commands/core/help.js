const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    name: 'help',
    category: 'Core',
    utilisation: '/help <command name>',
    description: 'Shows the list of available commands',
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows the list of available commands')
        .addStringOption(option =>
            option.setName('command_name')
            .setDescription('The command name for more help on it')
            .setRequired(false)),
    async execute(interaction, client) {
        if (!interaction.options.get('command_name')) {
            const core = client.commands.filter(x => x.category == 'Core').map((x) => '`' + x.name + '`').join(', ');
            const music = client.commands.filter(x => x.category == 'Music').map((x) => '`' + x.name + '`').join(', ');
            const embed = new client.embed()
                .setColor(client.color.blue)
                .setTitle('Help Panel')
                .setFooter(`Use /help <command name> for more help about the command`)
                .addFields({
                    name: 'Core',
                    value: core
                }, {
                    name: 'Music',
                    value: music
                });
            await interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        } else {
            const command = client.commands.get(interaction.options.get('command_name').value.toLowerCase())
            if (!command) {
                const embed = new client.embed()
                    .setColor(client.color.red)
                    .setDescription('The entered command was not found')
                return await interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                })
            }
            const embed = new client.embed()
                .setTitle('Help Pannel')
                .setColor(client.color.blue)
                .setDescription('Mandatory arguments `[]`, optional arguments `<>`.')
                .addFields({
                    name: 'Name',
                    value: command.name,
                    inline: true
                }, {
                    name: 'Category',
                    value: command.category,
                    inline: true
                }, {
                    name: 'Utilisation',
                    value: command.utilisation
                }, );
            if (command.description) embed.addFields({
                name: 'Description',
                value: command.description,
                inline: true
            });

            await interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        }
    },
};