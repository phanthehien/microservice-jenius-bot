const Joi = require('joi');

module.exports = {
  method: 'GET',
  path: '/authorize/{username}/{redirect_uri}',
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
        redirect_uri: Joi.string().required()
      }
    },
    handler(request, reply) {
      const { model } = request.server;
      const { username, redirect_uri, account_linking_token } = request.params;

      return model.user
        .authorize({ username })
        .then((authorizationCode) => {
          const url = `${redirect_uri}&authorization_code=${authorizationCode}`;
          // console.log('URL =', url);
          reply.redirect(url);
        });
    }
  }
};
