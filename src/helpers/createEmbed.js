const { MessageEmbed } = require('discord.js');
const { client } = require('../index');

/**
 * @param {{
 *   author?: {
 *     author: string,
 *     iconURL?: string
 *   },
 *   title: string,
 *   description?: string,
 *   fields?: any,
 *   footer?: {
 *     text: string,
 *     iconURL?: string
 *   }
 *   timestamp?: Date | number
 * }} options
 * @returns {module:"discord.js".MessageEmbed}
 */
const createEmbed = (options) => {
  const author = options.author && {
    author: options.author.author,
    iconURL: options.author.iconURL
  } || { name: null, iconURL: null };
  const fields = options.fields && options.fields || [];
  const footer = options.footer && {
    text: options.footer.text,
    iconURL: options.footer.iconURL
  } || { name: null, iconURL: null };

  if (typeof options.title === 'undefined') throw new Error('The embed title is not defined.');

  return new MessageEmbed()
    .setAuthor(author.author || '', author.iconURL || '')
    .setTitle(options.title)
    .setDescription(options.description && options.description || '')
    .addFields(fields)
    .setFooter(footer.text || client.user.username, footer.iconURL || client.user.avatarURL())
    .setTimestamp(options.timestamp || Date.now())
  ;
};

/**
 * @param {string} error
 * @returns {module:"discord.js".MessageEmbed}
 */
const createErrorEmbed = (error) => {
  return createEmbed({
    title: '❌ Erreur',
    description: `Désolé, une erreur est survenue. ${error}`
  });
};

/**
 * @param {string} error
 * @returns {module:"discord.js".MessageEmbed}
 */
const createJsErrorEmbed = (error) => {
  return createErrorEmbed(`Voici les détails : \`\`\`js\n${error}\n\`\`\``);
};

/**
 * @param {string} message
 * @returns {module:"discord.js".MessageEmbed}
 */
const createCanceledActionEmbed = (message = '') => {
  return createEmbed({
    title: '❌ Action annulée',
    description: `L'action a bien été annulée. ${message}`
  });
};

/**
 * @param {string} message
 * @returns {module:"discord.js".MessageEmbed}
 */
const createSuccessEmbed = (message) => {
  return createEmbed({
    title: '✅ Succès !',
    description: message
  });
};

/**
 * @param {string} message
 * @returns {module:"discord.js".MessageEmbed}
 */
const createWarningEmbed = (message) => {
  return createEmbed({
    title: '⚠ Attention !',
    description: message
  });
};

module.exports = {
  createEmbed,
  createErrorEmbed,
  createJsErrorEmbed,
  createSuccessEmbed,
  createWarningEmbed,
  createCanceledActionEmbed
};