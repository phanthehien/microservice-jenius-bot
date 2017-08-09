const Joi = require('joi');

module.exports = {
  method: 'POST',
  path: '/actions/show-balance',
  config: {
    tags: ['api', 'docs', 'balance'],
    auth: false,
    description: 'Show Balance API',
    notes: 'Performs a checking active balance operation',
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
