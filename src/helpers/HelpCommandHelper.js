/**
 * @param {string} run
 * @param {string} description
 * @param {[{}]} [options]
 * @param {[{ id: string, type: number, permission: boolean }]} [permissions]
 * @return {{ options: [{}], description: string, run: string, permissions: [{}] }}
 */
const HelpCommand = (run, description, options, permissions) => {
  return { run, description, options, permissions };
};

module.exports = HelpCommand;