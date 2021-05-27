/* eslint-disable indent */

/**
 * @param {string | object} content
 */
const InteractionDataHelper = (content) => {
  let returnedContent;

  switch (typeof content) {
    case 'object':
      returnedContent = {
        content: null,
        embeds: [content]
      };
      break;
    case 'string':
      returnedContent = { content };
      break;
    default:
      returnedContent = { content };
      break;
  }

  return returnedContent;
};

module.exports = InteractionDataHelper;