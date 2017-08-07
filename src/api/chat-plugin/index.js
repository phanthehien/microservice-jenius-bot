const Route = require('./routes');

const internals = {};

internals.applyRoutes = (server, next) => {

  server.route(Route);

  next();
};

exports.register = (server, opts, next) => {

  server.dependency([
    'swagger'
  ], internals.applyRoutes);

  return next();
};

exports.register.attributes = {
  name: 'chat'
};
