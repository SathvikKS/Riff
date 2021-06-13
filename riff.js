require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const { Player } = require("discord-music-player");
const token = process.env.token;
const fs = require('fs');

client.player = new Player(client,{
  leaveOnEnd: false,
  leaveOnStop: false,
  leaveOnEmpty: false,
  timeout: 10000,
  volume: 100,
  quality: 'high',
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


client.login(token);
