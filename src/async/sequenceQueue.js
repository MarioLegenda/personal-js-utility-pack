const is = require('../misc/is');
const loopGenerator = require('../misc/loopGenerator');

function validate(tasks, onTaskDone, onComplete, onError) {

  if (!is("array", tasks)) throw new TypeError(`sequence() invalid argument: tasks argument must be an array of functions`);

  if (onTaskDone) {
    if (!is("function", onTaskDone)) throw new TypeError(`squence() invalid argument: onTaskDone argument must be a function`);
  }

  if (onComplete) {
    if (!is("function", onComplete)) throw new TypeError(`sequence() invalid argument: onComplete argument must be a function`);
  }

  if (onError) {
    if (!is("function", onError)) throw new TypeError(`sequence() invalid argument: onError argument must be a function`);
  }

  for (const task of tasks) {
    if (!is("function", task)) throw new TypeError(`sequence() invalid argument: tasks argument must be an array of functions`);
  }
}

module.exports = function (metadata) {
  const {tasks, onTaskDone, onComplete, onError} = metadata;

  validate(tasks, onTaskDone, onComplete, onError);

  if (tasks.length === 0) return this;

  const gen = loopGenerator(tasks);
  // init the seekable generator

  function handler(promise) {
    promise.then((...rest) => {
      if (onTaskDone) onTaskDone(...[rest]);

      const yielded = gen.next();

      if (!yielded.done) {
        const promise = yielded.value();

        return handler(promise);
      }

      if (yielded.done) {
        if (onComplete) return onComplete();
      }

    });

    if (onError) promise.catch(onError);
  }

  handler(gen.next().value());

  return this;
};