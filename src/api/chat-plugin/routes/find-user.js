const Joi = require('joi');

module.exports = {
  method: 'GET',
  path: '/users',
  config: {
    tags: ['api', 'docs', 'user'],
    auth: false,
    description: 'Find User API',
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
      query: {
        firstName: Joi.string().required()
      }
    },
    handler(request, reply) {
      const { model } = request.server;
      const { firstName } = request.query;

      return model.user
        .find({ firstName })
        .then(reply);
    }
  }
};
