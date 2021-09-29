const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    QueueRepeatMode
} = require('discord-player');

module.exports = {
    name: 'queue',
    category: 'Music',
    utilisation: '/queue <Page Number>',
    voice: true,
    description: 'Displays the list of songs in the queue',
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Displays the list of songs in the queue')
        .addIntegerOption(option =>
            option.setName('page')
            .setDescription('Page number of the list')
            .setRequired(false)),
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
        var page = 1
        try {
            page = interaction.options.get('page').value
            if (page <= 0) {
                const embed = new client.embed()
                    .setColor(client.color.red)
                    .setDescription('The page number must be non zero and positive')
                return await interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                })
            }
        } catch (e) {

        }
        await interaction.deferReply();

        const pageStart = 10 * (page - 1);
        const pageEnd = pageStart + 10;
        const currentTrack = queue.current;
        const tracks = queue.tracks.slice(pageStart, pageEnd).map((m, i) => {
            return `${i + pageStart + 1}. [**${m.title}**](${m.url}) - ${m.author}`;
        });
        const loopMode = queue.repeatMode === QueueRepeatMode.AUTOPLAY ? 'Autoplay' : queue.repeatMode === QueueRepeatMode.TRACK ? 'Current Song' : queue.repeatMode === QueueRepeatMode.QUEUE ? 'Entire Queue' : 'Off'
        const embed = new client.embed()
            .setTitle('Queued songs')
            .setColor(client.color.green)
            .setDescription(`${tracks.join('\n')}${
            queue.tracks.length > pageEnd
                ? `\n...${queue.tracks.length - pageEnd} more track(s)`
                : ''
        }`)
            .addField('Now Playing', `🎶 | [**${currentTrack.title}**](${currentTrack.url}) - ${currentTrack.author}))`)
            .setFooter('Repeat Mode: ' + loopMode)
        await interaction.editReply({
            embeds: [embed]
        })
    }
}