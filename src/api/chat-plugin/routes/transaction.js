const Joi = require('joi');

module.exports = {
  method: 'GET',
  path: '/transaction/{transactionId}',
  config: {
    tags: ['api', 'docs', 'transaction'],
    auth: false,
    description: 'Show Transaction API',
    notes: 'Performs a transaction operation',
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
        transactionId: Joi.string().required()
      }
    },
    handler(request, reply) {
      const { model } = request.server;
      const { transactionId } = request.params;

      return model.transaction
        .query({ transactionId })
        .then(reply);
    }
  }
};
