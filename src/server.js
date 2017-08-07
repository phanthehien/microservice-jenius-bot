const hapi = require('hapi');
const inert = require('inert');
const vision = require('vision');
const swagger = require('hapi-swagger');

const pkg = require('../package.json');
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
    register: inert,
    select: ['docs']
  },
  {
    register: vision,
    select: ['docs']
  },
  {
    register: swagger,
    select: ['docs'],
    cache: { expiresIn: 24 * 60 * 60 * 1000 },
    options: {
      info: {
        title: pkg.description,
        version: pkg.version
      },
      documentationPath: '/docs'
    }
  },
  {
    register: chatPlugin,
    select: ['api', 'docs', 'chat'],
  }
];

server.register(plugins, (err) => {
  if (err) { console.error('error loading plugin ', err); }
});

// Export the server. If you are running unit tests, just require it and
// call 'inject'. If you are running integration tests or want to start the
// server, you'll need to call 'start'. See index.js.
module.exports = server;
