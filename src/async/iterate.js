const is = require('../misc/is');

/**
 * Recursive iteration
 * 
 * Should only be used for recursion. The client code determines if it is going to call this function
 * or not. 'index' should be incremented from client code
 */

module.exports = function (index, tasks, handler) {
  if (!is('integer', index)) throw new Error('iterate() invalid argument. First argument must be an integer');
  if (!is('array', tasks)) throw new Error('iterate() invalid argument. Second argument must be an integer');
  if (!is('function', handler)) throw new Error('iterate() invalid argument. Third argument must be a function');

  if (index < tasks.length) tasks[index](handler);
};