const errormsg = require('../../botUtils/error');

module.exports = {
    async execute(client, message, Discord) {
        var timecode;
        try {
            timecode = await client.player.getTimeCode(message);
        } catch (e) {
        } finally {
            if(timecode) return timecode;
            else return false
        }
    }
}