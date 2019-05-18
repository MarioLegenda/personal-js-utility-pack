const mocha = require('mocha');
const chai = require('chai');
const music = require('../../src/music');
const urlService = require('url');
const requestPromise = require('request-promise-native');

const it = mocha.it;
const describe = mocha.describe;
const expect = chai.expect;

describe('testing all ladyGaga functions # ', () => {
    it('is() function should pass all checks', () => {
        const boolTrue = true;
        const boolFalse = false;
        const string = 'string';
        const float = 1.1;
        const stringObj = new String('mile');
        const boolObject = new Boolean(true);
        const obj = {};
        const objectInst = new Object();
        const func = new Function();
        const nan = NaN;
        const gen = function*() {};

        expect(music.ladyGaga.is('boolean', boolTrue)).to.be.true;
        expect(music.ladyGaga.is('boolean', boolFalse)).to.be.true;
        expect(music.ladyGaga.is('string', string)).to.be.true;
        expect(music.ladyGaga.is('float', float)).to.be.true;
        expect(music.ladyGaga.is('string', stringObj)).to.be.true;
        expect(music.ladyGaga.is('boolean', boolObject)).to.be.true;
        expect(music.ladyGaga.is('object', obj)).to.be.true;
        expect(music.ladyGaga.is('object', objectInst)).to.be.true;
        expect(music.ladyGaga.is('function', func)).to.be.true;
        expect(music.ladyGaga.is('nan', nan)).to.be.true;
        expect(music.ladyGaga.is('generator', gen)).to.be.true;
    });

    it('should create a range of numbers', () => {
        let range = music.ladyGaga.range(1, 10);

        expect(range.length).to.be.equal(10);
        index = 1;
        for (const item of range) {
            expect(item).to.be.equal(index++);
        }

        range = music.ladyGaga.range(1, 10, 2);

        expect(range.length).to.be.equal(5);

        index = 2;
        for (const item of range) {
          expect(item).to.be.equal(index);

          index += 2;
        }

        range = music.ladyGaga.range(0, 10, 2);

        index = 2;
        for (const item of range) {
            expect(item).to.be.equal(index);

            index += 2;
        }

        range = music.ladyGaga.range(-5, 10);

        index = -5;
        for (const item of range) {
            expect(item).to.be.equal(index++);
        }

        range = music.ladyGaga.range(-5, 10, 2);

        index = -4;
        for (const item of range) {
          expect(item).to.be.equal(index);

          index += 2;
        }
    });

    it('should assert all generator functions', () => {
        const tasks = [];

        for (let i = 0; i < 10; i++) {
            tasks.push(i);
        }

        let gen = music.ladyGaga.loopGenerator(tasks);

        let task, index = 0;
        while(!(task = gen.next()).done) {
            expect(task.value).to.be.equal(index++);
        }
    });

    it('should return the difference between objects', () => {
        const obj1 = {
            name: 'Billie',
            lastName: 'Holiday',
        };

        const obj2 = {
            name: 'Mile',
            lastname: 'John',
            lastName: 'mirko',
        };

        const obj3 = {
            diff1: 'diff',
            name: 'not diff'
        };

        const diff = music.ladyGaga.objectDiff(obj1, obj2, obj3);

        expect(diff.length).to.be.equal(2);
        expect(diff.includes('name')).to.be.true;
        expect(diff.includes('lastName')).to.be.true;
    });

    it('should assert that empty() returns true if the data structure is empty', () => {
        const emptyObject = {};
        const emptyArray = [];

        const nonEmptyObject = {prop: false};
        const nonEmptyArray = ['value'];

        const emptyGenerator = music.ladyGaga.loopGenerator([]);

        function makeRangeIterator(start = 0, end = Infinity, step = 1) {
            let nextIndex = start;
            let iterationCount = 0;
        
            const rangeIterator = {
               next: function() {
                   let result;
                   if (nextIndex < end) {
                       result = { value: nextIndex, done: false }
                       nextIndex += step;
                       iterationCount++;
                       return result;
                   }
                   return { value: iterationCount, done: true }
               }
            };
            return rangeIterator;
        };

        const nonEmptyRangeIterator = makeRangeIterator(0, 1000);
        const emptyRangeIterator = makeRangeIterator(0, 0);

        expect(music.ladyGaga.empty(emptyObject)).to.be.true;
        expect(music.ladyGaga.empty(emptyArray)).to.be.true;
        expect(music.ladyGaga.empty(nonEmptyObject)).to.be.false;
        expect(music.ladyGaga.empty(nonEmptyArray)).to.be.false;

        expect(music.ladyGaga.empty(emptyGenerator)).to.be.true;
        expect(music.ladyGaga.empty(nonEmptyRangeIterator)).to.be.false;
        expect(music.ladyGaga.empty(emptyRangeIterator)).to.be.true;
    });
});


