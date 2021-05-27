const moment = require('moment');
const HelpCommand = require('../helpers/HelpCommandHelper');
const InteractionDataHelper = require('../helpers/InteractionDataHelper');
const { createEmbed } = require('../helpers/createEmbed');

module.exports = {
  help: HelpCommand('server', 'Infos du serveur actuel.'),
  run: (client, interaction) => {
    const guild = client.guilds.cache.get(interaction.guild_id);
    const members = guild.memberCount;

    const embed = createEmbed({
      author: {
        author: guild.name,
        iconURL: guild.iconURL()
      },
      title: '',
      fields: [
        {
          name: 'Identifiant',
          value: guild.id,
          inline: true
        },
        {
          name: 'Fondateur',
          value: `<@${guild.owner.user.id}>`,
          inline: true
        },
        {
          name: 'Membres',
          value: `${members} membre${members > 1 ? 's' : ''}`,
          inline: true
        },
        {
          name: 'Création',
          value: moment(guild.createdAt).format('LLL'),
          inline: true
        },
        {
          name: 'Nombre de channels',
          value: `${guild.channels.cache.size} channels`,
          inline: true
        }
      ]
    });

    return InteractionDataHelper(embed);
  }
};