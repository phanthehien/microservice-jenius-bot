const Joi = require('joi');

module.exports = {
  method: 'POST',
  path: '/actions/transfer-money',
  config: {
    tags: ['api', 'docs', 'transfer'],
    auth: false,
    description: 'Transfer Money API',
    notes: 'Performs a sending money to friend operation',
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
        message: Joi.string().required()
      })
    },
    handler(request, reply) {
      const { model } = request.server;
      const { message } = request.payload;

      return model.send(message)
        .then(reply);
    }
  }
};