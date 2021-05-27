const HelpCommand = require('../helpers/HelpCommandHelper');
const InteractionDataHelper = require('../helpers/InteractionDataHelper');
const { createEmbed } = require('../helpers/createEmbed');

module.exports = {
  help: HelpCommand('invite', 'Inviter le bot'),
  run: (client) => {
    const embed = createEmbed({
      title: 'Inviter le bot',
      description: `Pour inviter le bot, vous pouvez utiliser [ce lien](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot). Merci d'utiliser le bot ❤ !`
    });

    return InteractionDataHelper(embed);
  }
};