/**
 * Custom Errors for us to use in our application
 * @param {*} statusCode HTTP Status Codes
 * @param {*} params typical Error parameters (including Error.message)
 *
 * Credit: `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types`
 */
class CustomError extends Error {
  constructor(statusCode = 500, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.name = 'CustomError';
    // Custom debugging information
    this.statusCode = statusCode;
    this.date = new Date();
  }
}

module.exports = CustomError;
