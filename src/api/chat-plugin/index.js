const Route = require('./routes');

const internals = {};

internals.applyRoutes = (server, next) => {

  server.route(Route);

  next();
};

exports.register = (server, opts, next) => {

  return next();
};

exports.register.attributes = {
  name: 'chat'
};
