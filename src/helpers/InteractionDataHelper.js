const { MessageEmbed } = require('discord.js');

/* eslint-disable indent */

/**
 * @param {string | MessageEmbed} content
 */
const InteractionDataHelper = (content) => {
  let returnedContent;

  switch (typeof content) {
    case MessageEmbed:
      returnedContent = {
        embeds: content
      };
      break;
    case 'string':
      returnedContent = { content };
      break;
  }

  return returnedContent;
};

module.exports = InteractionDataHelper;