require('./src/db/mongoose')
const Discord = require('discord.js')
const { Client, Collection } = require("discord.js");
const { Player, Util } = require("discord-player");
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const {color} = require('./botUtils/color');

const sleep = require('./botUtils/sleep')
const client = new Client({ intents: 32767 });
const rest = new REST({ version: '9' }).setToken(process.env.token);
client.embed = MessageEmbed
client.sleep = sleep;
client.var = new Map()
client.color = color;
client.util = Util;
const player = new Player(client);
client.player = player

client.commands = new Collection();
const commands = [];

fs.readdirSync('./commands').forEach(dirs => {
    const commandFiles = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
    for (const file of commandFiles) {
		const command = require(`./commands/${dirs}/${file}`);
		client.commands.set(command.data.name, command);
		commands.push(command.data.toJSON());
	}
});

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

const playerEventFiles = fs.readdirSync('./playerEvents').filter(file => file.endsWith('.js'));

for (const file of playerEventFiles) {
	const event = require(`./playerEvents/${file}`);
	client.player.on(file.split(".")[0], event.bind(null, client));
}

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(process.env.clientId, process.env.guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

client.login(process.env.token);