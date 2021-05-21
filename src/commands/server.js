const moment = require('moment');
const { createEmbed } = require('../helpers/createEmbed');

module.exports = {
  help: {
    name: 'Infos du serveur',
    description: 'Avoir les infos du serveur actuel.'
  },
  run: async (client, message) => {
    const guild = message.guild;
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
          value: guild.owner.user,
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

    await message.channel.send(embed);
  }
};