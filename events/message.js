const errormsg = require('../botUtils/error');

require('dotenv').config();

module.exports = (client, Discord, message) => {
    const prefix = process.env.prefix;
    if(message.content.indexOf(prefix) !== 0 || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
       
    if(command) {
        if(command.sks === true && message.author.id !== client.var.SKS) return errormsg.display(message, 'unauthorized');
        if(command.guildOnly && !message.guild) return errormsg.display(message, 'dm');
        if(command.args && args.length<0) return errormsg.display(message, 'args');
        command.execute(client, message, args, Discord, cmd);
    }
    else {
        errormsg.display(message, 'Invalid Command');
    }
}