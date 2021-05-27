const HelpCommand = require('../helpers/HelpCommandHelper');
const InteractionDataHelper = require('../helpers/InteractionDataHelper');
const { createEmbed } = require('../helpers/createEmbed');

module.exports = {
  help: HelpCommand('about', 'À propos du bot'),
  run: (client) => {
    const embed = createEmbed({
      title: 'À propos du bot',
      fields: [
        {
          name: 'Statistiques totales :',
          value: `💻 ${client.guilds.cache.size} serveurs\n👤 ${client.users.cache.size} utilisateurs\n📜 ${client.channels.cache.size} channels`,
          inline: true
        }
      ]
    });

    return InteractionDataHelper(embed);
  }
};