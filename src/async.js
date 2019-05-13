const sequenceQueue = require('./async/sequenceQueue');
const limitedSequenceQueue = require('./async/limitedSequenceQueue');

function Async() {
    this.sequenceQueue = sequenceQueue.bind(this);
    this.limitedSequenceQueue = limitedSequenceQueue;
}

module.exports = new Async();