const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    Track
} = require('discord-player');

const Playlist = require('../../src/models/playlist')
const tracks = []
module.exports = {
    name: 'playlist',
    category: 'Music',
    utilisation: '/playlist [Sub Command]',
    description: 'Manage your playlists',
    data: new SlashCommandBuilder()
        .setName('playlist')
        .setDescription('Manage your playlists')

        // Play
        .addSubcommand(subcommand =>
            subcommand
            .setName('play')
            .setDescription('Play the playlist')
            .addStringOption(option =>
                option
                .setName('playlist_name')
                .setDescription('Name of the playlist to be played')
                .setRequired(true)
            )
        )
        // Get playlists
        .addSubcommand(subcommand =>
            subcommand
            .setName('list')
            .setDescription('Get the list of your playlists')
        )
        // Create
        .addSubcommand(subcommand =>
            subcommand
            .setName('create')
            .setDescription('Create a new playlist')
            .addStringOption(option =>
                option
                .setName('playlist_name')
                .setDescription('Name of the playlist to be created')
                .setRequired(true)
            )
        )
        // Delete
        .addSubcommand(subcommand =>
            subcommand
            .setName('delete')
            .setDescription('Delete the playlist')
            .addStringOption(option =>
                option
                .setName('playlist_name')
                .setDescription('Name of the playlist to be deleted')
                .setRequired(true)
            )
        )
        // View playlist
        .addSubcommand(subcommand =>
            subcommand
            .setName('view')
            .setDescription('View the songs in the playlists')
            .addStringOption(option =>
                option
                .setName('playlist_name')
                .setDescription('Name of the playlist to be viewed')
                .setRequired(true)
            )
            .addIntegerOption(option =>
                option
                .setName('page')
                .setDescription('Page number of the list')
                .setRequired(false)
            )
        )
        // Add song(s)
        .addSubcommand(subcommand =>
            subcommand
            .setName('add')
            .setDescription('Add song(s) to the playlist')
            .addStringOption(option =>
                option
                .setName('playlist_name')
                .setDescription('Name of the playlist to update')
                .setRequired(true)
            )
            .addStringOption(option =>
                option
                .setName('song')
                .setDescription('Song(s) to be added to the playlist')
                .setRequired(true)
            )
        )
        // Clear playlist
        .addSubcommand(subcommand =>
            subcommand
            .setName('clear')
            .setDescription('Clear the songs in the playlist')
            .addStringOption(option =>
                option
                .setName('playlist_name')
                .setDescription('Name of the playlist to be cleared')
                .setRequired(true)
            )
        ),
    async execute(interaction, client) {
        var playlistName
        try {
            playlistName = interaction.options.get('playlist_name').value
        } catch (e) {

        }

        const subCommand = interaction.options._subcommand
        const owner = interaction.user.id

        if (subCommand === 'play') {
            const exists = await Playlist.findOne({
                owner,
                playlistName
            })
            if (!exists) {
                const embed = new client.embed()
                    .setColor(client.color.red)
                    .setDescription('You do not have any playlist in that name')
                return await interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                })
            }

            exists.Tracks.forEach(async (track) => {
                const temp = new Track(client.player, track)
                tracks.push(temp)
            })

            const queue = client.player.createQueue(interaction.guild, {
                leaveOnEnd: false,
                leaveOnStop: false,
                leaveOnEmpty: true,
                leaveOnEmptyCooldown: 10000,
                metadata: {
                    channel: interaction.channel
                }
            });
            client.var.set(interaction.guildId, {
                ...client.var.get(interaction.guildId),
                playInteraction: interaction
            })
            await interaction.deferReply()
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
            queue.addTracks(tracks)
            await queue.play()

        } else if (subCommand === 'list') {
            const embed = new client.embed()
            const userPlaylists = await Playlist.find({
                owner
            })
            if (!userPlaylists) {
                embed
                    .setColor(client.color.red)
                    .setDescription('You do not have any saved playlists')
            } else {
                const playlistArray = []
                userPlaylists.forEach((playlist) => {
                    playlistArray.push(playlist.playlistName)
                })
                embed
                    .setColor(client.color.green)
                    .setTitle('Your playlist(s)')
                    .setDescription(`**${playlistArray.join('\n')}**`)
            }
            await interaction.reply({
                embeds: [embed],
                ephemeral: true
            })

        } else if (subCommand === 'create') {
            const newPlaylist = new Playlist({
                playlistName,
                owner
            })


            const exists = await Playlist.findOne({
                playlistName,
                owner
            })
            if (exists) {
                const embed = new client.embed()
                    .setColor(client.color.red)
                    .setDescription('You already have a playlist in this name. Please choose a different name')
                return await interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                })
            }
            await newPlaylist.save()
            const embed = new client.embed()
                .setColor(client.color.green)
                .setDescription(`Created a new playlist **${playlistName}**`)
            await interaction.reply({
                embeds: [embed],
                ephemeral: true
            })

        } else if (subCommand === 'delete') {
            try {
                const deleteSuccess = await Playlist.findOneAndDelete({
                    playlistName,
                    owner
                })
                if (deleteSuccess) {
                    const embed = new client.embed()
                        .setColor(client.color.green)
                        .setDescription(`Deleted playlist **${playlistName}**`)
                    await interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    })
                } else {
                    const embed = new client.embed()
                        .setColor(client.color.red)
                        .setDescription(`You do not have any playlist in that name`)
                    await interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    })
                }

            } catch (e) {
                const embed = new client.embed()
                    .setColor(client.color.red)
                    .setDescription(`Unable to delete playlist ` + e)
                await interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                })
            }

        } else if (subCommand === 'view') {

            const exists = await Playlist.findOne({
                playlistName,
                owner
            })
            if (exists) {
                if (exists.Tracks.length === 0) {
                    const embed = new client.embed()
                        .setColor(client.color.orange)
                        .setDescription(`Playlist is empty`)
                    return await interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    })
                }
                const tracksArray = []
                exists.Tracks.forEach((track) => {
                    tracksArray.push(`[${track.title}](${track.url}) - ${track.author}`)
                })
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
                const pageStart = 10 * (page - 1);
                const pageEnd = pageStart + 10;
                const tracks = exists.Tracks.slice(pageStart, pageEnd).map((m, i) => {
                    return `${i + pageStart + 1}. [**${m.title}**](${m.url}) - ${m.author}`;
                });
                const embed = new client.embed()
                    .setTitle(playlistName)
                    .setColor(client.color.green)
                    .setDescription(`${tracks.join('\n')}${
            exists.Tracks.length > pageEnd
                ? `\n...${exists.Tracks.length - pageEnd} more track(s)`
                : ''
        }`)
                await interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                })

            } else {
                const embed = new client.embed()
                    .setColor(client.color.red)
                    .setDescription(`You do not have any playlist in that name`)
                await interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                })
            }


        } else if (subCommand === 'add') {
            const exists = await Playlist.findOne({
                playlistName,
                owner
            })
            if (!exists) {
                const embed = new client.embed()
                    .setColor(client.color.red)
                    .setDescription(`You do not have any playlist in that name`)
                return await interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                })
            }
            await interaction.deferReply()
            const searchQuery = interaction.options.get('song').value
            const track = await require('../../botUtils/searchSong')(client, interaction, searchQuery)

            if (!track.playlist) {
                exists.Tracks.push({
                    ...track.tracks[0],
                    source: await require('../../botUtils/regexMatch')(track.tracks[0].url)
                })
            } else {
                track.tracks.forEach(async (track) => {
                    const temp = {
                        ...track,
                        playlist: undefined,
                        source: await require('../../botUtils/regexMatch')(track.url)
                    }
                    exists.Tracks.push(temp)
                })
            }
            // track.playlist ? exists.Tracks = exists.Tracks.concat(track.tracks) : exists.Tracks = exists.Tracks.push(track.tracks[0])
            try {
                await exists.save()
                const embed = new client.embed()
                    .setColor(client.color.green)
                track.playlist ? embed.setDescription(`Added ${track.tracks.length + 1} songs to **${playlistName}**`) : embed.setDescription(`Added 1 song to **${playlistName}**`)

                await interaction.editReply({
                    embeds: [embed],
                    ephemeral: true
                })
            } catch (e) {
                const embed = new client.embed()
                    .setColor(client.color.red)
                    .setDescription(`Failed to add songs\n ${e}`)
                await interaction.editReply({
                    embeds: [embed],
                    ephemeral: true
                })
            }

        } else if (subCommand === 'clear') {
            const exists = await Playlist.findOne({
                owner,
                playlistName
            })
            if (!exists) {
                const embed = new client.embed()
                    .setColor(client.color.red)
                    .setDescription(`You do not have any playlist in that name`)
                return await interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                })
            }
            exists.Tracks = []
            try {
                await exists.save()
                const embed = new client.embed()
                    .setColor(client.color.green)
                    .setDescription(`Deleted all tracks in ${playlistName}`)
                await interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                })
            } catch (e) {
                const embed = new client.embed()
                    .setColor(client.color.red)
                    .setDescription(`Unable to clear the playlist\n ${e}`)
                await interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                })
            }


        }
    }
}