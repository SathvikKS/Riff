require('dotenv').config();
const Discord = require("discord.js");
const client = new Discord.Client;
const fs = require('fs');
const DiscordPlayer = require('discord-player');
const {color} = require('./botUtils/color');
const {variable} = require('./botUtils/variable');
const sleep = require('./botUtils/sleep')

client.sleep = sleep;
client.var = variable;
client.color = color;
client.util = DiscordPlayer.Util;
client.player = new DiscordPlayer.Player(client, {
    leaveOnEnd: true,
    leaveOnEndCooldown: 300000,
    leaveOnStop: false,
    leaveOnEmpty: true,
    leaveOnEmptyCooldown: 300000,
    enableLive: true,
    fetchBeforeQueued: true
});
client.commands = new Discord.Collection();

fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        client.commands.set(command.name, command);
    };
});
  
const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));
  
for (const file of events) {
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client, Discord));
};
  
for (const file of player) {
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client, Discord));
};


client.login(process.env.token);