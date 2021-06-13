const func = require('../commands/core/func');

module.exports = (client, Discord, message, queue, playlist) => {
    func.feature(client, message, Discord, playlist, 'playlistAdd');
}