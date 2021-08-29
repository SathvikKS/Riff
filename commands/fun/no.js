const errormsg = require('../../botUtils/error');
const { variable } = require('../../botUtils/variable');

module.exports = {
    name: 'sayno',
    aliases: ['say'],
    category: 'Fun',
    utilisation: '{prefix}sayno [true/false] {prefix}say set [custom message]',
    description: 'Says a set message everytime',
    async execute(client, message, args, Discord){
        if(!message.guild){
            return errormsg.display(message, 'dm');
        }
        if(!args.length){
            return errormsg.display(message, 'no song arg');
        }
        if(args.join(' ') == "true") {
            message.reply("set true")
            variable.sayno = true
        } else if(args.join(' ') == "false") {
            message.reply("set false")
            variable.sayno = false;
        } else if(args[0] == "set") {
            message.reply("set custom msg")
            variable.saymessage = args.slice(1).join(' ');;
        }
        
        
    }
}