const func = require('../commands/core/func');

module.exports = (client, Discord, message, newSong, oldSong) => {
    func.feature(client, message, Discord, newSong, 'songChanged');
}