require('dotenv').config();
const {Client} = require('discord.js');

const client = new Client();

client.on('ready', () => {
  console.log(`Connecté en tant que ${client.user.tag}.`);
});

client.login(process.env.BOT_TOKEN);