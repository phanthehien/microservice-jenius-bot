const JeniusError = require('./JeniusError');

class UnauthorizedError extends JeniusError {

  constructor(message, code, statusCode) {
    // We explictly forbid any attempt to override the code or status code.
    if (code !== undefined) throw new Error('Cannot set the \'code\' for an UnauthorizedError.');
    if (statusCode !== undefined) throw new Error('Cannot set the \'statusCode\' for an UnauthorizedError.');

    // Create the error, always using our Jenius Error Code and the appropriate
    // HTTP status code.
    super(message || 'Unauthorized', 'UNAUTHORIZED', 401);
  }
}

module.exports = UnauthorizedError;
