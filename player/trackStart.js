const current = require('../commands/utils/currentSong')

module.exports = async (client, Discord, message, track, queue) => {
    current.execute(client, message, Discord, track)
}