const Joi = require('joi');

module.exports = {
  method: 'GET',
  path: '/users/{username}/{token}',
  config: {
    tags: ['api', 'docs', 'user'],
    auth: false,
    description: 'Register API',
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
        username: Joi.string().required(),
        token: Joi.string().required()
        .description('Push notification token')
        .example('9001DJI000001')
      }
    },
    handler(request, reply) {
      const { model } = request.server;
      const { username, token } = request.params;

      return model.user
        .register({ username, token })
        .then(reply);
    }
  }
};
