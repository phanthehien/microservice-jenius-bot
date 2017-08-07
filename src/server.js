const hapi = require('hapi');

const swaggerPlugin = require('./api/swagger-plugin');
const chatPlugin = require('./api/chat-plugin');

const server = new hapi.Server();

server.connection([
  {
    host: '0.0.0.0',
    port: 3000,
    routes: { cors: true },
    labels: ['api', 'docs', 'upload']
  }
]);

const plugins = [
  {
    register: swaggerPlugin,
    select: ['api', 'docs'],
  },
  {
    register: chatPlugin,
    select: ['api', 'docs', 'chat'],
  }
];

server.register(plugins, (err) => {
  if (err) {
    console.error('error loading plugin ', err);
  }
});

// Export the server. If you are running unit tests, just require it and
// call 'inject'. If you are running integration tests or want to start the
// server, you'll need to call 'start'. See index.js.
module.exports = server;
