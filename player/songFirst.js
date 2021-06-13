const func = require('../commands/core/func');

module.exports = (client, Discord, message, song) => {
    func.feature(client, message, Discord, song, 'songFirst');
}