const rnd = require('randomstring')
const {
    QueueRepeatMode
} = require('discord-player');
const {
    MessageActionRow,
    MessageButton
} = require('discord.js');
const nowPlaying = async (client, queue, track) => {
    if (client.var.get(queue.guild.id).pausedState) return

    const uniqueId = rnd.generate(50)

    client.var.set(queue.guild.id, {
        ...client.var.get(queue.guild.id),
        playbackButtonId: uniqueId
    })

    const loopMode = queue.repeatMode === QueueRepeatMode.AUTOPLAY ? 'Autoplay' : queue.repeatMode === QueueRepeatMode.TRACK ? 'Current Song' : queue.repeatMode === QueueRepeatMode.QUEUE ? 'Entire Queue' : 'Off'
    const embed = new client.embed()
        .setColor(client.color.yellow)
        .setTitle("Now Playing... ")
        .setThumbnail(track.thumbnail)
        .addFields({
            name: 'Song',
            value: `[${track.title}](${track.url})`,
            inline: true
        }, {
            name: 'Artist',
            value: track.author,
            inline: true
        }, {
            name: 'Duration',
            value: track.duration
        })
        .setFooter('Repeat Mode: ' + loopMode)
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId(`${uniqueId}.backButton`)
            .setLabel('Back')
            .setEmoji('⏮️')
            .setStyle('PRIMARY'),
            new MessageButton()
            .setCustomId(`${uniqueId}.pausePlayButton`)
            .setLabel('Play/Pause')
            .setEmoji('⏯️')
            .setStyle('PRIMARY'),
            new MessageButton()
            .setCustomId(`${uniqueId}.stopButton`)
            .setLabel('Stop')
            .setEmoji('⏹️')
            .setStyle('PRIMARY'),
            new MessageButton()
            .setCustomId(`${uniqueId}.nextButton`)
            .setLabel('Next')
            .setEmoji('⏭️')
            .setStyle('PRIMARY')
        )
    client.var.set(queue.guild.id, {
        ...client.var.get(queue.guild.id),
        nowPlayingEmbed: embed,
        nowPlayingButtons: row
    })
    try {
        await client.var.get(queue.guild.id).nowPlaying.delete()
    } catch (e) {
    }
    client.var.set(queue.guild.id, {
        ...client.var.get(queue.guild.id),
        nowPlaying: await queue.metadata.channel.send({
            embeds: [embed],
            components: [row]
        })
    })

}

module.exports = nowPlaying