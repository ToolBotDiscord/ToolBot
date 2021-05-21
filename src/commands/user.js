const moment = require('moment');
const { createEmbed } = require('../helpers/createEmbed');

module.exports = {
  help: {
    run: 'user',
    syntax: '<utilisateur>',
    name: 'Infos utilisateur',
    description: 'Avoir les infos d\'un utilisateur.'
  },
  run: async (client, message) => {
    let member = message.member;
    if (message.mentions.members.first()) member = message.mentions.members.first();

    let presence;
    if (member.user.presence.status === 'online') presence = 'En ligne';
    if (member.user.presence.status === 'idle') presence = 'AFK';
    if (member.user.presence.status === 'dnd') presence = 'Ne pas déranger';
    if (member.user.presence.status === 'invisible') presence = 'Invisible';
    if (member.user.presence.status === 'offline') presence = 'Hors ligne';

    const embed = createEmbed({
      author: {
        author: member.user.tag,
        iconURL: member.user.avatarURL()
      },
      title: '',
      fields: [
        {
          name: 'Identifiant',
          value: member.user.id,
          inline: true
        },
        {
          name: 'Statut',
          value: presence,
          inline: true
        },
        {
          name: 'Création du compte',
          value: moment(member.user.createdAt).format('LLL'),
          inline: true
        }
      ]
    });

    await message.channel.send(embed);
  }
};