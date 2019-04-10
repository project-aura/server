/**
 * Global error handling for any request that passes through our server.
 * @param {Error} err Error object to be handled
 * @param {Object} req Incoming request
 * @param {Object} res Outgoing response
 * @param {Function} next next function in pipeline
 * @returns Error response
 */
const errorHandler = function(err, req, res, next) {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json({ message: err.message });
};

module.exports = errorHandler;
