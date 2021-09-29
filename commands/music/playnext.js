const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const isUrl = require('is-url')
module.exports = {
    name: 'playnext',
    category: 'Music',
    utilisation: '/playnext [Song Name/ URL]',
    description: 'Add a song to be played after the current song',
    voice: true,
    data: new SlashCommandBuilder()
        .setName('playnext')
        .setDescription('Add a song to be played after the current song')
        .addStringOption(option =>
            option.setName('song')
            .setDescription('Name of the song or URL')
            .setRequired(true)),
    async execute(interaction, client) {
        await interaction.deferReply();

        client.var.set(interaction.guildId, {
            ...client.var.get(interaction.guildId),
            playInteraction: interaction
        })

        const searchQuery = interaction.options.get('song').value
        const queue = client.player.createQueue(interaction.guild, {
            leaveOnEnd: false,
            leaveOnStop: false,
            leaveOnEmpty: true,
            leaveOnEmptyCooldown: 10000,
            metadata: {
                channel: interaction.channel
            }
        });
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            const embed = new client.embed()
                .setColor(client.color.red)
                .setDescription('Unable to join the Voice Channel')
            return await interaction.editReply({
                embeds: [embed],
                ephemeral: false
            });
        }

        await interaction.editReply('Searching...   ' + searchQuery)
        const track = await require('../../botUtils/searchSong')(client, interaction, searchQuery)

        try {
            queue.insert(track.tracks[0])
        } catch (e) {
            
        }
    },
};