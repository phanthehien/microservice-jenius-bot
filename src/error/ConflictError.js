const JeniusError = require('./JeniusError');

class ConflictError extends JeniusError {

  constructor(message, code, statusCode) {
    // We explictly forbid any attempt to override status code.
    if (statusCode !== undefined) throw new Error('Cannot set the \'statusCode\' for a ConflictError.');
    if (code !== undefined) throw new Error('Cannot set the \'code\' for an ConflictError.');

    // Create the error, always using our Jenius Error Code and the appropriate
    // HTTP status code.
    super(message || 'Conflict', 'CONFLICT', 409);
  }
}

module.exports = ConflictError;
