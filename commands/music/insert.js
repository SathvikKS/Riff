const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const isUrl = require('is-url')

module.exports = {
    name: 'insert',
    category: 'Music',
    utilisation: '/insert [song] [position]',
    voice: true,
    description: 'Add a song to a specific location in the queue',
    data: new SlashCommandBuilder()
        .setName('insert')
        .setDescription('Add a song to a specific location in the queue')
        .addStringOption(option =>
            option.setName('song')
            .setDescription('Name of the song or URL')
            .setRequired(true))
        .addIntegerOption(option =>
            option.setName('position')
            .setDescription('Position in the queue where the song should be added')
            .setRequired(true)),
    async execute(interaction, client) {

        client.var.set(interaction.guildId, {
            ...client.var.get(interaction.guildId),
            insertInteraction: interaction
        })


        const searchQuery = interaction.options.get('song').value
        const position = interaction.options.get('position').value

        if (position <= 0) {
            const embed = new client.embed()
                .setColor(client.color.red)
                .setDescription('The position must be a non zero and a positive number')
            return await interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        }
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

        const track = await require('../../botUtils/searchSong')(client, interaction, searchQuery)

        try {
            queue.insert(track.tracks[0], position - 1)
        } catch (e) {
            console.log('insert song error\n')
            console.log(e)
            const embed = new client.embed()
                .setColor(client.color.red)
                .setDescription('Error ' + e)
            return await interaction.editReply({
                embeds: [embed],
                ephemeral: true
            });
        }
        const embed = new client.embed()
            .setColor(client.color.green)
            .setTitle('Inserted song')
            .addFields({
                name: 'Song',
                value: `[${track.tracks[0].title}](${track.tracks[0].url})`,
                inline: true
            }, {
                name: 'Artist',
                value: track.tracks[0].author,
                inline: true
            }, {
                name: 'Position in queue',
                value: position.toString()
            })
        await interaction.editReply({
            embeds: [embed],
            ephemeral: false
        })
    }
}