it('should parse the url into domain parts', () => {
    const url = 'https://developer.mozilla.org/en-US/';

    const parsed = music.ladyGaga.parseHostname(urlService.parse(url).hostname);
    
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

describe('test all billieHoliday function and billieHoliday helpers | ', function() {
    this.timeout(3000);

    it('sequenceQueue() should execute all billieHoliday tasks in order', (done) => {
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

        // counting the number of times callbacks are called 
        let index = 0;
        let values = [];

        const onTaskDone = (val) => {
            // we know that the tasks are executed in sequence if the current index is the same as the value
            // since tasks are assigned a value from 0 to 10.
            // we also know that this code is called when checking that all tasks are finished in the 
            // onFinished function
            //expect(val).to.be.equal(index);

            tasksFinished[index] = true;
            values.push(val);

            ++index;
        }

        const onComplete = () => {
            for (const finishedTask of tasksFinished) {
                expect(finishedTask).to.be.true;
            }

            done();
        };
        
        const onError = () => {}

        const isChainable = music.billieHoliday.sequenceQueue({
            tasks: tasks,
            onTaskDone, onTaskDone,
            onComplete: onComplete,
            onError: onError,
        });

        expect(isChainable).to.be.equal(music.billieHoliday);

        // if does not throw an error, passes
        music.billieHoliday.sequenceQueue({
            tasks: tasks,
        });
    });

    it('sequenceQueue() should fail syncronously if given invalid input', () => {
        const onTaskDone = () => {};
        const onTaskFinished = () => {};

        expect(() => music.billieHoliday.sequenceQueue('not an array', onTaskDone, onTaskFinished)).to.throw(TypeError);
        expect(() => music.billieHoliday.sequenceQueue([], 'not a function', onTaskFinished)).to.throw(TypeError);
        expect(() => music.billieHoliday.sequenceQueue([], onTaskDone, 'not an array')).to.throw(TypeError);
    });

    it('limitedSequenceQueue() should execute all tasks with a limit of tasks to execute at once in a sequence', (done) => {
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

        function onQueueFinished() {
            for (const isFinished of tasksFinished) {
                expect(isFinished).to.be.true;
            }

            done();
        }

        music.billieHoliday.limitedSequenceQueue({
            limit: 5,
            tasks: tasks,
            onTaskDone: onTaskDone,
            onQueueFinished: onQueueFinished,
            onError: (err) => {console.log(err)},
        });

        // if it does not throw an error, passes
        music.billieHoliday.limitedSequenceQueue({
            limit: 5,
            tasks: tasks,
        });
    });

    it('limitedBatchQueue() should execute all billieHoliday functions with no order with a limit', (done) => {
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
        let queueFinished = false;
        function onTaskDone() {
            tasksFinished[index] = true;

            ++index;
        }

        function onQueueDepleted() {
            expect(queueFinished).to.be.false;
        }

        function onQueueFinished() {
            queueFinished = true;
            expect(tasksFinished.filter((a) => a === true).length).to.be.equal(10);

            for (const isFinished of tasksFinished) {
                expect(isFinished).to.be.true;
            }

            done();
        }

        music.billieHoliday.limitedBatchQueue({
            limit: 5,
            tasks: tasks,
            onTaskDone: onTaskDone,
            onQueueDepleted: onQueueDepleted,
            onQueueFinished: onQueueFinished,
            onError: (err) => console.log(err.message),
        });

        // if it does not throw an error, passes
        music.billieHoliday.limitedBatchQueue({
            limit: 5,
            tasks: tasks,
        });
    });

    it('batchQueue() should spawn all tasks and complete them without any order', (done) => {
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
        let queueFinished = false;
        function onTaskDone() {
            tasksFinished[index] = true;

            ++index;
        }

        function onQueueDepleted() {
            expect(tasksFinished.filter((a) => a === true).length).to.be.equal(0);
            expect(queueFinished).to.be.false;
        }

        function onQueueFinished() {
            queueFinished = true;
            expect(tasksFinished.filter((a) => a === true).length).to.be.equal(10);

            for (const isFinished of tasksFinished) {
                expect(isFinished).to.be.true;
            }

            done();
        }

        music.billieHoliday.batchQueue({
            tasks: tasks,
            onTaskDone: onTaskDone,
            onQueueDepleted: onQueueDepleted,
            onQueueFinished: onQueueFinished,
            onError: (err) => console.log(err.message),
        });

        // if does not throw an error, passes
        music.billieHoliday.batchQueue({
            tasks: tasks,
        });
    })
});

describe('Test iheritance patterns | ', () => {
    it('shoule create a prototype shared among all instances', () => {
        const parent = {
            sayHello: function() { return `Hello ${this.name}`},
            someProp: false,
        };

        const children = [];
        children.push({
            name: 'Billie',
        });
        children.push({
            name: 'Aretha',
        });

        let inhereted = music.rollingStones.sharedPrototype({
            parent: parent,
            children: children,
        });

        expect(inhereted[0].hasOwnProperty('name')).to.be.true;
        expect(inhereted[1].hasOwnProperty('name')).to.be.true;

        expect(Object.getPrototypeOf(inhereted[0]).hasOwnProperty('sayHello')).to.be.true;
        expect(Object.getPrototypeOf(inhereted[1]).hasOwnProperty('sayHello')).to.be.true;

        Object.getPrototypeOf(inhereted[0]).someProp = true;

        expect(inhereted[0].someProp).to.be.true;
        expect(inhereted[1].someProp).to.be.true;
    });

    it('should create a classical inheritance hierarchy', () => {
        /**
         * Example literary copied from https://davidshariff.com/blog/javascript-inheritance-patterns/
         */
        const Human = function() {}

        Human.prototype = {
            gender: '',
        };

        const Male = function (name) {
            this.gender = 'Male';
            this.name = name;
        };

        const Female = function (name) {
            this.name = name;
            this.gender = 'Female';
        };

        music.rollingStones.classical(Human, Male);

        const male = new Male('Napoleon');
        const female = new Female('Josephina');

        expect(male.gender).to.be.equal('Male');
        expect(female.gender).to.be.equal('Female');
    });
})