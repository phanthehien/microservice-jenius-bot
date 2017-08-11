const hapi = require('hapi');

const Config = require('../config');
const database = require('../asset/test-data.json');

const swaggerPlugin = require('./api/swagger-plugin');
const { errorPlugin } = require('./api/error-plugin');
const chatPlugin = require('./api/chat-plugin');

const server = new hapi.Server();

server.connection([
  {
    host: Config.get('/host'),
    port: Config.get('/port'),
    routes: { cors: true },
    labels: ['api', 'docs', 'chat']
  }
]);

const plugins = [
  {
    register: swaggerPlugin,
    select: ['api', 'docs'],
    options: {
      config: Config.get('/')
    }
  },
  {
    register: errorPlugin,
  },
  {
    register: chatPlugin,
    select: ['api', 'docs', 'chat'],
    options: {
      database
    }
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
