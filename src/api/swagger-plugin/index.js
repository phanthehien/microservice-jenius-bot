const inert = require('inert');
const vision = require('vision');
const swagger = require('hapi-swagger');

const pkg = require('../../../package.json');

module.exports.register = (server, opts, next) => {

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
  ];

  server.register(plugins, (err) => {
    if (err) {
      console.error('error loading plugin ', err);
    }
  });

  return next();
};

module.exports.register.attributes = {
  name: 'swagger'
};
