require('dotenv').config();
const { Client, Collection } = require('discord.js');
const fs = require('fs');
const config = require('./config');

const client = new Client();
client.commands = new Collection();

client.on('ready', () => {
  console.log(`Connecté en tant que ${client.user.tag}.`);
});

fs.readdir(`${__dirname}/commands`, (error, files) => {
  if (error) throw error;

  files.map((file) => {
    if (!file.endsWith('.js')) return;
    const command = require(`${__dirname}/commands/${file}`);

    client.commands.set(command.options.run, command);
  });
});

client.on('message', (message) => {
  if (message.type !== 'DEFAULT' || message.author.bot) return;

  const args = message.content.trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();

  if (!commandName.startsWith(config.prefix)) return;

  const command = client.commands.get(commandName.slice(config.prefix.length));
  if (!command) return;
  command.run(client, message, args);
});

client.login(process.env.BOT_TOKEN);