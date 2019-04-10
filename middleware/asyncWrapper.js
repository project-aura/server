/**
 * Wrapper middleware for async functions. Allows async function to exist without try/catch blocks.
 * @param {Function} fn Async function to be wrapped
 *
 * Credit: `https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016`
 */
const asyncWrapper = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncWrapper;
