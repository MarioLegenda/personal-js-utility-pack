const is = require('../misc/is');
const loopGenerator = require('../misc/loopGenerator');

function spawn(metadata) {
    let {
      tasks, 
      onTaskDone,
      onQueueDepleted,
      onQueueFinished,
      onError,
      completed,
      spawned,
    } = metadata;

    const gen = loopGenerator(tasks);

    let task;
    while(!(task = gen.next()).done) {
        const promise = task.value();

        promise.then((...rest) => {
            ++completed;
  
            if (onTaskDone) onTaskDone(...[rest, {completed: completed}]);
            // if all operations are completed, no need to go further since while() loop
            // was not executed because of index < tasks.length condition. Actually, no
            // need for return but it is better to put it here for additional safety
            if (completed === tasks.length && onQueueFinished) return onQueueFinished();
        });

        if (onError) promise.catch(onError);

        ++spawned;

        // all tasks are spawned so we notifiy it. Mind you that there are still
        // operations in progress so this function always has be run before all
        // operations are finished.
        if (spawned === tasks.length && onQueueDepleted) return onQueueDepleted({
          completed: completed,
          remaining: tasks.length - completed,
        });
    }
}

function validate(metadata) {
    const {tasks, onTaskDone, onQueueDepleted, onQueueFinished, onError} = metadata;

    if (!Array.isArray(tasks)) throw new Error(`batchQueue() invalid argument. tasks should be an array`);

    if (onTaskDone) {
      if (!is('function', onTaskDone)) throw new Error(`batchQueue() invalid argument. onTaskDone should be a function`);
    } else metadata.taskDone = null;

    if (onQueueDepleted) {
      if (!is('function', onQueueDepleted)) throw new Error(`batchQueue() invalid argument. onQueueDepleted should be a function`);
    } else metadata.onQueueDepleted = null;

    if (onQueueFinished) {
      if (!is('function', onQueueFinished)) throw new Error(`batchQueue() invalid argument. onQueueFinished should be a function`);
    } else metadata.onQueueFinished = null;
    
    if (onError) {
      if (!is('function', onError)) throw new Error(`batchQueue() invalid argument. onError should be a function`);
    } else metadata.onError = null;
}

module.exports = function (metadata) {
    validate(metadata);

    spawn({...metadata, ...{
      completed: 0,
      spawned: 0,
    }});
}