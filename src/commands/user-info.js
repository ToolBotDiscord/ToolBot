const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
  help: {
    name: 'Infos utilisateur',
    description: 'Avoir les infos d\'un utilisateur.'
  },
  run: (client, message) => {
    const embed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL())
      .addField('ID', message.author.id, true)
      .addField('Création du compte', moment(message.author.createdAt).format('LLL'), true)
    ;

    message.channel.send(embed);
  }
};