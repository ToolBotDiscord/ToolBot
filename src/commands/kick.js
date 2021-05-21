const { createErrorEmbed, createSuccessEmbed } = require('../helpers/createEmbed');

module.exports = {
  help: {
    run: 'kick',
    syntax: '[utilisateur] <raison>',
    name: 'Expulsion',
    description: 'Permet d\'expulser un utilisateur du serveur.',
    hasPerm: 'KICK_MEMBERS'
  },
  run: async (client, message, args) => {
    const member = message.mentions.members.first();

    if (!member) {
      return await message.channel.send(createErrorEmbed('Merci de mentionner le membre à expulser.')) && message.delete();
    }
    if (member.id === message.guild.ownerID) {
      return await message.channel.send(createErrorEmbed('Le propriétaire du serveur ne peut pas être expulsé.')) && message.delete();
    }
    if (
      message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 &&
      message.author.id !== message.guild.ownerID
    ) {
      return await message.channel.send(createErrorEmbed('Ce membre ne peut pas être expulsé du serveur.')) && message.delete();
    }
    if (!member.kickable) {
      return await message.channel.send(createErrorEmbed(`Ce membre ne peut pas être expulsé car mon rôle est en dessous de son rôle le plus haut (${member.roles.highest}).`)) && message.delete();
    }
    if (!message.guild.member(member)) {
      return await message.channel.send(createErrorEmbed('L\'expulsion est impossible car l\'utilisateur est introuvable.')) && message.delete();
    }

    const reason = args.slice(1).join(' ') || 'Aucune raison fournie';

    member.send(`Vous avez été expulsé du serveur **${message.guild.name}** par ${message.author}. Raison : **${reason}**`)
      .then(() => {
        member.kick(reason)
          .then((member) => {
            message.channel.send(createSuccessEmbed(`\`${member.user.tag}\` a bien été expulsé de **${message.guild.name}**.`));
          });
      });
  }
};