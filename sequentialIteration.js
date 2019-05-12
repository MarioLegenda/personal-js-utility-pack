/**
 * Sequential iteration pattern
 * 
 * This pattern solves the problem of completing async actions in sync way. Better way to explain it 
 * is to say that we call a callback when every action is completed and a finish callback when all 
 * the actions are completed.
 * 
 * We do that by iterating over an array of async actions and calling the action in a recursion. 
 * When all the actions are done, we call the finish() function.
 * 
 * How do we know that an action is done? Every async function has a callback and when that callback is called,
 * we call the next async action in an array. It the same as sync recursion but here, we have to call
 * the recursive function when an async function finishes.
 * 
 * In order to know when the last function has finished, we mark it with the index and length of the 
 * list of actions. 
 */

const tasks = [];

// we build the async function but only pass in function objects, not instances
// they are executed in iterate()
for (let i = 0; i < 10; i++) {
    function timeout(seconds, callback) {
        setTimeout(() => {
            callback(seconds);
        }, seconds * 100);
    }

    tasks.push(timeout);
}

// this is a recursive function as is called after each async function finishes
// that is very important to understand
function iterate(index) {
    if (typeof tasks[index] === 'undefined') return null;

    const task = tasks[index];

    task(index, (val) => {
        // this is how we know that the action is finished or better yet,
        // that this is the last action and that we can finish after it.
        if (index === tasks.length - 1) {
            console.log(`Task ${val} completed`);

            // do not forget that although there is a return statement here,
            // the code resumes execution after task()
            return finish();
        }

        console.log(`Task ${val} completed`);

        iterate(index + 1);
    });
}

function finish() {
    console.log('Finished');
}

iterate(0);