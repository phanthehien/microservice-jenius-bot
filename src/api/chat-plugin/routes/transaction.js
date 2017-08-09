const Joi = require('joi');

module.exports = {
  method: 'POST',
  path: '/actions/show-transaction',
  config: {
    tags: ['api', 'docs', 'transaction'],
    auth: false,
    description: 'Show Transaction API',
    notes: 'Performs a transaction history operation',
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
