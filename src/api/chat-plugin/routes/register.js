const Joi = require('joi');

module.exports = {
  method: 'POST',
  path: '/users/{username}',
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
        username: Joi.string().required()
      },
      payload: Joi.object().keys({
        token: Joi.string().required()
          .description('Push notification token')
          .example('9001DJI000001')
      }).label('Token payload')
    },
    handler(request, reply) {
      const { model } = request.server;
      const { username } = request.params;
      const { token } = request.payload;

      return model.user
        .query({ username })
        .then(reply);
    }
  }
};
