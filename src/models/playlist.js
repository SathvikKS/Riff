const mongoose = require('mongoose')

const playlistSchema = mongoose.Schema({
    playlistName: {
        type: String,
        required: true,
    },
    Tracks: [{
        type: mongoose.Schema.Types.Mixed
    }],
    owner: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})
const Playlists = mongoose.model('Playlists', playlistSchema)
module.exports = Playlists