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
        ownerAccountNumber: Joi.string().example('90010000605').required(),
        partnerAccountNumber: Joi.string().example('00109211151').required(),
        amount: Joi.number().example(30000000).required(),
      })
    },
    handler(request, reply) {
      const { model } = request.server;
      const { ownerAccountNumber, partnerAccountNumber, amount } = request.payload;

      return model.transfer.send({ ownerAccountNumber, partnerAccountNumber, amount })
        .then(reply);
    }
  }
};
