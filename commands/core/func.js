const {color} = require('./color.js');
const {variables} = require('./variables.js');
const {songvars} = require('../core/variables.js')
let dcmsg = false;
let dcmsgdel = false;
const progressbar = require('string-progressbar');
const pb = require("../music/progressBar");
const {Utils} = require('discord-music-player');

async function feature(client, message, Discord, song, args) {
    if(args === 'songAdd'){
        const feature = new Discord.MessageEmbed()
        .setColor(color.green)
        .setDescription("[<@"+message.author.id+">] Added to Queue")
        .addFields(
            {name: 'Song', value: `[${song.name}](${song.url})`, inline: true},
            {name: 'Artist', value: song.author, inline: true}
        );
        await message.channel.send(feature);
    } else if (args === 'songChanged' || args === 'songFirst') {
        variables.playingmsgembed = new Discord.MessageEmbed()
        .setColor(color.yellow)
        .setThumbnail(song.thumbnail)
        .setTitle('Now Playing')
        .setDescription(progressbar.splitBar(10, 0, 20)[0]+" 00:00 | 00:00" )
        .setThumbnail(song.thumbnail)
        .addFields(
            {name: 'Song', value: `[${song.name}](${song.url})`},
            {name: 'Artist', value: song.author},
            {name: 'Duration', value: song.duration}
        );
        songvars.songchanged = true;
        setTimeout(function(){
            songvars.songchanged = false
        }, 2500);
        if (variables.playingmsg === false) { 
            variables.playingmsg = await message.channel.send(variables.playingmsgembed);
        }
        else {
            try {
                variables.playingmsg.delete();
                variables.playingmsg = false;
            }
            finally {
                variables.playingmsg = await message.channel.send(variables.playingmsgembed);
            }
        }
        await pb.createProgressBar(client, message, args, Discord);        
    } else if(args === 'channelEmpty') {
        const feature = new Discord.MessageEmbed()
        .setColor(color.green)
        .setDescription(`The **${song.connection.channel}** was empty, music was removed!`);
        await message.channel.send(feature);
    } else if(args === 'clientDisconnect' || args === 'clientUndeafen') {
        const feature = new Discord.MessageEmbed()
        .setColor(color.green)
        .setDescription('I got disconnected from the channel, music was removed.');
        if(dcmsgdel === false) {
            //dcmsg = await message.channel.send(feature);
            dcmsgdel === true;
            setTimeout(function() {
                dcmsgdel === false;
            }, 10000);
        }
    } else if(args === 'queueEnd') {
        const feature = new Discord.MessageEmbed()
        .setColor(color.green)
        .setDescription("[<@"+message.author.id+">] The queue ended, nothing more to play!.");
        songvars.songchanged = true;
        setTimeout(function(){
            songvars.songchanged = false
        }, 2500);
        try {
            variables.playingmsgembed.setColor(color.green);
            variables.playingmsgembed.setTitle('Done Playing');
            variables.playingmsgembed.setDescription(progressbar.splitBar(songvars.songtotals, songvars.songtotals, 20)[0]+" "+Utils.MillisecondsToTime(songvars.songtotalms)+" | "+Utils.MillisecondsToTime(songvars.songtotalms));
            variables.playingmsg = await variables.playingmsg.edit(variables.playingmsgembed);
            //variables.playingmsg = false;
        } finally {
            await message.channel.send(feature);
        }
    } else if(args === 'playlistAdd') {
        const feature = new Discord.MessageEmbed()
        .setColor(color.green)
        .setTitle('Playlist Added')
        .setDescription("[<@"+message.author.id+">] ")
        .addFields(
            {name: 'Playlist Name', value: song.name},
            {name: 'Song count', value: song.videoCount}
        );
        await message.channel.send(feature);
    } else if(args === 'livestream') {
        const feature = new Discord.MessageEmbed()
        .setColor(color.green)
        .setDescription('I cannot play live stream videos');
        await message.channel.send(feature);
    } else {
        const feature = new Discord.MessageEmbed()
        .setColor(color.red)
        .setDescription("[<@"+message.author.id+">] "+args);
        await message.channel.send(feature);
    }
} 

module.exports = {feature};