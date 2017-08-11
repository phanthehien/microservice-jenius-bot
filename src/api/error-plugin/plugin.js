const BaseError = require('./errors/BaseError');

// Main plugin registration function.
module.exports.register = function (server, options, next) {
  server.ext('onPreResponse', (request, reply) => {
    // NOTE: I cannot find this documented anywhere, but Hapi will put the
    // error thrown in the request domain into the 'request.response' field.
    // We can use this to see if we have got a BaseError.
    const res = request.response;
    if (res instanceof BaseError) {
      request.log(['error'], res.payload);
      return reply(res.render());
    }

    return reply.continue();
  });

  next();
};

// Export the plugin metadata.
exports.register.attributes = {
  name: 'error'
};
