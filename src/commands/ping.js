module.exports = {
  help: {
    name: 'Ping',
    description: ''
  },
  run: (client, message) => {
    const now = Date.now();
    message.channel.send(`🏓 **Pong !** Ma latence est de ${Date.now() - now}ms.`);
  }
};