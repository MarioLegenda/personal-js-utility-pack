const is = require('../misc/is');
const iterate = require('./iterate');

module.exports = function (tasks, onTaskDone, onComplete) {
  if (!is("array", tasks)) throw new TypeError(`inSequence() invalid argument: first argument must be an array of functions`);
  if (!is("function", onTaskDone)) throw new TypeError(`inSequence() invalid argument: second argument must be a function`);
  if (!is("function", onComplete)) throw new TypeError(`inSequence() invalid argument: third argument must be a function`);

  for (const task of tasks) {
    if (!is("function", task)) throw new TypeError(`isSequence() invalid argument: first argument must be an array of functions`);
  }

  if (tasks.length === 0) return this;

  (function(index) {
    function iterator(val) {
      onTaskDone("undefined", val);

      if (index === tasks.length - 1) {
        return onComplete("undefined");
      }

      iterate(++index, tasks, iterator);
    }

    iterate(index, tasks, iterator);
  })(0);

  return this;
};