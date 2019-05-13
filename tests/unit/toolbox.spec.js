const mocha = require('mocha');
const chai = require('chai');
const toolbox = require('../../src/toolbox');
const urlService = require('url');
const requestPromise = require('request-promise-native');

const it = mocha.it;
const describe = mocha.describe;
const expect = chai.expect;

describe('testing all misc functions # ', () => {
    it('is() function should pass all checks', () => {
        const boolTrue = true;
        const boolFalse = false;
        const string = 'string';
        const number = 1;
        const float = 1.1;
        const stringObj = new String('mile');
        const boolObject = new Boolean(true);
        const array = [];
        const obj = {};
        const objectInst = new Object();
        const func = new Function();
        const nan = NaN;

        expect(toolbox.misc.is('boolean', boolTrue)).to.be.true;
        expect(toolbox.misc.is('boolean', boolFalse)).to.be.true;
        expect(toolbox.misc.is('string', string)).to.be.true;
        expect(toolbox.misc.is('integer', number)).to.be.true;
        expect(toolbox.misc.is('float', float)).to.be.true;
        expect(toolbox.misc.is('string', stringObj)).to.be.true;
        expect(toolbox.misc.is('boolean', boolObject)).to.be.true;
        expect(toolbox.misc.is('array', array)).to.be.true;
        expect(toolbox.misc.is('object', obj)).to.be.true;
        expect(toolbox.misc.is('object', objectInst)).to.be.true;
        expect(toolbox.misc.is('function', func)).to.be.true;
        expect(toolbox.misc.is('nan', nan)).to.be.true;
    });

    it('should create a range of numbers', () => {
        let range = toolbox.misc.range(1, 10);

        expect(range.length).to.be.equal(10);
        index = 1;
        for (const item of range) {
            expect(item).to.be.equal(index++);
        }

        range = toolbox.misc.range(1, 10, 2);

        expect(range.length).to.be.equal(5);

        index = 2;
        for (const item of range) {
          expect(item).to.be.equal(index);

          index += 2;
        }

        range = toolbox.misc.range(0, 10, 2);

        index = 2;
        for (const item of range) {
            expect(item).to.be.equal(index);

            index += 2;
        }

        range = toolbox.misc.range(-5, 10);

        index = -5;
        for (const item of range) {
            expect(item).to.be.equal(index++);
        }

        range = toolbox.misc.range(-5, 10, 2);

        index = -4;
        for (const item of range) {
          expect(item).to.be.equal(index);

          index += 2;
        }
    });
})


it('should parse the url into domain parts', () => {
    const url = 'https://developer.mozilla.org/en-US/';

    const parsed = toolbox.url.parseHostname(urlService.parse(url).hostname);
    
    expect(parsed).to.have.property('ext');
    expect(parsed).to.have.property('domainName');
    expect(parsed).to.have.property('fullDomain');
    expect(parsed).to.have.property('subdomains');

    expect(parsed.ext).to.be.a('string');
    expect(parsed.domainName).to.be.a('string');
    expect(parsed.fullDomain).to.be.a('string');
    expect(parsed.subdomains).to.be.a('array');
    expect(parsed.subdomains.length).to.be.above(0);
});

describe('test all async function and async helpers | ', () => {
    it('should execute all tasks in async sequence in order', (done) => {
        const tasks = [];
        const tasksFinished = [];

        for (let i = 0; i < 10; i++) {
            // setting tasksFinished to false to test that every task callback has been called
            tasksFinished.push(false);

            function timeout(callback) {
                setTimeout(() => {
                    callback(i);
                }, 0);
            }

            tasks.push(timeout);
        }

        // counting the number of times callbacks are called 
        let index = 0;
        let values = [];

        const onTaskDone = (err, val) => {
            // we know that the tasks are executed in sequence if the current index is the same as the value
            // since tasks are assigned a value from 0 to 10.
            // we also know that this code is called when checking that all tasks are finished in the 
            // onFinished function
            expect(val).to.be.equal(index);

            tasksFinished[index] = true;
            values.push(val);

            ++index;
        }

        const onFinished = (err) => {
            for (const finishedTask of tasksFinished) {
                expect(finishedTask).to.be.true;
            }

            done();
        };

        const isChainable = toolbox.async.inSequence(tasks, onTaskDone, onFinished);

        expect(isChainable).to.be.equal(toolbox.async);
    });

    it('inSequence() should fail syncronously if given invalid input', () => {
        const onTaskDone = () => {};
        const onTaskFinished = () => {};

        expect(() => toolbox.async.inSequence('not an array', onTaskDone, onTaskFinished)).to.throw(TypeError);
        expect(() => toolbox.async.inSequence([], 'not a function', onTaskFinished)).to.throw(TypeError);
        expect(() => toolbox.async.inSequence([], onTaskDone, 'not an array')).to.throw(TypeError);
    });

    it('limitedSequentailQueue() should execute all tasks with a limit of tasks to execute at once in a sequence', (done) => {
        const tasks = [];
        const tasksFinished = [];
        for (let i = 0; i < 10; i++) {
          // setting tasksFinished to false to test that every task callback has been called
            tasksFinished.push(false);

            function httpGetRequest() {
                return requestPromise('https://www.google.com');
            }
          
            tasks.push(httpGetRequest);
        }

        let index = 0;
        function onTaskDone() {
            tasksFinished[index] = true;

            ++index;
        }

        function onQueueDepleted(metadata) {
            expect(metadata.completed).to.be.below(tasks.length);
        }

        function onQueueFinished() {
            for (const isFinished of tasksFinished) {
                expect(isFinished).to.be.true;
            }

            done();
        }

        toolbox.async.limitedSequentailQueue({
            limit: 5,
            tasks: tasks,
            onTaskDone: onTaskDone,
            onQueueDepleted: onQueueDepleted,
            onQueueFinished: onQueueFinished,
            onError: (err) => {console.log(err)},
        });

        // if does not throw an error, it is successfull.
        toolbox.async.limitedSequentailQueue({
            limit: 5,
            tasks: tasks,
        });
    });
});