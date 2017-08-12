const Joi = require('joi');

module.exports = {
  method: 'POST',
  path: '/storage/save-data',
  config: {
    tags: ['api', 'docs', 'save'],
    auth: false,
    description: 'Save Data API',
    notes: 'Performs a storing data operation',
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
      payload: Joi.object().keys({
        id: Joi.number().required(),
        data: Joi.object().required()
      })
    },
    handler(request, reply) {
      const { model } = request.server;
      const { id, data } = request.payload;

      model.storage[id] = data;
      return reply(model.storage[id]);
    }
  }
};
