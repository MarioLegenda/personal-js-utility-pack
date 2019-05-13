const is = require('./../misc/is');

function realSpawn(limit, tasks, onTaskDone, onQueueDepleted, onQueueFinished, onError, options) {
    let {spawned, index, completed} = options;

    while (spawned < limit && index < tasks.length) {
      const task = tasks[index];

      ++spawned;
      // this function is recursive so index gets incremented only when the next
      // batch of async operations is ready for processing. The processing is done
      // inside the async function
      ++index;

      const promise = task().then((...rest) => {
          ++completed;

          if (onTaskDone) onTaskDone(...[rest, {completed: completed}]);
          // if all operations are completed, no need to go further since while() loop
          // was not executed because of index < tasks.length condition. Actually, no
          // need for return but it is better to put it here for additional safety
          if (completed === tasks.length && onQueueFinished) return onQueueFinished();
              // 'completed' and 'index' are in sync. 'spawned' is reset
              // in order for the loop to know how many operations has it currently spawned.
          if (completed === index) {
              spawned = 0;

              return realSpawn(limit, tasks, onTaskDone, onQueueDepleted, onQueueFinished, onError, {
                  spawned: spawned,
                  index: index,
                  completed: completed,
              });
          }
      });

      if (onError) promise.catch(onError);

      // all tasks are spawned so we notifiy it. Mind you that there are still
      // operations in progress so this function always has be run before all
      // operations are finished.
      if (index === tasks.length && onQueueDepleted) return onQueueDepleted({
        completed: completed,
        remaining: tasks.length - completed,
      });
    }
}

function validate(metadata) {
    const {limit, tasks, onTaskDone, onQueueDepleted, onQueueFinished, onError} = metadata;

    if (!is('integer', limit)) throw new Error(`limitedSequentialQueue() invalid argument. limit should be an integer`);
    if (!is('array', tasks)) throw new Error(`limitedSequentialQueue() invalid argument. tasks should be an integer`);

    if (onTaskDone) {
      if (!is('function', onTaskDone)) throw new Error(`limitedSequentialQueue() invalid argument. onTaskDone should be a function`);
    } else metadata.taskDone = null;

    if (onQueueDepleted) {
      if (!is('function', onQueueDepleted)) throw new Error(`limitedSequentialQueue() invalid argument. onQueueDepleted should be a function`);
    } else metadata.onQueueDepleted = null;

    if (onQueueFinished) {
      if (!is('function', onQueueFinished)) throw new Error(`limitedSequentialQueue() invalid argument. onQueueFinished should be a function`);
    } else metadata.onQueueFinished = null;
    
    if (onError) {
      if (!is('function', onError)) throw new Error(`limitedSequentialQueue() invalid argument. onError should be a function`);
    } else metadata.onError = null;
}

module.exports = function (metadata) {
    validate(metadata);

    const {limit, tasks, onTaskDone, onQueueDepleted, onQueueFinished, onError} = metadata;

    realSpawn(limit, tasks, onTaskDone, onQueueDepleted, onQueueFinished, onError, {
        spawned: 0,
        index: 0,
        completed: 0,
    });
}