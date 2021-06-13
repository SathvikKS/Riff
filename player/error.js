const func = require('../commands/core/func');

module.exports = (client, Discord, error, message, ...args) => {
    switch (error) {
        case 'SearchIsNull':
            func.feature(client, message, Discord, error, 'No song with that query was found.');
            break;
        case 'InvalidPlaylist':
            func.feature(client, message, Discord, error, 'No Playlist was found with that link.');
            break;
        case 'InvalidSpotify':
            func.feature(client, message, Discord, error, 'No Spotify Song was found with that link.');
            break;
        case 'QueueIsNull':
            func.feature(client, message, Discord, error, 'There is no music playing right now.');
            break;
        case 'VoiceChannelTypeInvalid':
            func.feature(client, message, Discord, error, 'You need to be in a Voice Channel to play music.');
            break;
        case 'LiveUnsupported':
            func.feature(client, message, Discord, error, 'livestream');
            break;
        case 'VideoUnavailable':
            func.feature(client, message, Discord, error, 'Something went wrong while playing the current song, skipping...');
            break;
        case 'NotANumber':
            func.feature(client, message, Discord, error, 'The provided argument was Not A Number.');
            break;
        case 'MessageTypeInvalid':
            func.feature(client, message, Discord, error, 'The Message object was not provided.');
            break;
        default:
            console.log(`**Unknown Error Ocurred:** ${error}`);
            break;
    }
}