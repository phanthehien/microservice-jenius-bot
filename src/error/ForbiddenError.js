const JeniusError = require('./JeniusError');

class ForbiddenError extends JeniusError {

  constructor(message, code, statusCode) {
    // We explictly forbid any attempt to override status code.
    if (statusCode !== undefined) throw new Error('Cannot set the \'statusCode\' for an ForbiddenError.');
    if (code !== undefined) throw new Error('Cannot set the \'code\' for an ForbiddenError.');

    // Create the error, always using our Jenius Error Code and the appropriate
    // HTTP status code.
    super(message || 'Forbidden', 'FORBIDDEN', 403);
  }
}

module.exports = ForbiddenError;
