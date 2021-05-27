/**
 * @param {string} name
 * @param {string} description
 * @param {[{}]} [options]
 * @param {[{ id: string, type: number, permission: boolean }]} [permissions]
 * @return {{ options: [{}], description: string, name: string, permissions: [{}] }}
 */
const HelpCommand = (name, description, options, permissions) => {
  return { name, description, options, permissions };
};

module.exports = HelpCommand;