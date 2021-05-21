const config = require('../config');
const { createEmbed } = require('../helpers/createEmbed');

module.exports = {
  help: {
    run: 'help',
    name: 'Aide',
    description: ''
  },
  run: async (client, message, args) => {
    if (args[0]) {
      const command = client.commands.get(args[0].toLowerCase());
      if (!command || !command.help) return message.channel.send('Cette commande n\'existe pas.');

      const commandDesc = command.help.description ? command.help.description : 'Aucune description.';
      const commandSyntax = command.help.syntax ? ` ${command.help.syntax}` : '';

      await message.channel.send(createEmbed({
        title: `Commande : ${command.help.name}`,
        description: `> ${commandDesc}\n\nSyntaxe : \`${config.prefix}${command.help.run}${commandSyntax}\`\n\`[]\` : obligatoire | \`<>\` : facultatif`
      }));
    } else {
      await message.channel.send(createEmbed({
        title: 'Aide',
        description: `${client.commands.filter((command) => command.help).map((command) => `\`${config.prefix}${command.help.run}\``).join(', ')}\n\nPour plus d'informations sur une commande, tapez \`${config.prefix}help [commande]\``
      }));
    }
  }
};