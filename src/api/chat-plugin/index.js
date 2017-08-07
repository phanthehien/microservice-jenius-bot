const Model = require('./models');
const Route = require('./routes');

const internals = {};

internals.applyRoutes = (server, next) => {
  server.route(Route);
  next();
};

exports.register = (server, opts, next) => {
  const model = Model;

  server.ext('onPreHandler', (request, reply) => {
    Object.assign(request.server, { model });
    reply.continue();
  });

  server.dependency([
    'swagger'
  ], internals.applyRoutes);

  return next();
};

exports.register.attributes = {
  name: 'chat'
};
