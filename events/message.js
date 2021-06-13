var {color} = require('../commands/core/color.js');
require('dotenv').config();

module.exports = (client, Discord, message) => {
    const prefix = process.env.prefix;
    if(message.content.indexOf(prefix) !== 0 || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
       
    if(command) command.execute(client, message, args, Discord, cmd);
    else {
        const error = new Discord.MessageEmbed()
        .setColor(color.red)
        .setDescription("[<@"+message.author.id+">] Invalid Command");
         message.channel.send(error);
      }
}