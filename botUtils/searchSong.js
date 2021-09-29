const isUrl = require('is-url')
module.exports = async (client, interaction, searchQuery) => {
    const track = await client.player.search(searchQuery, {
        requestedBy: interaction.user
    }).catch((e) => {
        console.log('Search error play.js\n' + e)
    })

    if (!track) {
        const embed = new client.embed()
            .setColor(client.color.red)
            .setDescription('The requested song was not found')
        return await interaction.editReply({
            embeds: [embed],
            ephemeral: true
        });
    }
    if (isUrl(searchQuery)) {
        if (!track.tracks.length) {
            const embed = new client.embed()
                .setColor(client.color.red)
                .setDescription('The requested song is either age restricted or not available in your country.' + searchQuery)
            return await interaction.editReply({
                embeds: [embed],
                ephemeral: true
            })
        }
    } else {
        const reSearch = await client.player.search(track.tracks[0].url, {
            requestedBy: interaction.user
        }).catch((e) => {
            console.log('Search error play.js\n' + e)
        })
        if (!reSearch.tracks.length) {
            const embed = new client.embed()
                .setColor(client.color.red)
                .setDescription('The requested song is either age restricted or not available in your country.')
            return await interaction.editReply({
                embeds: [embed],
                ephemeral: true
            })
        }
    }
    return track
}