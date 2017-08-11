const Joi = require('joi');

module.exports = {
  method: 'GET',
  path: '/users/{username}',
  config: {
    tags: ['api', 'docs', 'user'],
    auth: false,
    description: 'Show User API',
    notes: 'Performs a user operation',
    plugins: {
      'hapi-swagger': {
        responses: {
          200: { description: 'Success' },
          400: { description: 'Bad Request' },
          500: { description: 'Internal Error' }
        }
      }
    },
    validate: {
      params: {
        username: Joi.string().required()
      }
    },
    handler(request, reply) {
      const { model } = request.server;
      const { username } = request.params;

      return model.user
        .query({ username })
        .then(reply);
    }
  }
};
