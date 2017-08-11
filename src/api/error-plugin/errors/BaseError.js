// BaseError.js
//
// Exports the BaseError class.
const Boom = require('boom');
const ExtendableError = require('es6-error');

// The BaseError is the base class for all errors which will get special
// treatment in the Hapi.js pipeline.
class BaseError extends ExtendableError {

  // All Jenius Errors have a message an a code. The code is set to specific
  // values in base classes only.
  constructor(message, code = 'ERROR', statusCode = 500) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
  }

  // Render the error message for response to the user.
  render() {
    // Create our baseline Boom object.
    const boomError = Boom.create(this.statusCode, this.message);
    boomError.output.payload.code = this.code;

    // Note that for 500 specifically, Boom will always overwrite our message
    // with 'Internal Server Error'. Let it blat the message for now, but if
    // we decide we don't like that, uncomment the line below. For now I want
    // to maintain parity with Boom behaviour.
    // boomError.output.payload.message = this.message;

    return boomError;
  }
}

module.exports = BaseError;
