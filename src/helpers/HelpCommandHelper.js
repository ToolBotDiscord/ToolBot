/**
 * @param {string} run
 * @param {string} description
 * @param {[{}]} [options]
 * @return {{ options: [{}], description: string, run: string }}
 */
const HelpCommand = (run, description, options) => {
  return { run, description, options };
};

module.exports = HelpCommand;