const is = require('../misc/is');
const sequenceQueue = require('./sequenceQueue');

function realSpawn(metadata) {
  let {limit, tasks, onTaskDone, onQueueFinished, onError, completed} = metadata;

    if (!onError) {
      onError = null;
    }

    const sequenceOptions = {
      tasks: tasks.slice((completed) ? completed + 1 : completed, limit + completed + 1),
      onComplete: () => {
        completed += limit;

        if (onQueueFinished) {
          if (completed === tasks.length && onQueueFinished) return onQueueFinished();
        }

        return realSpawn({...metadata, ...{completed: completed}});
      },
    };

    if (onTaskDone) {
      sequenceOptions.onTaskDone = (...rest) => {
        onTaskDone(...[rest]);
      };
    }

    sequenceQueue(sequenceOptions);
}

function validate(metadata) {
    const {limit, tasks, onTaskDone, onQueueDepleted, onQueueFinished, onError} = metadata;

    if (!Number.isInteger(limit)) throw new Error(`limitedSequentialQueue() invalid argument. limit should be an integer`);
    if (!Array.isArray(tasks)) throw new Error(`limitedSequentialQueue() invalid argument. tasks should be an integer`);

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

    realSpawn({...metadata, ...{completed: 0}});
}