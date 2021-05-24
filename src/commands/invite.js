const { createEmbed } = require('../helpers/createEmbed');

module.exports = {
  help: {
    run: 'invite',
    name: 'Inviter le bot',
    description: 'Inviter le bot.'
  },
  run: async (client, message) => {
    const embed = createEmbed({
      title: 'Inviter le bot',
      description: `Pour inviter le bot, vous pouvez utiliser [ce lien](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot). Merci d'utiliser le bot ❤ !`
    });

    await message.channel.send(embed);
  }
};