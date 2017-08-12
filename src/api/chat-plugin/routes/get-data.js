const Joi = require('joi');

module.exports = {
  method: 'GET',
  path: '/storage/get-data/{id}',
  config: {
    tags: ['api', 'docs', 'data'],
    auth: false,
    description: 'Show Data API',
    notes: 'Performs a retrieving data operation',
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
        id: Joi.number().required()
      }
    },
    handler(request, reply) {
      const { model } = request.server;
      const { id } = request.params;

      return reply(model.storage[id]);
    }
  }
};
