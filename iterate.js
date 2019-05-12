// this is a recursive function as is called after each async function finishes
// that is very important to understand
function iterate(index) {
    if (index === tasks.length)
        return null;
    const task = tasks[index];
    task(index, (val) => {
        // this is how we know that the action is finished or better yet,
        // that this is the last action and that we can finish after it.
        console.log(`Task ${val} completed`);
        if (index === tasks.length - 1) {
            // do not forget that although there is a return statement here,
            // the code resumes execution after task()
            return finish();
        }
        iterate(index + 1);
    });
}
