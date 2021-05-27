const HelpCommand = require('../helpers/HelpCommandHelper');
const InteractionDataHelper = require('../helpers/InteractionDataHelper');
const { createEmbed } = require('../helpers/createEmbed');

module.exports = {
  help: HelpCommand('donate', 'Nous faire un don'),
  run: () => {
    const embed = createEmbed({
      title: 'Nous faire un don',
      description: 'Pour nous faire un don, vous pouvez utiliser ces méthodes :\n> DonateBot : ' +
        'https://donatebot.io/checkout/809493987546759209\n> Patreon : https://www.patreon.com/ToolBot_\n> OpenCollective : ' +
        'https://opencollective.com/ToolBot\n\n**Merci à vous ❤ !**'
    });

    return InteractionDataHelper(embed);
  }
};