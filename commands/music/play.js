const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    name: 'play',
    category: 'Music',
    utilisation: '/play [Song Name/ URL]',
    description: 'Plays the song',
    voice: true,
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays the song')
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
        track.playlist ? queue.addTracks(track.tracks) : queue.addTrack(newTrack[0]);

        if (!queue.playing) await queue.play();
    },
};