const {color} = require('../core/color.js');
const {variables} = require('../core/variables.js');
const {songvars} = require('../core/variables.js')
const {Utils} = require('discord-music-player');
const progressbar = require('string-progressbar');

let progressBar = {

    sleep: function(ms) {
        return new Promise(
          resolve => setTimeout(resolve, ms)
        );
    },

    getcurrentms: async function(message, client){
        try {
            return songvars.songcurrentms = await client.player.getDurationCurrent(message);
        } catch (e) {
            await this.sleep(100);
            console.log(e);
            this.getcurrentms(message, client);
        }
    },

    createProgressBar: async function(client, message, args, Discord) {

        songvars.songtotalms = client.player.getDurationEnd(message);

        if(songvars.songtotalms === null) {
            while(songvars.songtotalms === null) {
                songvars.songtotalms = await client.player.getDurationEnd(message);
                this.sleep(100);
            }
        }

        songvars.songtotals = songvars.songtotalms/1000;

        while(songvars.songchanged && !client.player.isQueueEmpty(message)) {
            await this.sleep(250);
        }

        for(let i=-1;i<=songvars.songtotals &&  !client.player.isQueueEmpty(message) && !songvars.songchanged; i+=2) {
            await this.getcurrentms(message, client);
            while(songvars.songcurrentms === null){
                let empty = await client.player.isQueueEmpty(message);
                if(empty) return;
                else {
                    await this.sleep(150);
                    songvars.songcurrentms = await this.getcurrentms(message, client);
                }
            }

            songvars.songcurrents = songvars.songcurrentms/1000;

            try {
                variables.playingmsgembed.setDescription(progressbar.splitBar(songvars.songtotals, songvars.songcurrents, 20)[0]+" "+Utils.MillisecondsToTime(songvars.songcurrentms)+" | "+Utils.MillisecondsToTime(songvars.songtotalms));
                variables.playingms = await variables.playingmsg.edit(variables.playingmsgembed);
            } catch (e) {
            }
            
            await this.sleep(2000);
        }
    }
}
    

module.exports = progressBar;