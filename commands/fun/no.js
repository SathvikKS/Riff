const errormsg = require('../../botUtils/error');
const { variable } = require('../../botUtils/variable');

module.exports = {
    name: 'sayno',
    aliases: ['say'],
    category: 'Fun',
    utilisation: '{prefix}sayno [true/false]',
    description: 'Says no',
    async execute(client, message, args, Discord){
        if(!message.guild){
            return errormsg.display(message, 'dm');
        }
        if(!args.length){
            return errormsg.display(message, 'no song arg');
        }
        if(args.join(' ')==true) {
            variable.sayno = true
        } else if(args.join(' ')==false) {
            variable.sayno = false;
        }
    }
}