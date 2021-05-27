const helpCommand = require('../helpers/HelpCommandHelper');
const InteractionDataHelper = require('../helpers/InteractionDataHelper');

module.exports = {
  help: helpCommand('avatar', 'Permet de récupérer l\'avatar d\'un utilisateur.', [
    {
      name: 'utilisateur',
      description: 'L\'avatar d\'un utilisateur.',
      type: 6,
      required: false
    }
  ]),
  run: (client, interaction, args) => {
    let member;
    args && args.utilisateur ? member = args.utilisateur : member = interaction.member;

    const message = `Voici ${member === interaction.member ? 'votre avatar' : `l'avatar de ${interaction.member.user.username}`} :`;
    // message.channel.send(msg, {
    //   files: [{ attachment: member.user.displayAvatarURL(), name: 'avatar.png' }]
    // });

    return InteractionDataHelper(`${message} ${client.users.cache.get(interaction.member.user.id).displayAvatarURL()}`);
  }
};