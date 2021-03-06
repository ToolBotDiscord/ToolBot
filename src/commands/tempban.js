const { createErrorEmbed, createSuccessEmbed } = require('../helpers/createEmbed');

module.exports = {
  help: {
    run: 'tempban',
    syntax: '[utilisateur] [temps (en jours)] <raison>',
    name: 'Ban temporaire',
    description: 'Permet de bannir un utilisateur temporairement du serveur.',
    hasPerm: 'BAN_MEMBERS'
  },
  run: async (client, message, args) => {
    const member = message.mentions.members.first();

    if (!member) {
      return await message.channel.send(createErrorEmbed('Merci de mentionner le membre à bannir.')) && message.delete();
    }
    if (member.id === message.guild.ownerID) {
      return await message.channel.send(createErrorEmbed('Le propriétaire du serveur ne peut pas être banni.')) && message.delete();
    }
    if (
      message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 &&
      message.author.id !== message.guild.ownerID
    ) {
      return await message.channel.send(createErrorEmbed('Ce membre ne peut pas être banni du serveur.')) && message.delete();
    }
    if (!member.bannable) {
      return await message.channel.send(createErrorEmbed(`Ce membre ne peut pas être banni car mon rôle est en dessous de son rôle le plus haut (${member.roles.highest}).`)) && message.delete();
    }
    if (!message.guild.member(member)) {
      return await message.channel.send(createErrorEmbed('Le ban est impossible car l\'utilisateur est introuvable.')) && message.delete();
    }
    if (!args[1]) {
      return await message.channel.send(createErrorEmbed('Le ban est impossible car le temps n\'a pas été spécifié.')) && message.delete();
    }

    const reason = args.slice(2).join(' ') || 'Aucune raison fournie';
    const days = parseInt(args[1]);

    member.send(`Vous avez été banni du serveur **${message.guild.name}** par ${message.author} pendant ${days} jours. Raison : **${reason}**`)
      .then(() => {
        member.ban({ reason, days })
          .then((member) => {
            message.channel.send(createSuccessEmbed(`\`${member.user.tag}\` a bien été banni de **${message.guild.name}** pendant ${days} jours.`));
          });
      });
  }
};