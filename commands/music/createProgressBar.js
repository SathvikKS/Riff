const errormsg = require('../../botUtils/error');

module.exports = {
    name: 'progressbar',
    async execute(client, message, Discord, options) {
        var progressbar;
        try {
            progressbar = await client.player.createProgressBar(message, {
                timecodes: false,
                queue: options.queue === true ? true : false,
                length: 17
            });
        } catch (e) {
        } finally {
            if(progressbar) return progressbar;
            else return false;
        }
    }
}