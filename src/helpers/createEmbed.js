const { client } = require('../index');
const moment = require('moment');

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
 *   },
 *   thumbnail?: string,
 *   timestamp?: Date | number
 * }} options
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

  return {
    author: {
      author: author.author || '',
      iconURL: author.iconURL || ''
    },
    title: options.title,
    description: options.description,
    fields,
    footer: {
      text: footer.text || client.user.username,
      iconURL: footer.iconURL || client.user.avatarURL()
    },
    thumbnail: options.thumbnail,
    timestamp: moment(Date.now()).toISOString() || options.timestamp
  };
};

/**
 * @param {string} error
 */
const createErrorEmbed = (error) => {
  return createEmbed({
    title: '❌ Erreur',
    description: `Désolé, une erreur est survenue. ${error}`
  });
};

/**
 * @param {string} error
 */
const createJsErrorEmbed = (error) => {
  return createErrorEmbed(`Voici les détails : \`\`\`js\n${error}\n\`\`\``);
};

/**
 * @param {string} message
 */
const createCanceledActionEmbed = (message = '') => {
  return createEmbed({
    title: '❌ Action annulée',
    description: `L'action a bien été annulée. ${message}`
  });
};

/**
 * @param {string} message
 */
const createSuccessEmbed = (message) => {
  return createEmbed({
    title: '✅ Succès !',
    description: message
  });
};

/**
 * @param {string} message
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