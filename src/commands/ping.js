module.exports = {
  options: {
    run: 'ping',
    name: 'Ping',
    description: ''
  },
  run: (client, message) => {
    message.channel.send('pong');
  }
};