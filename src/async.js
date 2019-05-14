const sequenceQueue = require('./async/sequenceQueue');
const limitedSequenceQueue = require('./async/limitedSequenceQueue');
const limitedBatchQueue = require('./async/limitedBatchQueue');

function Async() {
    this.sequenceQueue = sequenceQueue.bind(this);
    this.limitedSequenceQueue = limitedSequenceQueue.bind(this);
    this.limitedBatchQueue = limitedBatchQueue.bind(this);
}

module.exports = new Async();