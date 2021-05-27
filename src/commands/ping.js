const HelpCommand = require('../helpers/HelpCommandHelper');
const InteractionDataHelper = require('../helpers/InteractionDataHelper');

module.exports = {
  help: HelpCommand('ping', 'Latence du bot'),
  run: () => {
    const now = Date.now();

    return InteractionDataHelper(`🏓 **Pong !** Ma latence est de ${Date.now() - now}ms.`);
  }
};