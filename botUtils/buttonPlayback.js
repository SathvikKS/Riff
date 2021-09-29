const butttonPlayback = async (interaction, client) => {
    if (!interaction.member.voice.channelId) {
        const embed = new client.embed()
            .setColor(client.color.red)
            .setDescription('You need to be connected to a Voice Channel to use this button')
        return await interaction.reply({
            embeds: [embed],
            ephemeral: true
        })
    }
    var uniqueId
    try {
        uniqueId = client.var.get(interaction.guildId).playbackButtonId
    } catch (e) {

    }
    if (!uniqueId) {
        const embed = new client.embed()
            .setColor(client.color.orange)
            .setDescription('This button has expired')
        return await interaction.reply({
            embeds: [embed],
            ephemeral: true
        })
    }
    const queue = client.player.getQueue(interaction.guildId)
    if (!queue) return await interaction.deferUpdate()

    if (interaction.customId === `${uniqueId}.backButton`) {
        const prevTrack = queue.previousTracks[queue.previousTracks.length - 2]
        if (!prevTrack) {
            const embed = new client.embed()
                .setColor(client.color.red)
                .setDescription('No previous song found')
            return await interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
        }
        try {
            await queue.back()
            const backEmbed = new client.embed()
                .setColor(client.color.green)
                .setDescription('[<@' + interaction.user.id + '>] Playing previous song... ')
            const backMessage = await interaction.channel.send({
                embeds: [backEmbed]
            })
            setTimeout(async () => {
                try {
                    await backMessage.delete()
                } catch (e) {

                }
            }, 10000)
            client.var.set(queue.guild.id, {
                ...client.var.get(queue.guild.id),
                playbackButtonId: undefined
            })
        } catch (e) {

        }
        try {
            const pausedState = client.var.get(interaction.guildId).pausedState
            if (pausedState) {
                queue.setPaused(false)
                client.var.set(queue.guild.id, {
                    ...client.var.get(queue.guild.id),
                    pausedState: undefined
                })
            }
        } catch (e) {

        }
        await interaction.deferUpdate()

    } else if (interaction.customId === `${uniqueId}.pausePlayButton`) {
        var nowPlayingEmbed
        var pausedState
        var nowPlayingButtons
        var nowPlaying
        var playPauseMessage
        try {
            pausedState = client.var.get(interaction.guildId).pausedState
            nowPlayingEmbed = client.var.get(interaction.guildId).nowPlayingEmbed
            nowPlayingButtons = client.var.get(interaction.guildId).nowPlayingButtons
            nowPlaying = client.var.get(interaction.guildId).nowPlaying
        } catch (e) {
            return interaction.deferUpdate()
        }
        if (pausedState === undefined) {
            const pauseSuccess = queue.setPaused(true)
            if (pauseSuccess) {
                nowPlayingEmbed.setTitle('Paused')
                const pauseEmbed = new client.embed()
                    .setColor(client.color.green)
                    .setDescription('[<@' + interaction.user.id + '>] Paused')
                playPauseMessage = await interaction.channel.send({
                    embeds: [pauseEmbed]
                })
                client.var.set(queue.guild.id, {
                    ...client.var.get(queue.guild.id),
                    pausedState: pauseSuccess,
                    nowPlaying: await nowPlaying.edit({
                        embeds: [nowPlayingEmbed],
                        componenets: [nowPlayingButtons]
                    })
                })
            }
        } else if (pausedState === true) {
            const resumeSuccess = queue.setPaused(false)
            if (resumeSuccess) {
                nowPlayingEmbed.setTitle('Now Playing... ')
                const resumeEmbed = new client.embed()
                    .setColor(client.color.green)
                    .setDescription('[<@' + interaction.user.id + '>] Resumed ')
                playPauseMessage = await interaction.channel.send({
                    embeds: [resumeEmbed]
                })
                client.var.set(queue.guild.id, {
                    ...client.var.get(queue.guild.id),
                    pausedState: undefined,
                    nowPlaying: await nowPlaying.edit({
                        embeds: [nowPlayingEmbed],
                        componenets: [nowPlayingButtons]
                    })
                })
            }
        }
        setTimeout(async () => {
            try {
                await playPauseMessage.delete()
            } catch (e) {

            }
        }, 10000)
        await interaction.deferUpdate()

    } else if (interaction.customId === `${uniqueId}.nextButton`) {
        try {
            await queue.skip()
            const skipEmbed = new client.embed()
                .setColor(client.color.green)
                .setDescription('[<@' + interaction.user.id + '>] Skipping this song... ')
            const skipMessage = await interaction.channel.send({
                embeds: [skipEmbed]
            })
            setTimeout(async () => {
                try {
                    await skipMessage.delete()
                } catch (e) {

                }
            }, 10000)
            client.var.set(queue.guild.id, {
                ...client.var.get(queue.guild.id),
                playbackButtonId: undefined
            })
        } catch (e) {

        }
        try {
            const pausedState = client.var.get(interaction.guildId).pausedState
            if (pausedState) {
                queue.setPaused(false)
                client.var.set(queue.guild.id, {
                    ...client.var.get(queue.guild.id),
                    pausedState: undefined
                })
            }
        } catch (e) {

        }
        await interaction.deferUpdate()

    } else if (interaction.customId === `${uniqueId}.stopButton`) {
        try {
            await queue.destroy()
            const stopEmbed = new client.embed()
                .setColor(client.color.green)
                .setDescription('[<@' + interaction.user.id + '>] Stopped')
            const stopMessage = await interaction.channel.send({
                embeds: [stopEmbed]
            })
            setTimeout(async () => {
                try {
                    await stopMessage.delete()
                } catch (e) {

                }
            }, 10000)
            await client.var.get(queue.guild.id).nowPlaying.delete()
            client.var.set(queue.guild.id, {
                ...client.var.get(queue.guild.id),
                playbackButtonId: undefined
            })
        } catch (e) {

        }
        await interaction.deferUpdate()
    }
}

module.exports = butttonPlayback