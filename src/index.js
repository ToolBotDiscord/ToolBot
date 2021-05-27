require('dotenv').config();
require('moment').locale('fr_FR');
const { Client, Collection, MessageEmbed } = require('discord.js');
const fs = require('fs');
const config = require('./config');
const db = require('./helpers/database');

const client = new Client({
  partials: ['GUILD_MEMBER', 'REACTION', 'MESSAGE'],
  ws: {
    intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_PRESENCES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MEMBERS', 'DIRECT_MESSAGES']
  }
});
// L'export est utilisé pour la fonction `createEmbed` (`helpers/createEmbed.js`) pour le texte et l'URL de l'îcone du footer.
module.exports.client = client;
client.commands = new Collection();

client.on('ready', async () => {
  console.log(`Connecté en tant que ${client.user.tag}.`);

  const guilds = client.guilds.cache.size;
  await client.user.setActivity(`${guilds} serveur${guilds > 1 ? 's' : ''} | ${config.prefix}help`, {
    type: 'WATCHING'
  });
});

client.on('error', (error) => {
  db.query('SELECT value FROM config WHERE setting = ?', ['logs_channel'], async (err, result) => {
    if (err) throw err;

    client.channels.cache.get(result[0].value).send(error, { code: 'js' });
  });

  throw error;
});

client.on('guildMemberAdd', (member) => {
  db.query('SELECT value FROM config WHERE server_id = ? AND setting = ? OR setting = ? OR setting = ?', [member.guild.id, 'welcome_channel', 'welcome_role', 'welcome_message'], async (err, result) => {
    if (err) throw err;

    const welcomeMessage = result[2].value.replaceAll('$member', member).replaceAll('$server', member.guild.name);

    await member.roles.add(result[1].value);
    member.guild.channels.cache.get(result[0].value).send(welcomeMessage);
  });
});

client.on('guildCreate', (guild) => {
  db.query('INSERT INTO config (server_id, setting, value) VALUES (?, ?, ?)', [guild.id, 'prefix', config.prefix]);
});

client.on('guildDelete', (guild) => {
  db.query('DELETE FROM config WHERE server_id = ?', [guild.id]);
});

client.ws.on('INTERACTION_CREATE', async (interaction) => {
  const command = interaction.data.name.toLowerCase();
  const args = interaction.data.options;

  fs.readdir(`${__dirname}/commands`, (error, files) => {
    if (error) throw error;

    files.map((file) => {
      if (!file.endsWith('.js')) return;
      const commandFile = require(`${__dirname}/commands/${file}`);
      const commandName = file.replace('.js', '');
      const commandRun = commandFile.run;

      if (command === commandName) {
        client.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: 4,
            data: commandRun(client, interaction, args)
          }
        });
      }

      // if (commandFile.help.permissions) {
      //   client.api.applications(client.user.id).guilds('809493987546759209').commands(interaction.data.id).permissions.put(
      //     JSON.stringify({
      //       permissions: commandFile.help.permissions
      //     })
      //   );
      // }
    });
  });
});

client.login(process.env.BOT_TOKEN);