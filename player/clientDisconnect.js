const func = require('../commands/core/func');

module.exports = (client, Discord, message, queue) => {
    func.feature(client, message, Discord, queue, 'clientDisconnect');
}