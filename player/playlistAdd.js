module.exports = async (client, Discord, message, queue, playlist) => {
    var queue;

    try {
        queue = await client.player.getQueue(message);
    } catch (e) {
        console.log("\nGet queue playlist error");
    } finally {
        if(queue) {
            (queue.previousTracks.map(() => {client.var.queueCount++}));
            (queue.tracks.map(() => {client.var.queueCount++}));
        }
    }

    if(playlist.url) client.var.playlistUrl = playlist.url;

    else if (playlist.external_urls.spotify) 
        client.var.playlistUrl = playlist.external_urls.spotify;

    const emb = new Discord.MessageEmbed()
    .setColor(client.color.green)
    .setThumbnail(playlist.thumbnail)
    .setDescription("[<@"+message.author.id+">] Added Playlist to the queue")
    .addFields(
        {name: 'Playlist', value: `[${playlist.title}](${client.var.playlistUrl})`},
    );

    if(client.var.queueCount) emb.addFields({name: 'Songs', value: client.var.queueCount});

    await message.channel.send(emb);
}