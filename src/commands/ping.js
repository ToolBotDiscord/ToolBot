module.exports = {
  help: {
    name: 'Ping',
    description: 'Latence du bot.'
  },
  run: (client, message) => {
    const now = Date.now();
    message.channel.send(`🏓 **Pong !** Ma latence est de ${Date.now() - now}ms.`);
  }
};