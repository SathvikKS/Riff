const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    QueueRepeatMode
} = require('discord-player');

module.exports = {
    name: 'repeat',
    category: 'Music',
    utilisation: '/repeat [Mode]',
    voice: true,
    description: 'Set repeat mode for the queue\nTurn off repeat - Turn off repeat mode\nCurrent Song - Repeat the current song\nEntire Queue - Repeat the entire queue\nAutoplay - Automatically play recommended songs (Doesn\'t work for playlists)',
    data: new SlashCommandBuilder()
        .setName('repeat')
        .setDescription('Turn repeat off, Repeat current song, Repeat entire queue, Autoplay from YouTube')
        .addIntegerOption(option =>
            option.setName('mode')
            .setDescription('Repeat Mode')
            .setRequired(true)
            .addChoices([
                ['Turn off repeat (0)', QueueRepeatMode.OFF],
                ['Current Song (1)', QueueRepeatMode.TRACK],
                ['Entire Queue (2)', QueueRepeatMode.QUEUE],
                ['Autoplay (3)', QueueRepeatMode.AUTOPLAY],
            ])
        ),
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
        if (!queue.playing) {
            const embed = new client.embed()
                .setColor(client.color.red)
                .setDescription('You can change the repeat mode only when a song is being played')
            return await interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
        }
        const loopMode = interaction.options.get('mode').value
        const setLoopMode = loopMode === QueueRepeatMode.AUTOPLAY ? 'Autoplay' : loopMode === QueueRepeatMode.TRACK ? 'Current Song' : loopMode === QueueRepeatMode.QUEUE ? 'Entire Queue' : 'Off'
        const currentLoopMode = queue.repeatMode
        if (currentLoopMode === loopMode) {
            const embed = new client.embed()
                .setColor(client.color.yellow)
                .setDescription('Current repeat mode is already set to ' + setLoopMode + '. No changes were made')
            return await interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
        }
        if (loopMode === QueueRepeatMode.AUTOPLAY && queue.tracks.length > 1) {
            const embed = new client.embed()
                .setColor(client.color.yellow)
                .setDescription(setLoopMode + ' is not applicable to playlists')
            return await interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
        }
        await interaction.deferReply()
        const changeLoopMode = queue.setRepeatMode(loopMode)

        if (changeLoopMode) {
            const embed = new client.embed()
                .setColor(client.color.green)
                .setDescription('Changed repeat mode to ' + setLoopMode)
            require('../../botUtils/nowPlaying')(client, queue, queue.nowPlaying())
            await interaction.editReply({
                embeds: [embed]
            })
        } else {
            const embed = new client.embed()
                .setColor(client.color.red)
                .setDescription('Failed to set repeat mode')
            await interaction.editReply({
                embeds: [embed]
            })
        }

    }
}