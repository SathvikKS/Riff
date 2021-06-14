const Discord = require('discord.js');
const {color} = require('./color');

const errorEmbed = new Discord.MessageEmbed()
            .setColor(color.red);
let msg;

let errormsg = {
    display: async function(message, errormsg) {

        switch(errormsg){
            case 'no vc':
                msg = 'You need to be in a Voice Channel to use this command.';
            break;
            case 'dm':
                msg = 'This command works only in servers.';
            break;
            case 'args':
                msg = 'This command requires argument\\s. Please check help command for more info';
            break;
            case 'no result':
                msg = 'Unable to search the query';
            break;
            case 'no num':
                mag = 'Enter a valid integer';
            break;
            case 'unauthorized':
                msg = 'You are unauthorized to use this command';
            break;
            case 'icant':
                msg = 'I do not have sufficient permissions to do that';
            break;
            default:
                msg=errormsg;
        }

        errorEmbed.setDescription("[<@"+message.author.id+">] "+msg);
        await message.channel.send(errorEmbed);
        }
}

module.exports = errormsg