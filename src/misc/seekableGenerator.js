module.exports = function*(tasks) {
    let index = yield null;

    yield tasks[index];
}