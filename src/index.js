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
  db.query('INSERT INTO config (server_id, setting, value) VALUES (?, ?, ?)', [guild.id, 'prefix', 'value']);
});

client.on('guildDelete', (guild) => {
  db.query('DELETE FROM config WHERE server_id = ?', [guild.id]);
});

fs.readdir(`${__dirname}/commands`, (error, files) => {
  if (error) throw error;

  files.map((file) => {
    if (!file.endsWith('.js')) return;
    const command = require(`${__dirname}/commands/${file}`);
    const commandName = file.replace('.js', '');

    client.commands.set(commandName, command);
  });
});

client.on('message', async (message) => {
  if (message.type !== 'DEFAULT' || message.author.bot) return;
  if (!message.guild) return message.channel.send('Désolé, je ne peux pas répondre aux messages privés.');

  const args = message.content.trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();

  if (!commandName.startsWith(config.prefix)) return;

  const command = client.commands.get(commandName.slice(config.prefix.length));
  if (!command) return;

  const commandPerm = command.help.hasPerm;
  if (!message.member.hasPermission(commandPerm)) {
    await message.channel.send(
      // `createEmbed` n'est pas utilisé car la variable `client` (de ce fichier) est importé ce qui crée une boucle.
      new MessageEmbed()
        .setTitle('Permissions insuffisantes')
        .setDescription(`Vous devez avoir la permission \`${commandPerm}\` pour exécuter cette commande.`)
        .setFooter(client.user.username, client.user.avatarURL())
        .setTimestamp()
    );
  } else command.run(client, message, args);

  await message.delete();
});

client.login(process.env.BOT_TOKEN);