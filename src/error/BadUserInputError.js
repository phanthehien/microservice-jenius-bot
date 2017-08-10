const JeniusError = require('./JeniusError');

class BadUserInputError extends JeniusError {

  constructor(message, code, statusCode) {
    // We explictly forbid any attempt to override status code.
    if (statusCode !== undefined) throw new Error('Cannot set the \'statusCode\' for an BadUserInputError.');

    // Create the error, always using our Jenius Error Code and the appropriate
    // HTTP status code.
    super(message || 'Bad User Input', code || 'BAD_USER_INPUT', 400);
  }
}

module.exports = BadUserInputError;
