const BaseError = require('./BaseError');

class NotFoundError extends BaseError {

  constructor(message, code, statusCode) {
    // We explicitly forbid any attempt to override the code or status code.
    if (code !== undefined) throw new Error('Cannot set the \'code\' for an InvalidOperationError.');
    if (statusCode !== undefined) throw new Error('Cannot set the \'statusCode\' for an InvalidOperationError.');

    // Create the error, always using our Jenius Error Code and the appropriate
    // HTTP status code.
    super(message || 'Not Found', 'NOT_FOUND', 404);
  }
}

module.exports = NotFoundError;
