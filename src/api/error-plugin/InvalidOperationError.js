const BaseError = require('./BaseError');

class InvalidOperationError extends BaseError {

  constructor(message, code, statusCode) {
    // We explicitly forbid any attempt to override the code or status code.
    if (code !== undefined) throw new Error('Cannot set the \'code\' for an InvalidOperationError.');
    if (statusCode !== undefined) throw new Error('Cannot set the \'statusCode\' for an InvalidOperationError.');

    // Create the error, always using our Jenius Error Code and the appropriate
    // HTTP status code.
    super(message || 'Invalid Operation', 'INVALID_OPERATION', 500);
  }
}

module.exports = InvalidOperationError;
