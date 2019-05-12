const tasks = [];

for (let i = 0; i < 20; i++) {
    function timeout(seconds, callback) {
        setTimeout(() => {
            callback();
        }, 0 * 100);
    }

    tasks.push(timeout);
}

/**
 * 'spawned' is the current number of spawned tasks and it gets reset after it reaches the spawn limit
 * 'index' is the current index of the task
 * 'completed' is the current number of completed tasks
 * 
 * spawn() receives the spawn limit that represents the maximum number of tasks that can be spawn in 
 * a batch of operations. So, one batch of operations can have up to spawn limit
 * k = batch of operations
 * l = spawn limit
 * n = number of operations
 * 
 * n <= l = k
 * 
 * The process is repeated in a recursion. After one batch of operations completes, another one is spawned 
 * up until there are no operations to spawn.
 * 
 * It is very important to understand that the decision to spawn new processes must be in the 
 * async callback since that is the only place we can know did a batch of operations finish or not.
 * 
 * It is also very important to understand that 'completed' and 'index' are in sync. Since the async
 * callback decides to spawn another batch of operations, index 'holds' still until async callback
 * calls the spawn() function again recursively.
 * 
 * A good idea that this actually works is to put the number of seconds to 0 (zero).
 */

let spawned = 0,
    index = 0,
    completed = 0;
function spawn(spawnLimit) {
    // iterated while the number of spawned processes is less than the spawn limit
    // and we still have processes to spawn. The second condition cannot be omitted but
    // that condition cannot be put outside the loop because the spawn() function finishes
    // faster than the async operation
    while (spawned < spawnLimit && index < tasks.length) {
        const task = tasks[index];
        ++spawned;
        // this function is recursive so index gets incremented only when the next
        // batch of async operations is ready for processing. The processing is done
        // inside the async function
        ++index;

        task(index, () => {
            console.log(`Task ${completed} completed`);

            ++completed;

            // if all operations are completed, no need to go further since while() loop
            // was not executed because of index < tasks.length condition. Actually, no 
            // need for return but it is better to put it here for additional safety
            if (completed === tasks.length) return finish();

            // 'completed' and 'index' are in sync. 'spawned' is reset
            // in order for the loop to know how many operations has it currently spawned.
            if (completed === index) {
                spawned = 0;

                return spawn(spawnLimit);
            }
        });

        // all tasks are spawned so we notifiy it. Mind you that there are still
        // operations in progress so this function always has be run before all 
        // operations are finished.
        if (index === tasks.length) return done();
    }
}

function done() {
    console.log('All tasks spawned');
}

function finish() {
    console.log('All tasks completed');
}

spawn(5);