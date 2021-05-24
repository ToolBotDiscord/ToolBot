const { createEmbed, createSuccessEmbed, createWarningEmbed, createCanceledActionEmbed, createErrorEmbed } = require('../helpers/createEmbed');
const db = require('../helpers/database');

module.exports = {
  command: {
    options: ['prefix', 'welcome_channel', 'welcome_message', 'welcome_role', 'logs_channel', 'reset']
  },
  help: {
    run: 'config',
    syntax: '[paramètre] [valeur]',
    name: 'Configuration',
    description: '', //`Permet de configurer les paramètres du serveur.\n\nOptions disponibles : ${module.exports.command.options.map((option) => `\`${option}\``).join(', ')}`,
    hasPerm: 'ADMINISTRATOR'
  },
  /**
   *
   * @param client
   * @param message
   * @param {[]} args
   * @returns {Promise<any>}
   */
  run: async (client, message, args) => {
    const options = module.exports.command.options;
    const setting = args[0];
    const value = args.slice(1).join(' ');
    if (!options.includes(setting)) return message.channel.send(createErrorEmbed('Cette option n\'existe pas.'));

    let embed;
    if (args.length !== 0 && setting !== 'reset') {
      db.query('INSERT INTO config (server_id, setting, value) VALUES (?, ?, ?)', [message.member.guild.id, setting, value]);

      embed = createEmbed({
        title: `Configuration de \`${setting}\``,
        description: 'La valeur a bien été ajoutée à la base de données.\nPour la modifier, ré-exécutez la commande avec une valeur défférente.'
      });
    } else if (setting === 'reset') {
      embed = createWarningEmbed('Cette option effacera **l\'intégralité de la configuration** du serveur !\nÊtes-vous sûr de vouloir effectuer cette action ? **Cette action est __irréversible__.**\n\nL\'action s\'annulera automatiquement au bout des 30 secondes (temps pour choisir la réaction).');

      message.channel.send(embed).then(async (msg) => {
        await msg.react('✅');
        await msg.react('❌');

        const filter = (reaction, user) => ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;

        await msg.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
          .then((collected) => {
            const reaction = collected.first();

            if (reaction.emoji.name === '✅') {
              db.query('DELETE FROM config WHERE server_id = ?', [message.guild.id]);
              msg.delete() && message.channel.send(createSuccessEmbed('La configuration de votre serveur a bien été supprimée.'));
            } else {
              msg.delete() && message.channel.send(createCanceledActionEmbed());
            }
          })
          .catch(() => msg.delete() && message.channel.send(createCanceledActionEmbed('Vous n\'avez pas coché de réaction.')));
      });

      return;
    } else {
      embed = createEmbed({
        title: 'Configuration',
        description: `Options disponibles : ${options.map((option) => `\`${option}\``).join(', ')}`
      });
    }

    await message.channel.send(embed);
  }
};