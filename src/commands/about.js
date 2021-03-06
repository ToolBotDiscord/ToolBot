const HelpCommand = require('../helpers/HelpCommandHelper');
const InteractionDataHelper = require('../helpers/InteractionDataHelper');
const { createEmbed } = require('../helpers/createEmbed');

module.exports = {
  help: HelpCommand('about', 'Ć propos du bot'),
  run: (client) => {
    const embed = createEmbed({
      title: 'Ć propos du bot',
      fields: [
        {
          name: 'Statistiques totales :',
          value: `š» ${client.guilds.cache.size} serveurs\nš¤ ${client.users.cache.size} utilisateurs\nš ${client.channels.cache.size} channels`,
          inline: true
        }
      ]
    });

    return InteractionDataHelper(embed);
  }
};