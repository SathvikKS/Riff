require('dotenv').config();

module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'Core',
    utilisation: '{prefix}help <command name>',
    async execute(client, message, args, Discord) {
        if (!args[0]) {
            const music = message.client.commands.filter(x => x.category == 'Music').map((x) => '`' + x.name + '`').join(', ');
            const core = message.client.commands.filter(x => x.category == 'Core').map((x) => '`' + x.name + '`').join(', ');
            const moderator = message.client.commands.filter(x => x.category == 'Mod').map((x) => '`' + x.name + '`').join(', ');

            const emb = new Discord.MessageEmbed()
            .setColor(client.color.blue)
            .setTitle('Help Pannel')
            .setFooter(`Use ${process.env.prefix}help <command name> for more help about the command`)
            .addFields(
                { name: 'Music', value: music },
                { name: 'Core', value: core},
                { name: 'Moderator', value: moderator}
            );
            await message.channel.send(emb);
        } else {
            const command = message.client.commands.get(args.join(" ").toLowerCase()) || message.client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));

            if (!command) return message.channel.send(`${client.emotes.error} - I did not find this command !`);

            const emb = new Discord.MessageEmbed()
            .setTitle('Help Pannel')
            .setColor(client.color.blue)
            .setDescription('Mandatory arguments `[]`, optional arguments `<>`.')
            .addFields(
                { name: 'Name', value: command.name, inline: true },
                { name: 'Category', value: command.category, inline: true },
                { name: 'Aliase(s)', value: command.aliases.length < 1 ? 'None' : command.aliases.join(', '), inline: true },
                { name: 'Utilisation', value: command.utilisation.replace('{prefix}', process.env.prefix),},
            );
            if(command.description) emb.addFields({name: 'Description', value: command.description, inline:true});
            
            await message.channel.send(emb);

        };
    },
};