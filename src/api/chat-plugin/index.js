const Model = require('./models');
const Routes = require('./routes');

const internals = {};

internals.applyRoutes = (server, next) => {
  server.route(Routes);
  next();
};

exports.register = (server, opts, next) => {
  const { database } = opts;
  const model = new Model(database);

  server.ext('onPreHandler', (request, reply) => {
    Object.assign(request.server, { model });
    reply.continue();
  });

  server.dependency([
    'swagger', 'error'
  ], internals.applyRoutes);

  return next();
};

exports.register.attributes = {
  name: 'chat'
};
