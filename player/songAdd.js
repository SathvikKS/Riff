const func = require('../commands/core/func');

module.exports = (client, Discord, message, queue, song) => {
    func.feature(client, message, Discord, song, 'songAdd');
}