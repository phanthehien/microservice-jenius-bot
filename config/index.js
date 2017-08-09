const Confidence = require('confidence');
const pkg = require('../package.json');

const config = {
  name: pkg.name,
  description: pkg.description,
  host: process.env.SERVICE_HOST || '0.0.0.0',
  port: process.env.SERVICE_PORT || 3000,
  api: {
    version: pkg.version
  },
  docs: {
    path: '/docs'
  },
  resources: {
    database: {}
  }
};

const store = new Confidence.Store(config);

exports.get = key => store.get(key);
